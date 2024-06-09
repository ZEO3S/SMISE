from fastapi import APIRouter
import json

job_router = APIRouter(
    tags=["Job"]
)

@job_router.get("/")
def get_job_list(service_type: str):
    with open("app/data/job.json", 'r') as f:
        job = json.load(f)
    return job[service_type]

detail_to_job = {}

@job_router.on_event("startup")
def set_detail_to_job():
    global detail_to_job
    with open("app/data/job.json", 'r') as f:
        job = json.load(f)
    for type in job:
        for j in job[type]["jobs"]:
            for detail in j["details"]:
                detail_to_job[detail] = j["category"]
