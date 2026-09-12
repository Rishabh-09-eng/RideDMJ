from pydantic import BaseModel


class VerifyPaymentRequest(BaseModel):
    order_id: str
    trip_id: int