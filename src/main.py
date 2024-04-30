from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from db import Base, Entry, engine, Database
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
database = Database()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Erlauben Sie OPTIONS-Anfragen
    allow_headers=["*"],
)

class Item(BaseModel):
    numbers: list[int]


@app.post('/')
async def create_item(item: Item, db=Depends(database.get_session)):
    for number in item.numbers:
        entry = Entry(number=number)
        db.add(entry)
    db.commit()
    return {"message": "Items created successfully"}
