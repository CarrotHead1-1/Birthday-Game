

from sqlalchemy import Column, Integer, String
from database import Base


class Character(Base):

    __tablename__ = "profiles"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(20), nullable=False)
    age = Column(String(4), nullable=True)
    description = Column(String, nullable=True)
    image_path = Column(String, nullable=True)
