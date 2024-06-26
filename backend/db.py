from typing import List

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
    pattern = Column(String)

    def __init__(self, selectedNumbers: str, input_text, pattern):
        self.selectedNumbers = selectedNumbers
        self.input_text = input_text
        self.pattern = pattern

engine = create_engine("sqlite:///mydb.db", echo=True)
Base.metadata.create_all(bind=engine)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Database:
    def __init__(self):
        self.engine = engine
        self.Session = sessionmaker(bind=self.engine)

    def get_session(self):
        return self.Session()

    def save_submittedinfo(self, selected_numbers, input_value, pattern):
        db = self.get_session()
        try:
            entry = Entry(
                selectedNumbers=','.join(map(str, selected_numbers)),
                input_text=input_value,
                pattern = ','.join(map(str, pattern))
            )
            db.add(entry)
            db.commit()
            db.refresh(entry)
            return entry
        finally:
            db.close()
