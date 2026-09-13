from datetime import date
from sqlalchemy.orm import Session

from .trip_schedule import BUS_SCHEDULE
from models import TripsDB, BookingsDB, BusesDB


def create_daily_trips(db: Session):
    # Ensure buses exist
    for bus_id in [1, 2]:
        bus = db.query(BusesDB).filter(BusesDB.bus_id == bus_id).first()
        if not bus:
            bus = BusesDB(bus_id=bus_id, bus_cap=40)
            db.add(bus)
    db.commit()

    # Clear old bookings and trips
    db.query(BookingsDB).delete()
    db.query(TripsDB).delete()

    today = date.today()
    day_type = 0 if today.weekday() < 5 else 1

    for schedule in BUS_SCHEDULE:
        if schedule["day_type"] != day_type:
            continue

        trip = TripsDB(
            t_bus_id=schedule["bus_id"],
            t_date=today,
            t_time=schedule.get("time") or schedule.get("backend_time"),
            t_direction=schedule["direction"],
            t_available_seats=40,
        )

        db.add(trip)

    db.commit()