from typing import List, Union
from fastapi import APIRouter, HTTPException, status, Query, Depends
from app.models.recruitments import Recruitment
from app.data.connection import get_session
from sqlmodel import select
from sqlalchemy import and_, or_
from typing_extensions import Annotated

recruitment_router = APIRouter(
    tags=["Recruitment"]
)

@recruitment_router.get("/")
async def retrieve_all_recruitments(
    session=Depends(get_session),
    serviceType: Union[str, None] =  Query(default=None),
    serviceStatus: Union[str, None] = Query(default=None),
    jobs: Annotated[Union[List[str], None], Query()] = None,
    locations: Annotated[Union[List[str], None], Query()] = None,
    educationLevel: Union[str, None] = Query(default=None),
    experienceLevel: Union[str, None] = Query(default=None),
    sort: Union[str, None] = Query(default=None),
    keyword: Union[str, None] = Query(default=None),
    page: int = Query(0, description="Page number", ge=0),
    size: int = Query(5, description="Page size", ge=1),
    ):
    
    query = select(Recruitment)
    
    # 필터 조건 추가
    if serviceType:
        query = query.where(Recruitment.serviceType == serviceType)

    if serviceStatus:
        query = query.where(Recruitment.serviceStatus == serviceStatus)

    if jobs:
        conditions = []
        for j in jobs:
            job_info = j.split(',')
            category = job_info.pop(0)
            details = job_info
            if details[0] == '전체':
                conditions.append(and_(Recruitment.job == category))
            else:
                conditions.append(
                    and_(
                        Recruitment.job == category,
                        Recruitment.jobDetail.in_(details)
                    )
                )
        query = query.where(or_(*conditions))
        
    if locations:
        conditions = []
        for location in locations:
            loc_info = location.split(',')
            state = loc_info.pop(0)
            cities = loc_info
            if cities[0] == '전체':
                conditions.append(and_(Recruitment.location.contains(state)))
            else:
                city_conditions = [Recruitment.location.contains(city) for city in cities]
                conditions.append(
                    and_(
                        Recruitment.location.contains(state),
                        or_(*city_conditions)
                    )
                )
        query = query.where(or_(*conditions))
        
    if experienceLevel:
        print(experienceLevel)
        conditions = []
        start_level, end_level = experienceLevel.split(',')
        experienceLevelToInt = {
            "신입": 0,
            "1년": 1,
            "2년": 2,
            "3년": 3,
            "4년": 4,
            "5년": 5
        }
        start_level = experienceLevelToInt[start_level]
        end_level = experienceLevelToInt[end_level]
        conditions.append(Recruitment.experienceLevel == "신입/경력")
        if start_level == 0:
            conditions.append(Recruitment.experienceLevel == "신입")
        if start_level < 3 and end_level >= 1:
            conditions.append(Recruitment.experienceLevel == "경력 (1년이상)")
        if end_level >= 3:
            conditions.append(Recruitment.experienceLevel == "경력 (3년이상)")
        query = query.where(or_(*conditions))
        
    if educationLevel:
        educations = {
            0: "고등학교 중퇴",
            1: "고등학교 졸업",
            2: "대학 중퇴",
            3: "대학 휴학",
            4: "대학 졸업예정",
            5: "대학 졸업(2, 3년)",
            6: "대학 졸업(4년)",
            7: "석사",
            8: "박사"
        }
        conditions = []
        for i in range(9):
            conditions.append(Recruitment.educationLevel == educations[i])
            if educationLevel == educations[i]:
                break
        query = query.where(or_(*conditions))
        
    if keyword:
        query = query.where(
            Recruitment.title.contains(keyword) |
            Recruitment.company.contains(keyword)
            )

    if sort:
        if sort == "마감순":
            query = query.order_by(Recruitment.expirationDate.asc())
        elif sort == "최신순":
            query = query.order_by(Recruitment.updatedDate.desc())

    totalElements = len(session.exec(query).all())
    query = query.limit(size).offset(page * size)
    recruitments = session.exec(query).all()
    totalPages = totalElements // size  if totalElements % size == 0 else totalElements // size + 1
    return {"recruitment": recruitments, 
            "page": page,
            "size": size,
            "totalElements": totalElements,
            "totalPages": totalPages}
