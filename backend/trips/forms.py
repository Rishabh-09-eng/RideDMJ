from pydantic import BaseModel


class BookRequest(BaseModel):
    bus_id: int
    bus_slot: str