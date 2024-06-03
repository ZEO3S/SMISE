from typing import List, Union
from fastapi import APIRouter, HTTPException, status, Query, Depends
from models.recruitments import Recruitment
from datas.military_data import cached_recruitments
from datas.connection import get_session
from sqlmodel import select

recruitment_router = APIRouter(
    tags=["Recruitment"]
)

@recruitment_router.get("/", response_model=List[Recruitment])
async def retrieve_all_recruitments(session=Depends(get_session)) -> List[Recruitment]:
    statement = select(Recruitment)
    recruitments = session.exec(statement).all()
    return recruitments
