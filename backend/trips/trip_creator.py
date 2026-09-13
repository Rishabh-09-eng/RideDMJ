from datetime import date
from sqlalchemy.orm import Session

from trip_schedule import BUS_SCHEDULE
from models import TripsDB, BookingsDB


def create_daily_trips(db: Session):
    db.query(BookingsDB).delete()
    db.query(TripsDB).delete()

    day_type = 0 if date.today().weekday() < 5 else 1

    for schedule in BUS_SCHEDULE:
        if schedule["day_type"] != day_type:
            continue

        trip = TripsDB(
            t_bus_id=schedule["bus_id"],
            t_time=schedule.get("time") or schedule.get("backend_time"),
            t_direction=schedule["direction"],
        )

        db.add(trip)

    db.commit()