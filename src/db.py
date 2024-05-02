from sqlalchemy import create_engine, Column, Integer, DateTime, String
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
from sqlalchemy.orm import sessionmaker

Base = declarative_base()


class Entry(Base):
    __tablename__ = "entries"

    identifier = Column(Integer, primary_key=True, autoincrement=True)
    selectedNumbers = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)
    input_text = Column(String)

    def __init__(self, selectedNumbers: String, input_text):
        self.selectedNumbers = selectedNumbers
        self.input_text = input_text


engine = create_engine("sqlite:///mydb.db", echo=True)
Base.metadata.create_all(bind=engine)


class Database:
    def __init__(self):
        self.engine = engine
        self.Session = sessionmaker(bind=self.engine)

    def get_session(self):
        return self.Session()
