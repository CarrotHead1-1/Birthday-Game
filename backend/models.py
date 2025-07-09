

from sqlalchemy import Column, Integer, String, Boolean
from database import Base


class Character(Base):

    __tablename__ = "profiles"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(20), nullable=False)
    age = Column(String(4), nullable=True)
    description = Column(String, nullable=True)
    image_path = Column(String, nullable=True)

class Notebook(Base):

    __tablename__ = "notebook"

    id = Column(Integer, primary_key=True, index=True)
    info = Column(String(10), nullable=True)
    page_path = Column(String, nullable=True)
    accessed = Column(Boolean, default = False)

class JigsawPuzzle(Base):
    __tablename__ = "puzzles"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=True)
    image_path = Column(String, nullable=False)
    rows = Column(Integer, default=4)
    cols = Column(Integer, default=4)
    solved = Column(Boolean, default = False)

class Videos(Base):
    __tablename__ = "videos"
    id = Column(Integer, primary_key = True, index = True)
    name = Column(String(25), nullable = True)
    video_path = Column(String, nullable = True)
    watched = Column(Boolean, default = False)

class Documents(Base):
    __tablename__ = "documents"
    id = Column(Integer, primary_key= True, index = True)
    name = Column(String(35), nullable = False)
    doc_path = Column(String, nullable = True)
    locked = Column(Boolean, default = True)