from typing import List, Dict
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from db import Base, Entry, engine, Database
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path
import uvicorn

app = FastAPI()
database = Database()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Hier können Sie bestimmte Origins spezifizieren, falls nötig
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # OPTIONS-Anfragen erlauben
    allow_headers=["*"],
)

# Pydantic Modelle für die eingehenden Daten
class SubmittedInfo(BaseModel):
    selectedNumbers: List[int]
    inputText: str
    pattern: Dict[str, str]

app.mount("/", StaticFiles(directory=Path(__file__).parent.parent / "frontend"), name="frontend")

@app.get("/")
async def read_root():
    return FileResponse(Path(__file__).parent.parent / "frontend" / "index.html")

@app.on_event("shutdown")
async def shutdown_event():
    print("Shutting down gracefully...")

@app.post('/api/submitForm')
async def receive_selected_numbers(submittedinfo: SubmittedInfo):
    selected_numbers = submittedinfo.selectedNumbers
    input_text = submittedinfo.inputText
    pattern = submittedinfo.pattern

    message = f"Ausgewählte Zahlen erhalten: {selected_numbers}, Input-Wert: {input_text}, Pattern: {pattern}"
    print(message)
    database.save_submittedinfo(selected_numbers, input_text, pattern)
    return {"message": message}

if __name__ == "__main__":
    try:
        uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
    except KeyboardInterrupt:
        print("Server interrupted and shut down")
