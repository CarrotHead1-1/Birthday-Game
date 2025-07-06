

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
    notebook_path = Column(String, nullable=True)

class JigsawPuzzle(Base):
    __tablename__ = "puzzles"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=True)
    image_path = Column(String, nullable=False)
    rows = Column(Integer, default=4)
    cols = Column(Integer, default=4)
    solved = Column(Boolean, default=False)
