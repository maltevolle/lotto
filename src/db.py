from sqlalchemy import Column, Integer, String
from sqlalchemy.dialects.postgresql import ARRAY, DATETIME
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Entry(Base):
    __tablename__ = 'entries'

    id = Column(Integer, primary_key= True)
    selectedNumbers = Column(ARRAY(Integer))
    timestamp = Column(DATETIME)
