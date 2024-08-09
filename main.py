import csv
from io import StringIO

from fastapi.responses import JSONResponse
import uvicorn
from fastapi import FastAPI, HTTPException, Depends, Request, Response, Query, Path
from pydantic import BaseModel
from starlette.responses import FileResponse
from starlette.staticfiles import StaticFiles

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

app.mount("/frontend", StaticFiles(directory="frontend"), name="frontend")


@app.get("/")
async def read_root():
    return FileResponse('frontend/index.html')


@app.get("/Klasse={class_name}")
async def read_class(class_name: str):
    return FileResponse('frontend/index.html')


@app.post('/api/submitForm/{class_name}')
async def receive_selected_numbers(submittedinfo: dict, class_name: str = Path(..., title="")):
    selected_numbers = submittedinfo.get('selectedNumbers')
    input_text = submittedinfo.get('inputText')
    pattern = submittedinfo.get('dict')

    message = f"Ausgewählte Zahlen erhalten: {selected_numbers}, class: {class_name}, Input-Wert: {input_text}, Pattern: {pattern}"
    print(message)
    database.save_submittedinfo(selected_numbers, input_text, class_name, pattern)
    return {"message": message}


@app.get("/csv")
async def daten():
    data = database.get_database_data()
    output = []
    output.append(['id', 'selectedNumbers', 'timestamp', 'textInput', 'class', 'pattern'])
    output.extend(data)

    # Erstellen einer StringIO-Instanz, um den CSV-Inhalt zu speichern
    csv_file = StringIO()

    # Verwenden der csv-Bibliothek, um die Daten zu formatieren und zu speichern
    writer = csv.writer(csv_file)
    writer.writerows(output)

    # CSV-Inhalt als Zeichenfolge zurückgeben
    return Response(content=csv_file.getvalue(), media_type='text/csv',
                    headers={'Content-Disposition': 'attachment;filename=daten.csv'})
