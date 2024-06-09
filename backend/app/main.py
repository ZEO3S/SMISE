import uvicorn
from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from app.data.military_data import military_router
from app.data.connection import conn
from app.routers.recruitments import recruitment_router
from app.routers.job import job_router

app = FastAPI()

app.include_router(military_router)
app.include_router(recruitment_router, prefix="/api/recruitment")
app.include_router(job_router, prefix="/api/job")

@app.on_event("startup")
def on_startup():
    conn()
    
@app.get("/")
async def home():
    return RedirectResponse(url="api/recruitment/")

if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=8080)
    