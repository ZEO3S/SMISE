import requests
import xmltodict
import asyncio
from models.recruitments import Recruitment

from fastapi import APIRouter

military_router = APIRouter(
    tags=['Military_data']
)

cached_recruitments = []

def recruitment_name_casting(recruitment: dict) -> dict:
    temp = dict()
    temp['id'] = recruitment["cygonggoNo"]
    temp['service_type'] = recruitment['yowonGbcdNm']
    temp['experience_level'] = recruitment['gyeongryeokGbcdNm']
    temp['education_level'] = recruitment['cjhakryeok']
    temp['expiration_date'] = recruitment['magamDt']
    temp['title'] = recruitment['cyjemokNm']
    temp['company'] = recruitment['eopcheNm']
    temp['location'] = recruitment['geunmujy']
    temp['salary'] = recruitment['gyjogeonCdNm']
    temp['href'] = f'https://work.mma.go.kr/caisBYIS/search/cygonggogeomsaekView.do?cygonggo_no={recruitment["cygonggoNo"]}'
    
    return temp

async def fetch_and_cache_events():
    global cached_recruitments
    url = 'http://apis.data.go.kr/1300000/CyJeongBo/list'
    serviceKey = 'TSsi+1lSPXcNb2RRu7KtdUKDFp+sHWoUxRXMsinxZNAxR8pk9xCHD4CRTyprMl2Y3hZhqHMq7YI9MQiFkva3Rg=='
    params = {'serviceKey': serviceKey, 'numOfRows': '1000', 'pageNo': '1'}

    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        try:
            print("Hello")
            data = xmltodict.parse(response.content)  # Convert XML to JSON
            recruitments_data = data['response']['body']['items']['item']
            cached_recruitments.extend([Recruitment(**recruitment_name_casting(recruitment)) for recruitment in recruitments_data])
        except KeyError:
            print("Unexpected response structure from API")
        except Exception as e:
            print(f"Error parsing XML: {e}")
    else:
        print("Failed to fetch data from the API")


# 1시간 간격으로 데이터 받아옴
async def periodic_event_fetcher():
    while True:
        await fetch_and_cache_events()
        await asyncio.sleep(3600)


@military_router.on_event("startup")
def startup_event():
    asyncio.create_task(periodic_event_fetcher())
