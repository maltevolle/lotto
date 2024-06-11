from typing import List
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from db import Base, Entry, engine, Database
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path


app = FastAPI()
database = Database()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Serve static files
app.mount("/static", StaticFiles(directory=Path(__file__).parent.parent / "frontend" / "public"), name="static")

@app.get("/")
async def read_root():
    return FileResponse(Path(__file__).parent.parent / "frontend" / "public" / "index.html")

@app.get("/favicon.ico")
async def favicon():
    return FileResponse(Path(__file__).parent.parent / "frontend" / "public" / "favicon.ico")

@app.post('/api/submitForm')
async def receive_selected_numbers(submittedinfo: dict):
    selected_numbers = submittedinfo.get('selectedNumbers')
    input_text = submittedinfo.get('inputText')
    pattern = submittedinfo.get('dict')

    message = f"Ausgewählte Zahlen erhalten: {selected_numbers}, Input-Wert: {input_text}, Pattern: {pattern}"
    print(message)
    database.save_submittedinfo(selected_numbers, input_text, pattern)
    return {"message": message}

if __name__ == "__main__":
    try:
        import uvicorn
        uvicorn.run(app, host="0.0.0.0", port=8000)
    except KeyboardInterrupt:
        print("Server interrupted and shut down")
