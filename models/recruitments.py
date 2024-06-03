from typing import Optional
from pydantic import BaseModel
from sqlmodel import JSON, SQLModel, Field, Column

class Recruitment(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    service_type: str
    experience_level: str
    education_level: str
    expiration_date: str
    title: str
    company: str
    location: str
    salary: str
    href: str
    
    class Config:
        arbitrary_types_allowd = True
        schema_extra = {
            "example": {
                "id": 1,
                "serviceType": "산업기능요원",
                "experienceLevel": "경력무관",
                "educationLevel": "대학졸업",
                "expirationDate": "채용시 마감",
                "title": "머신러닝 엔지니어 채용",
                "company": "샌드버드",
                "location": "서울특별시 강남구",
                "salary": "6000만원",
                "href": "https://sendbird.com/careers"
            }
        }
