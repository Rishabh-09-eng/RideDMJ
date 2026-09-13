from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from models import BookingsDB, TripsDB
from auth import get_cur_user

router = APIRouter(prefix="/bookings", tags=["Bookings"])


@router.get("/my-bookings")
def get_my_bookings(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_cur_user)
):
    now = datetime.now(timezone.utc)

    # Automatically expire any pending bookings that timed out
    pending_bookings = (
        db.query(BookingsDB)
        .filter(
            BookingsDB.u_id == current_user,
            BookingsDB.b_status == "PENDING",
            BookingsDB.b_expiresat.isnot(None),
            BookingsDB.b_expiresat < now
        )
        .all()
    )

    for pb in pending_bookings:
        pb.b_status = "EXPIRED"
        trip = db.query(TripsDB).filter(TripsDB.t_id == pb.b_trip_id).first()
        if trip:
            trip.t_available_seats += 1

    if pending_bookings:
        db.commit()

    results = (
        db.query(BookingsDB, TripsDB)
        .join(TripsDB, BookingsDB.b_trip_id == TripsDB.t_id)
        .filter(BookingsDB.u_id == current_user)
        .order_by(BookingsDB.b_createdat.desc())
        .all()
    )

    tickets = []
    for booking, trip in results:
        tickets.append({
            "booking_id": booking.b_id,
            "ticket_code": booking.b_ticket_code,
            "status": booking.b_status,
            "bus_id": trip.t_bus_id,
            "date": str(trip.t_date) if trip.t_date else None,
            "time": str(trip.t_time),
            "direction": trip.t_direction,
            "created_at": booking.b_createdat.isoformat() if booking.b_createdat else None,
        })

    return {"success": True, "tickets": tickets}


@router.get("/verify/{ticket_code}")
def verify_ticket(ticket_code: str, db: Session = Depends(get_db)):
    booking = db.query(BookingsDB).filter(BookingsDB.b_ticket_code == ticket_code).first()

    if not booking:
        return {"status": "ERROR", "message": "Invalid Ticket!"}

    trip = db.query(TripsDB).filter(TripsDB.t_id == booking.b_trip_id).first()
    trip_info = {
        "bus_id": trip.t_bus_id if trip else None,
        "date": str(trip.t_date) if trip and trip.t_date else None,
        "time": str(trip.t_time) if trip else None,
        "direction": trip.t_direction if trip else None,
    } if trip else None

    if booking.b_status == "USED":
        return {
            "status": "ERROR",
            "message": "Ticket already USED!",
            "trip": trip_info
        }

    if booking.b_status != "CONFIRMED":
        return {
            "status": "ERROR",
            "message": f"Ticket not confirmed (Status: {booking.b_status})",
            "trip": trip_info
        }

    # Mark as used
    booking.b_status = "USED"
    db.commit()

    return {
        "status": "SUCCESS",
        "message": "✅ Ticket Verified & Marked as USED!",
        "trip": trip_info
    }