
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from contextlib import asynccontextmanager
from database import SessionLocal, engine
from models import Base, Character
from seed import seedData
Base.metadata.create_all(bind=engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    db = SessionLocal()
    seedData(db)
    db.close()

    yield


app = FastAPI(lifespan=lifespan)


app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:3000"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get('/')
def root():
    return 'Hello World'

def getDb():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/profiles")
def getProfiles(db : Session = Depends(getDb)):
    return db.query(Character).all()

