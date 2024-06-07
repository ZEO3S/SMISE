from typing import List, Union
from fastapi import APIRouter, HTTPException, status, Query, Depends
from models.recruitments import Recruitment
from datas.military_data import cached_recruitments
from datas.connection import get_session
from sqlmodel import select
from sqlalchemy import and_, or_
from typing_extensions import Annotated

recruitment_router = APIRouter(
    tags=["Recruitment"]
)

@recruitment_router.get("/", response_model=List[Recruitment])
async def retrieve_all_recruitments(
    session=Depends(get_session),
    # service_types: Annotated[Union[List[str], None], Query()] = None,
    service_type: Union[str, None] =  Query(default=None),
    service_status: Union[str, None] = Query(default=None),
    job: Annotated[Union[List[str], None], Query()] = None,
    locations: Annotated[Union[List[str], None], Query()] = None,
    education_level: Union[str, None] = Query(default=None),
    experience_level: Union[str, None] = Query(default=None),
    sort: Union[str, None] = Query(default=None),
    keyword: Union[str, None] = Query(default=None),
    cursor: int = Query(1, description="Page number", ge=1),
    limit: int = Query(5, description="Page number", ge=1),
    ) -> List[Recruitment]:
    
    query = select(Recruitment)
    
    # 필터 조건 추가
    if service_type:
        # query = query.where(Recruitment.service_type.in_(service_types))
        query = query.where(Recruitment.service_type == service_type)
    if service_status:
        query = query.where(Recruitment.service_status == service_status)
    if job:
        conditions = []
        for j in job:
            job_info = j.split(',')
            category = job_info.pop(0)
            if job_info[0] == '전체':
                conditions.append(and_(Recruitment.job == category))
            else:
                details = job_info
                conditions.append(
                    and_(
                        Recruitment.job == category,
                        Recruitment.job_detail.in_(details)
                    )
                )
        query = query.where(or_(*conditions))
        
    if locations:
        query = query.where(Recruitment.locations == locations)
    if experience_level:
        query = query.where(Recruitment.experience_level == experience_level)
    if education_level:
        query = query.where(Recruitment.education_level == education_level)
        
    if keyword:
        query = query.where(
            Recruitment.title.contains(keyword) |
            Recruitment.company.contains(keyword)
            )
        
    if sort:
        if sort == "deadline":
            query = query.order_by(Recruitment.expiration_date.asc())
        elif sort == "latest":
            query = query.order_by(Recruitment.updated_date.desc())
    
    query = query.limit(limit).offset((cursor - 1) * limit)
    recruitments = session.exec(query).all()
    return recruitments
