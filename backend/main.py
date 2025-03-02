import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import datetime


class Item(BaseModel):
    name: str
    quantity: int
    packed: bool
    id: int


class ItemList(BaseModel):
    items: List[Item]


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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


@app.delete("/items/{item_id}", response_model=Item)
def delete_item(item_id: int):
    for item in memory_db["Items"]:
        if item.id == item_id:
            memory_db["Items"].remove(item)
            return item
    return {"error": "Item not found"}


@app.delete("/items", response_model=ItemList)
def delete_items():
    memory_db["Items"] = []
    return ItemList(items=memory_db["Items"])


@app.put("/items/{item_id}", response_model=Item)
def update_item(item_id: int, item: Item):
    for i in range(len(memory_db["Items"])):
        if memory_db["Items"][i].id == item_id:
            memory_db["Items"][i] = item
            return item
    return {"error": "Item not found"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
