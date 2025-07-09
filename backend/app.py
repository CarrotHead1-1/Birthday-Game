
from fastapi import FastAPI, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from contextlib import asynccontextmanager
from database import SessionLocal, engine
from models import Base, Character, JigsawPuzzle, Notebook, Documents
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
        "cols" : p.cols,
        "solved" : p.solved
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
        return {"Error" : "Puzzle not found"}

    if p.solved:
        return {"solved": p.solved}

    expected = list(range(p.rows * p.cols))
    if tiles == expected:
        p.solved = True
        db.commit()
        return {"solved": True}

    return {"solved": False}

@app.get("/getNotebookPages")
def getNotebookPages(db: Session = Depends(getDb)):
    p = db.query(Notebook).all()

    if not p:
        return {"Error" : "Pages not found"}
    
    pages = [{
        "id" : page.id,
        "info" : page.info,
        "page_path" : page.page_path,
        "accessed" : page.accessed
    }
    for page in p
    ]

    return pages

@app.post("/checkNotebookPageAccess")
async def checkPageAccess(request: Request, db: Session = Depends(getDb)):
    body = await request.json()
    pageId = body.get("id")

    p = db.query(Notebook).filter_by(id = pageId).first()
    if not p:
        return {"Error" : "Page not found"}
    
    if p.accessed:
        return {"accessed": p.accessed}
    
    p.accessed = True

    # if p.id == 5:

    if p.id == 7:
        d = db.query(Documents).filter(Documents.id.in_([3])).all()
        for doc in d:
            if doc.locked:
                doc.locked = False
    
    if p.id == 9 or p.id == 10:
        d = db.query(Documents).filter(Documents.id._([1,2])).all()
        for doc in d:
            if doc.locked:
                doc.locked = False
                
    db.commit()
    return {"accessed": p.accessed}

@app.get("/getDocuments")
def getDocuments(db: Session = Depends(getDb)):
    p = db.query(Documents).all()
    if not p:
        return {"Error": "Documents not Found"}
    
    documents = [{
        "id": doc.id,
        "name": doc.name,
        "doc_path": doc.doc_path,
        "locked": doc.locked
    }
    for doc in p
    ]
    return documents

@app.post("/checkUnlocked")
async def checkDocuments(request: Request, db: Session = Depends(getDb)):
    body = await request.json()
    docId = body.get("id")

    p = db.query(Documents).filter(id = docId).first()
    if not p:
        return {"Error": "Document not Found"}
    
    if p.locked:
        return {"Locked": p.locked}
    
    return {"Locked": p.locked}