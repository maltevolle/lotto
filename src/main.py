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


@app.post('/')
async def create_item(selectedNumbers, input_text, db=Depends(database.get_session)):
    entry = Entry(selectedNumbers, input_text)
    db.add(entry)
    db.commit()
    return {"message": "Items created successfully"}
