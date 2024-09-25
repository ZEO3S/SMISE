import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from data.military_data import military_router
from data.connection import conn
from routers.recruitments import recruitment_router
from routers.job import job_router

app = FastAPI()

# CORS 설정
origins = [
        "https://www.smise.co.kr"
        ]

app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        )

@app.middleware("http")
async def redirect_http_to_https(request: Request, call_next):
    if request.headers.get('x-forwarded-proto', 'http') == 'http':
        url = request.url._url.replace("http://", "https://")
        return RedirectResponse(url=url)
    return await call_next(request)


app.include_router(military_router)
app.include_router(recruitment_router, prefix="/recruitment")
app.include_router(job_router, prefix="/jobs")

@app.on_event("startup")
def on_startup():
    conn()
    
@app.get("/")
async def home():
    return RedirectResponse(url="/recruitment")

if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=8080)
    
