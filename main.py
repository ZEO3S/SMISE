import uvicorn
from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from routers.recruitments import recruitment_router
from routers.job import job_router
from datas.military_data import military_router
from datas.connection import conn

app = FastAPI()

app.include_router(military_router)
app.include_router(recruitment_router, prefix="/recruitment")
app.include_router(job_router, prefix="/job")

@app.on_event("startup")
def on_startup():
    conn()
    
@app.get("/")
async def home():
    return RedirectResponse(url="/recruitment/")

if __name__ == '__main__':
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
    