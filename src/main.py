from typing import List
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

@app.get('/')

@app.post('/selected_numbers')
async def receive_selected_numbers(selected_numbers: List[int], input_value: str):

    message = f"Ausgewählte Zahlen erhalten: {selected_numbers}, Input-Wert: {input_value}"
    print(message)
    database.save_selected_numbers_and_text(selected_numbers, input_value)
    return {"message": message}
