import requests
import xmltodict
import asyncio
from fastapi import Depends
from app.models.recruitments import Recruitment
from app.data.connection import get_session
from app.routers.job import detail_to_job
from fastapi import APIRouter

military_router = APIRouter(
    tags=['Military_data']
)

cached_recruitments = []

def get_job(job_detail: str):
    return detail_to_job[job_detail]

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
    temp['service_status'] = recruitment['yeokjongBrcdNm']
    temp['service_type'] = recruitment['yowonGbcdNm']
    temp["job"] = get_job(recruitment['eopjongGbcdNm'])
    temp["job_detail"] = recruitment['eopjongGbcdNm']
    temp['experience_level'] = recruitment['gyeongryeokGbcdNm']
    temp['education_level'] = education_name_trans(recruitment['cjhakryeok'])
    temp['expiration_date'] = recruitment['magamDt']
    temp['updated_date'] = recruitment['cjdatabyeongyeongDtm']
    temp['title'] = recruitment['cyjemokNm']
    temp['company'] = recruitment['eopcheNm']
    temp['location'] = recruitment['geunmujy']
    temp['salary'] = recruitment['gyjogeonCdNm']
    temp['href'] = f'https://work.mma.go.kr/caisBYIS/search/cygonggogeomsaekView.do?cygonggo_no={recruitment["cygonggoNo"]}'
    
    return temp
        
async def fetch_recruitments():
    url = 'http://apis.data.go.kr/1300000/CyJeongBo/list'
    with open('app/data/apikey.txt', 'r') as f:
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
            print("Unexpected response structure from API")
        except Exception as e:
            print(f"Error parsing XML: {e}")
    else:
        print("Failed to fetch data from the API")


# 5분 간격으로 데이터 받아옴
async def periodic_event_fetcher():
    while True:
        await fetch_recruitments()
        await asyncio.sleep(300)


@military_router.on_event("startup")
def startup_event():
    asyncio.create_task(periodic_event_fetcher())
