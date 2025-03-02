import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List


class Item(BaseModel):
    name: str


class ItemList(BaseModel):
    items: List[Item]


app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

memory_db = {"Items": []}


@app.get("/items", response_model=ItemList)
def get_items():
    return ItemList(items=memory_db["Items"])


@app.post("/items", response_model=Item)
def create_item(item: Item):
    memory_db["Items"].append(item)
    return item


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
