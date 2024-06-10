import uvicorn
import ssl
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from app.data.military_data import military_router
from app.data.connection import conn
from app.routers.recruitments import recruitment_router
from app.routers.job import job_router

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

# ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
# ssl_context.load_cert_chain('/home/g0520jjw/pems/cert.pem', keyfile='/home/g0520jjw/pems/key.pem')

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
    
