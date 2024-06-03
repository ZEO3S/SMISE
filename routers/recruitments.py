from typing import List, Union
from fastapi import APIRouter, HTTPException, status, Query
from models.recruitments import Recruitment
from datas.military_data import cached_recruitments


recruitment_router = APIRouter(
    tags=["Recruitment"]
)


# @recruitment_router.on_event("startup")
# async def cached_recruitments_save():
#     global filtered_recruitments
#     if not cached_recruitments:
#         raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="No data available")
#     filtered_recruitments.extend(cached_recruitments[:])


# @recruitment_router.get("/", response_model=List[Recruitment])
# async def retrieve_all_events(
#     cursor: int = Query(1, description="Page number", ge=1),
#     limit: int = Query(5, description="Page number", ge=1),
#     ) -> List[Recruitment]:
#     if filtered_recruitments:
#         recruitments = filtered_recruitments
#     else:
#         recruitments = cached_recruitments
#     start = (cursor - 1) * limit
#     end = start + limit
#     total_items = len(recruitments)
#     if start >= total_items:
#         raise HTTPException(status_code=404, detail="Page not found")
#     return recruitments[start:end]


@recruitment_router.get("/", response_model=List[Recruitment])
async def retrieve_filtered_events(
    service_type: Union[str, None] = Query(default=None),
    service_status: Union[str, None] = Query(default=None),
    jobs: Union[str, None] = Query(default=None),
    detailed_jobs: Union[str, None] = Query(default=None),
    locations: Union[str, None] = Query(default=None),
    experience_level: Union[str, None] = Query(default=None),
    education_level: Union[str, None] = Query(default=None),
    sort: Union[str, None] = Query(default=None),
    keyword: Union[str, None] = Query(default=None),
    cursor: int = Query(1, description="Page number", ge=1),
    limit: int = Query(5, description="Page number", ge=1),
    ):
    
    filtered_recruitments = cached_recruitments[:]
    
    if service_type:
        filtered_recruitments = [rec for rec in filtered_recruitments if service_type.lower() in rec.service_type]
    if service_status:
        filtered_recruitments = [rec for rec in filtered_recruitments if service_status.lower() in rec.service_status]
    if jobs:
        filtered_recruitments = [rec for rec in filtered_recruitments if jobs.lower() in rec.jobs]
    if detailed_jobs:
        filtered_recruitments = [rec for rec in filtered_recruitments if detailed_jobs.lower() in rec.detailed_jobs]
    if locations:
        filtered_recruitments = [rec for rec in filtered_recruitments if locations.lower() in rec.locations]
    if experience_level:
        filtered_recruitments = [rec for rec in filtered_recruitments if experience_level.lower() in rec.experience_level]
    if education_level:
        filtered_recruitments = [rec for rec in filtered_recruitments if education_level.lower() in rec.education_level]
    if keyword:
        filtered_recruitments = [rec for rec in filtered_recruitments if keyword.lower() in rec.keyword]
    
    start = (cursor - 1) * limit
    end = start + limit
    total_items = len(filtered_recruitments)
    if start >= total_items:
        raise HTTPException(status_code=404, detail="Page not found")
    return filtered_recruitments[start:end]

