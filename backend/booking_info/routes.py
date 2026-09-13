from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import BookingsDB, TripsDB
from auth import get_cur_user


router = APIRouter(prefix="/booking_info", tags=["Booking Information"])


@router.get("/my-bookings")
def get_my_bookings(
    db: Session = Depends(get_db),
    user_id=Depends(get_cur_user),
):
    bookings = (
        db.query(BookingsDB, TripsDB)
        .join(TripsDB, BookingsDB.b_trip_id == TripsDB.t_id)
        .filter(BookingsDB.u_id == user_id)
        .order_by(BookingsDB.b_createdat.desc())
        .all()
    )

    return [
        {
            "booking_id": booking.b_id,
            "trip_id": trip.t_id,
            "bus_id": trip.t_bus_id,
            "date": trip.t_date,
            "time": trip.t_time,
            "direction": trip.t_direction,
            "booking_status": booking.b_status,
            "order_id": booking.b_order_id,
            "created_at": booking.b_createdat,
        }
        for booking, trip in bookings
    ]