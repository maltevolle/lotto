from typing import List
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from starlette.responses import FileResponse
<<<<<<< HEAD
from starlette.staticfiles import StaticFiles
=======
>>>>>>> 2715dedb113500fcd5eecbe1058a1b120973d71d

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

<<<<<<< HEAD
app.mount("/frontend", StaticFiles(directory="frontend"), name="frontend")
@app.get("/")
async def read_root():
    return FileResponse('frontend/index.html')
=======
@app.get("/")
async def read_root():
    return FileResponse('index.html')
>>>>>>> 2715dedb113500fcd5eecbe1058a1b120973d71d

@app.post('/')
async def receive_selected_numbers(submittedinfo: dict):
    selected_numbers = submittedinfo.get('selectedNumbers')
    input_text = submittedinfo.get('inputText')
    pattern = submittedinfo.get('dict')

    message = f"Ausgewählte Zahlen erhalten: {selected_numbers}, Input-Wert: {input_text}, Pattern: {pattern}"
    print(message)
    database.save_submittedinfo(selected_numbers, input_text, pattern)
    return {"message": message}
