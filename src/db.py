from sqlalchemy import create_engine, Column, Integer, DateTime, String
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
from sqlalchemy.orm import sessionmaker

Base = declarative_base()


class Entry(Base):
    __tablename__ = "entries"

    id = Column(Integer, primary_key=True)
    number1 = Column(Integer)
    number2 = Column(Integer)
    number3 = Column(Integer)
    number4 = Column(Integer)
    number5 = Column(Integer)
    number6 = Column(Integer)
    timestamp = Column(DateTime, default=datetime.utcnow)
    input_text = Column(String)

    def __init__(self, id, selectedNumbers, timestamp):
        self.id = id
        self.selectedNumbers = selectedNumbers
        self.timestamp = timestamp


engine = create_engine("sqlite:///mydb.db", echo=True)
Base.metadata.create_all(bind=engine)

#Session = sessionmaker(bind=engine)
#session = Session()
#e1 = Entry(4, 22, datetime.now())
#session.add(e1)
#session.commit()

#results = session.query(Entry).all()
#for entry in results:
#    print("ID:", entry.id)
#   print("Selected Numbers:", entry.selectedNumbers)
#   print("Timestamp:", entry.timestamp)
#   print()