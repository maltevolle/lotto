from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from db import Base, Entry, engine, Database


app = FastAPI()
database = Database()


class Item(BaseModel):
    numbers: list[int]


@app.post('/')
async def create_item(item: Item, db=Depends(database.get_session)):
    for number in item.numbers:
        entry = Entry(number=number)
        db.add(entry)
    db.commit()
    return {"message": "Items created successfully"}
