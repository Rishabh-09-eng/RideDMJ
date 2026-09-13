from sqlalchemy.orm import Session
from database import get_db
from datetime import date
from models import TripsDB
from fastapi import Depends, Response, status, HTTPException, APIRouter
from auth import get_cur_user
from .forms import BookRequest
from payments.routes import create_payment
import uuid

from datetime import datetime,timezone,timedelta

from fastapi import APIRouter,HTTPException,Depends
from sqlalchemy.orm import Session

from database import get_db
from models import TripsDB,BookingsDB
from auth import get_cur_user

from payments.routes import create_payment
from .forms import BookRequest

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
    user_id=Depends(get_cur_user)
):
    # 1. Find and lock the trip
    trip = (
        db.query(TripsDB)
        .filter(
            TripsDB.t_bus_id == data.bus_id,
            TripsDB.t_time == data.bus_slot
        )
        .with_for_update()
        .first()
    )

    if not trip:
        raise HTTPException(
            status_code=404,
            detail="Trip not found"
        )

    # 2. Check if this user already booked this trip
    existing_booking = (
        db.query(BookingsDB)
        .filter(
            BookingsDB.b_trip_id == trip.t_id,
            BookingsDB.u_id == user_id,
            BookingsDB.b_status.in_(["PENDING", "CONFIRMED"])
        )
        .first()
    )

    if existing_booking:
        raise HTTPException(
            status_code=409,
            detail="You have already booked this trip"
        )

    # 3. Check available seats
    if trip.t_available_seats <= 0:
        raise HTTPException(
            status_code=409,
            detail="No seats available"
        )

    # 4. Create unique Cashfree order ID
    order_id = f"ridedmj_{uuid.uuid4().hex[:12]}"

    now = datetime.now(timezone.utc)

    # 5. Create booking
    booking = BookingsDB(
        b_trip_id=trip.t_id,
        u_id=user_id,
        b_order_id=order_id,
        b_createdat=now,
        b_status="PENDING",
        b_expiresat=now + timedelta(minutes=10)
    )

    # 6. Reserve seat
    trip.t_available_seats -= 1

    db.add(booking)

    # 7. Create payment
    try:
        payment = await create_payment(order_id)

        db.commit()
        db.refresh(booking)

    except HTTPException:
        db.rollback()
        raise
    except Exception as e:
        db.rollback()
        print("PAYMENT ERROR:", e)

        raise HTTPException(
            status_code=500,
            detail="Unable to create payment"
        )

    return {
        "success": True,
        "trip_id": trip.t_id,
        "booking_id": booking.b_id,
        "available_seats": trip.t_available_seats,
        "payment": payment
    }
