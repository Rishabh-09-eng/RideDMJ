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

    if booking.b_status == "USED":
        return {"status": "ERROR", "message": "Ticket already USED!"}

    if booking.b_status != "CONFIRMED":
        return {"status": "ERROR", "message": f"Ticket not confirmed (Status: {booking.b_status})"}

    # Mark as used
    booking.b_status = "USED"
    db.commit()

    return {"status": "SUCCESS", "message": "✅ Ticket Verified & Marked as USED!"}