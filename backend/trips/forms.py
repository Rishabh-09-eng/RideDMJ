from pydantic import BaseModel
from datetime import time


class BookRequest(BaseModel):
    bus_id: int
    bus_slot: time