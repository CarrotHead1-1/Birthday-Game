
from fastapi import FastAPI, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from contextlib import asynccontextmanager
from database import SessionLocal, engine
from models import Base, Character, JigsawPuzzle
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

@app.get("/notebookPuzzle")
def getNotebookPuzzle(db : Session = Depends(getDb)):
    p =  db.query(JigsawPuzzle).filter_by(name = "notebookPuzzle").first()
    if not p:
        return {"Error" : "Puzzle not found"}
    result = {
        "id" : p.id,
        "name" : p.name,
        "image_path" : p.image_path,
        "rows" : p.rows,
        "cols" : p.cols
    }

    return result

@app.post("/checkNotebookPuzzle")
async def checkNotebookPuzzle(request: Request, db : Session = Depends(getDb)):
    body = await request.json()
    puzzleId = body.get("id")
    tiles = body.get("tiles")

    if puzzleId is None or tiles is None:
        return {"Error" : ""}
    
    p = db.query(JigsawPuzzle).filter_by(id=puzzleId).first()
    if not p:
        return {"Error" : "Puzzle not found"}#
    
    expected = list(range(p.rows * p.cols))
    correct = tiles == expected
    return {"solved": correct}