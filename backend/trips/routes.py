from sqlalchemy.orm import Session
from database import get_db
from datetime import date
from models import TripsDB
from fastapi import Depends, Response, status, HTTPException, APIRouter
from auth import get_cur_user
from .forms import BookRequest
from payments.routes import create_payment

router = APIRouter(prefix="/trips")

@router.get("/")
def get_ticket(db: Session=Depends(get_db)):
    today = 0 if date.today().weekday() < 5 else 1
    trips = db.query(TripsDB).get()
    return trips


@router.post("/book")
async def book_ticket(
    data: BookRequest,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_cur_user)
):

    trip = (
        db.query(TripsDB)
        .filter(
            TripsDB.t_bus_id == data.bus_id,
            TripsDB.t_time == data.bus_slot
        )
        .first()
    )

    if not trip:
        raise HTTPException(
            status_code=404,
            detail="Trip not found"
        )

    if trip.t_available_seats <= 0:
        raise HTTPException(
            status_code=409,
            detail="No seats available"
        )

    # Create Cashfree payment
    payment = await create_payment()

    return {
        "trip_id": trip.trip_id,
        "user_id": user_id,
        "available_seats": trip.t_available_seats,
        "payment": payment
    }