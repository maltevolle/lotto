import json
import sqlite3
from typing import List, Any


from sqlalchemy import create_engine, Column, Integer, DateTime, String
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
from sqlalchemy.orm import sessionmaker
from sqlalchemy.dialects.sqlite import JSON

Base = declarative_base()


class Entry(Base):
    __tablename__ = "entries"

    identifier = Column(Integer, primary_key=True, autoincrement=True)
    selectedNumbers = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)
    input_text = Column(String)
    pattern = Column(JSON)

    def __init__(self, selectedNumbers: str, input_text: str, pattern: JSON):
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

    def save_submittedinfo(self, selected_numbers: List[int], input_value: Any, pattern: dict):
        db = self.get_session()
        try:
            input_json = json.dumps(input_value)
            selected_numbers_str = ','.join(map(str, selected_numbers))
            entry = Entry(
                selectedNumbers=selected_numbers_str,
                input_text=input_json,
                pattern=pattern
            )
            db.add(entry)
            db.commit()
            db.refresh(entry)
            return entry
        finally:
            db.close()

    def get_database_data(self):
        conn = sqlite3.connect('mydb.db')
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM entries")
        data = cursor.fetchall()
        conn.close()
        return data
