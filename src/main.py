from typing import List
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from db import Base, Entry, engine, Database
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
database = Database()

@app.get('/')

@app.post('/')
async def receive_selected_numbers(selected_numbers_and_text: dict):
    selected_numbers = selected_numbers_and_text.get('selectedNumbers')
    input_text = selected_numbers_and_text.get('inputText')

    message = f"Ausgewählte Zahlen erhalten: {selected_numbers}, Input-Wert: {input_text}"
    print(message)
    database.save_selected_numbers_and_text(selected_numbers, input_text)
    return {"message": message}
