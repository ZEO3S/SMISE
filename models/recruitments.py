from typing import Optional
from pydantic import BaseModel

class Recruitment(BaseModel):
    id: Optional[int] = None
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
