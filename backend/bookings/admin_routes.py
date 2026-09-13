from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import BookingsDB, TripsDB
from auth import get_cur_admin

router = APIRouter(prefix="/admin")

@router.post("/verify-ticket/{ticket_code}")
def verify_and_approve_ticket(
        ticket_code: str,
        db: Session = Depends(get_db),
        admin_id: str = Depends(get_cur_admin)
    ):
        booking = db.query(BookingsDB).filter(BookingsDB.b_ticket_code == ticket_code).first()
        if not booking:
            return {"status": "ERROR", "message": "Invalid Ticket!"}
    
        trip = db.query(TripsDB).filter(TripsDB.t_id == booking.b_trip_id).first()
    
        if booking.b_status == "USED":
            return {
                "status": "ALREADY_USED",
                "message": "Ticket has ALREADY been used!",
                "trip": {"bus_id": trip.t_bus_id, "time": str(trip.t_time)} if trip else None
            }
    
        if booking.b_status != "CONFIRMED":
            return {"status": "ERROR", "message": f"Ticket not confirmed (Status: {booking.b_status})"}
    
        booking.b_status = "USED"
        db.commit()

        return {
            "status": "SUCCESS",
            "message": "Ticket Verified & Marked as USED!",
            "trip": {
                "bus_id": trip.t_bus_id if trip else None,
                "time": str(trip.t_time) if trip else None,
                "direction": trip.t_direction if trip else None,
            }
        }