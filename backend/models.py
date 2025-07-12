

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

class Password(Base):

    __tablename__ = "passwords"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable = False)
    password = Column(String(6), nullable = False)
    solved = Column(Boolean, default=False)

class SpyFiles(Base):

    __tablename__ = "spyFiles"
    id = Column(Integer, primary_key = True, index = True)
    name = Column(String(25), nullable = True)
    spyfile_path = Column(String, nullable = True)
    accessed = Column(Boolean, default = False)
    unlocked = Column(Boolean, default=False)

class Documents(Base):

    __tablename__ = "documents"
    id = Column(Integer, primary_key= True, index = True)
    name = Column(String(35), nullable = False)
    doc_path = Column(String, nullable = True)
    locked = Column(Boolean, default = True)

class StaffDatabase(Base):

    __tablename__ = "staffDatabase"
    id = Column(Integer, primary_key=True, index = True)
    name = Column(String(35), nullable = False)
    age = Column(String(4), nullable = True)
    position = Column(String(8), nullable=True)
    