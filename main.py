from typing import List
<<<<<<< HEAD
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from starlette.responses import FileResponse
from starlette.staticfiles import StaticFiles

from db import Base, Entry, engine, Database
from fastapi.middleware.cors import CORSMiddleware
=======

import uvicorn
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from db import Base, Entry, engine, Database
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path
>>>>>>> e51449a4cccf86c676c974ba641c75dab955a447

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
    return FileResponse('index.html')

@app.post('/')
=======
app.mount("/", StaticFiles(directory=Path(__file__).parent.parent / "frontend"), name="frontend")

@app.get("/")
async def read_root():
    return FileResponse(Path(__file__).parent.parent / "frontend" / "index.html")


@app.on_event("shutdown")
async def shutdown_event():
    print("Shutting down gracefully...")

@app.post('/api/submitForm')
>>>>>>> e51449a4cccf86c676c974ba641c75dab955a447
async def receive_selected_numbers(submittedinfo: dict):
    selected_numbers = submittedinfo.get('selectedNumbers')
    input_text = submittedinfo.get('inputText')
    pattern = submittedinfo.get('dict')

    message = f"Ausgewählte Zahlen erhalten: {selected_numbers}, Input-Wert: {input_text}, Pattern: {pattern}"
    print(message)
    database.save_submittedinfo(selected_numbers, input_text, pattern)
<<<<<<< HEAD
    return {"message": message}
=======
    return {"message": message}

if __name__ == "__main__":
    try:
        uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
    except KeyboardInterrupt:
        print("Server interrupted and shut down")

>>>>>>> e51449a4cccf86c676c974ba641c75dab955a447
