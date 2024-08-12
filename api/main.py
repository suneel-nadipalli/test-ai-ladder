from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

class Name(BaseModel):
    name: str 

app = FastAPI()

origins = [
    "http://18.219.46.75",
    "http://18.219.46.75:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World Again from all over"}

@app.post("/name")
async def name(name: Name):
    return {
        "resp": f"Hello {name.name}"
    }
