import uuid
from datetime import datetime, timezone, timedelta
from typing import Optional

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import TripsDB, BookingsDB
from auth import get_cur_user
from payments.routes import create_payment
from .forms import BookRequest

router = APIRouter(prefix="/trips")


def release_expired_bookings(db: Session):
    """Marks expired PENDING bookings as EXPIRED and releases reserved seats."""
    now = datetime.now(timezone.utc)
    expired_bookings = (
        db.query(BookingsDB)
        .filter(
            BookingsDB.b_status == "PENDING",
            BookingsDB.b_expiresat.isnot(None),
            BookingsDB.b_expiresat < now
        )
        .all()
    )

    for booking in expired_bookings:
        booking.b_status = "EXPIRED"
        trip = db.query(TripsDB).filter(TripsDB.t_id == booking.b_trip_id).first()
        if trip:
            trip.t_available_seats += 1

    if expired_bookings:
        db.commit()


@router.get("")
@router.get("/")
def get_trips(db: Session = Depends(get_db)):
    release_expired_bookings(db)
    trips = db.query(TripsDB).order_by(TripsDB.t_time.asc()).all()
    return trips


@router.post("/book")
async def book_ticket(
    data: BookRequest,
    db: Session = Depends(get_db),
    user_id=Depends(get_cur_user)
):
    now = datetime.now(timezone.utc)

    # 1. First release any globally expired bookings
    release_expired_bookings(db)

    # 2. Find and lock the trip
    if data.trip_id:
        trip = (
            db.query(TripsDB)
            .filter(TripsDB.t_id == data.trip_id)
            .with_for_update()
            .first()
        )
    elif data.bus_id is not None and data.bus_slot is not None:
        trip = (
            db.query(TripsDB)
            .filter(
                TripsDB.t_bus_id == data.bus_id,
                TripsDB.t_time == data.bus_slot
            )
            .with_for_update()
            .first()
        )
    else:
        raise HTTPException(
            status_code=400,
            detail="Either trip_id or both bus_id and bus_slot must be provided"
        )

    if not trip:
        raise HTTPException(
            status_code=404,
            detail="Trip not found"
        )

    # 3. Check for existing pending bookings by this user
    user_pending_bookings = (
        db.query(BookingsDB)
        .filter(
            BookingsDB.u_id == user_id,
            BookingsDB.b_status == "PENDING"
        )
        .all()
    )

    for pb in user_pending_bookings:
        expires_at = pb.b_expiresat
        if expires_at and expires_at.tzinfo is None:
            expires_at = expires_at.replace(tzinfo=timezone.utc)

        if expires_at and expires_at < now:
            pb.b_status = "EXPIRED"
            old_trip = db.query(TripsDB).filter(TripsDB.t_id == pb.b_trip_id).first()
            if old_trip:
                old_trip.t_available_seats += 1
            db.commit()
        else:
            raise HTTPException(
                status_code=409,
                detail="You already have a pending booking. Please complete payment or wait for it to expire."
            )

    # 4. Check if user already booked a ticket for this date (1 ticket per user per day)
    existing_day_booking = (
        db.query(BookingsDB)
        .join(TripsDB, BookingsDB.b_trip_id == TripsDB.t_id)
        .filter(
            BookingsDB.u_id == user_id,
            TripsDB.t_date == trip.t_date,
            BookingsDB.b_status.in_(["CONFIRMED", "USED"])
        )
        .first()
    )

    if existing_day_booking:
        raise HTTPException(
            status_code=409,
            detail="You already have a booked ticket for today. Only 1 ticket per user per day is allowed."
        )

    # 5. Check available seats
    if trip.t_available_seats <= 0:
        raise HTTPException(
            status_code=409,
            detail="No seats available on this bus"
        )

    # 6. Create unique Cashfree order ID
    order_id = f"ridedmj_{uuid.uuid4().hex[:12]}"

    # 7. Create booking record
    booking = BookingsDB(
        b_trip_id=trip.t_id,
        u_id=user_id,
        b_order_id=order_id,
        b_createdat=now,
        b_status="PENDING",
        b_expiresat=now + timedelta(minutes=10)
    )

    # 8. Reserve seat
    trip.t_available_seats -= 1
    db.add(booking)

    # 9. Create Cashfree payment session
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
            detail=f"Unable to create payment: {str(e)}"
        )

    return {
        "success": True,
        "trip_id": trip.t_id,
        "booking_id": booking.b_id,
        "available_seats": trip.t_available_seats,
        "payment": payment
    }
