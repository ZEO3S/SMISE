import requests
import xmltodict
import asyncio
from fastapi import Depends
from models.recruitments import Recruitment
from data.connection import get_session
from routers.job import detail_to_job
from fastapi import APIRouter
from datetime import datetime, timedelta
from sqlmodel import select

military_router = APIRouter(
    tags=['Military_data']
)

cached_recruitments = []

def get_job(jobDetail: str):
    return detail_to_job[jobDetail]

def education_name_trans(education: str):
    education_name = {
        "고등학교중퇴": "고등학교 중퇴",
        "고등학교졸업": "고등학교 졸업",
        "대학교 휴학": "대학 휴학",
        "대학교 졸업예정": "대학 졸업예정"
    }
    return education_name[education] if education in education_name else education

def recruitment_name_casting(recruitment: dict) -> dict:
    temp = dict()
    
    temp['id'] = recruitment["cygonggoNo"]
    temp['serviceStatus'] = recruitment['yeokjongBrcdNm']
    temp['serviceType'] = recruitment['yowonGbcdNm']
    temp["job"] = get_job(recruitment['eopjongGbcdNm'])
    temp["jobDetail"] = recruitment['eopjongGbcdNm']
    temp['experienceLevel'] = recruitment['gyeongryeokGbcdNm']
    temp['educationLevel'] = education_name_trans(recruitment['cjhakryeok'])
    temp['expirationDate'] = recruitment['magamDt']
    temp['updatedDate'] = recruitment['cjdatabyeongyeongDtm']
    temp['title'] = recruitment['cyjemokNm']
    temp['company'] = recruitment['eopcheNm']
    temp['location'] = recruitment['geunmujy']
    temp['salary'] = recruitment['gyjogeonCdNm']
    temp['href'] = f'https://work.mma.go.kr/caisBYIS/search/cygonggogeomsaekView.do?cygonggo_no={recruitment["cygonggoNo"]}'
    
    return temp
        
async def fetch_recruitments():
    url = 'http://apis.data.go.kr/1300000/CyJeongBo/list'
    with open('keys/military_apikey.txt', 'r') as f:
        serviceKey = f.read()
    params = {'serviceKey': serviceKey, 'numOfRows': '1000', 'pageNo': '1'}

    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        try:
            data = xmltodict.parse(response.content)  # Convert XML to JSON
            recruitments_data = data['response']['body']['items']['item']
            session = next(get_session())
            
            for recruitment in recruitments_data:
                r = Recruitment(**recruitment_name_casting(recruitment))
                if session.get(Recruitment, r.id):
                    # 이미 데이터베이스에 존재하면 건너뛰기
                    continue
                session.add(r)
                session.commit()
                session.refresh(r)
        except KeyError as k:
            print(k)
            print("Unexpected response structure from API")
        except Exception as e:
            print(f"Error parsing XML: {e}")
    else:
        print("Failed to fetch data from the API")
        
async def expiration_date_remove():
    session = next(get_session())
    today = datetime.now()
    today = today.strftime('%Y%m%d')
    query = select(Recruitment)
    query = query.where(Recruitment.expirationDate < today)
    result = session.exec(query).all()
    for recruitment in result:
        session.delete(recruitment)
    session.commit()



# 5분 간격으로 데이터 받아옴
async def periodic_event_fetcher():
    while True:
        await fetch_recruitments()
        print("fetch recruitments Success")
        # await expiration_date_remove()
        await asyncio.sleep(300)


@military_router.on_event("startup")
def startup_event():
    asyncio.create_task(periodic_event_fetcher())
