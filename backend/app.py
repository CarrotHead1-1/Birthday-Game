
from fastapi import FastAPI, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from contextlib import asynccontextmanager
from database import SessionLocal, engine
from models import Base, Character, JigsawPuzzle, Notebook, Documents, Password, SpyFiles
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
    allow_origins = ["*"],
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
    c = db.query(Character).all()
    return [{
        "id" : chars.id,
        "name": chars.name,
        "age": chars.age,
        "description": chars.description,
        "image_path": chars.image_path
            }
            for chars in c]

@app.get("/characters")
def getCharacters(db: Session = Depends(getDb)):
    return [c.name for c in db.query(Character).filter().all()]

@app.post("/checkAnswers")
async def checkAnwsers(request: Request, db: Session = Depends(getDb)):
    body = await request.json()
    
    guess =body.get("userGuesses")
    if guess[0] == "Seamus Masters" and guess[1] == "Bernardo Rossi":
        return {"correct": True}
    return {"correct": False}

@app.post("/checkPassword")
async def checkSpyFilePassword(request: Request, db: Session = Depends(getDb)):
    body = await request.json()
    guess = body.get("guess")
    p = db.query(Password).filter_by(name = guess.name).first()

    if p.solved:
        return {"correctPositions": list(p.password)}
    
    if not guess or len(guess) != len(p.password):
        return {"correctPositions": [None] * len(p.password)}

    correctPositions = [
        guess[i] if guess[i] == p.password[i] else None for i in range(len(p.password))
    ]

    if all(d is not None for d in correctPositions):
        p.solved = True
        db.commit()

    return {"correctPositions": correctPositions}

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

    if p.id == 4:
        d = db.query(SpyFiles).filter(SpyFiles.id.in_([1])).all()
        for file in d:
            if file.unlocked == False:
                file.unlocked = True


    if p.id == 7:
        d = db.query(Documents).filter(Documents.id.in_([4])).all()
        for doc in d:
            if doc.locked:
                doc.locked = False
    
    if p.id == 10:
        d = db.query(SpyFiles).filter(SpyFiles.id.in_([2,3])).all()
        for file in d:
            if file.unlocked == False:
                file.unlocked = True
    
    if p.id == 11:
        d = db.query(Documents).filter(Documents.id.in_([5,6])).all()
        for doc in d:
            if doc.locked:
                doc.locked = False
    
    #if p.id == 12:
        #d = db.query(SpyFiles).filter(SpyFiles)
    #go to finger print file 

    if p.id == 13:
        d = db.query(Documents).filter(Documents.id.in_([7])).all()
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

@app.post("/checkUnlockedDocuments")
async def checkDocuments(request: Request, db: Session = Depends(getDb)):
    body = await request.json()
    docId = body.get("id")

    p = db.query(Documents).filter(id = docId).first()
    if not p:
        return {"Error": "Document not Found"}
    
    if p.locked:
        return {"Locked": p.locked}
    
    return {"Locked": p.locked}

@app.get("/getSpyFiles")
def getSpyFiles(db: Session = Depends(getDb)):
    p = db.query(SpyFiles).filter_by(unlocked = True).all()

    files = [{
        "id": file.id,
        "name": file.name,
        "spyfile_path": file.spyfile_path,
        "accessed": file.accessed,
        "unlocked": file.accessed
    }
    for file in p
    ]
    return files 

@app.post("/checkSpyFilesUnlcoked")
async def checkSpyFiles(request: Request, db: Session = Depends(getDb)):
    body = await request.json()
    fileId = body.get("id")

    p = db.query(SpyFiles).filter_by(id = fileId).first()
    if not p:
        return {"Error" : "Spy Files not found"}
    
    if p.unlocked:
        return {"unlocked": p.unlocked}
    return {"unlocked": p.unlocked}