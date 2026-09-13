from pydantic import BaseModel
from datetime import time
from typing import Optional


class BookRequest(BaseModel):
    trip_id: Optional[int] = None
    bus_id: Optional[int] = None
    bus_slot: Optional[time] = None