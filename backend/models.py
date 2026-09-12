from database import Base
from sqlalchemy import Column, Integer, Date, DateTime, Time, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID

class BusesDB(Base):
    __tablename__ = "buses"

    bus_id = Column("id",Integer,primary_key=True)
    bus_cap = Column("capacity",Integer,nullable=False,default=40)


class SchedulesDB(Base):
    __tablename__ = "schedules"

    s_id = Column("id",Integer,primary_key=True)
    s_bus_id = Column("bus_id",Integer,ForeignKey("buses.id"),nullable=False)
    s_time = Column("time",Time,nullable=False)
    s_day_type = Column("day_type",String,nullable=False)
    s_direction = Column("direction",String,nullable=False)


class TripsDB(Base):
    __tablename__ = "trips"

    t_id = Column("id",Integer,primary_key=True)
    t_bus_id = Column("bus_id",Integer,ForeignKey("buses.id"),nullable=False)
    t_date = Column("date",Date,nullable=False)
    t_time = Column("time",Time,nullable=False)
    t_direction = Column("direction",String,nullable=False)

    t_available_seats = Column(
        "available_seats",
        Integer,
        nullable=False
    )


class BookingsDB(Base):
    __tablename__ = "bookings"

    b_id = Column("id",Integer,primary_key=True)

    b_trip_id = Column(
        "trip_id",
        Integer,
        ForeignKey("trips.id"),
        nullable=False
    )

    u_id = Column(
        "user_id",
        UUID,
        nullable=False
    )

    b_order_id = Column(
        "order_id",
        String,
        nullable=False,
        unique=True
    )

    b_createdat = Column(
        "created_at",
        DateTime,
        nullable=False
    )

    b_status = Column(
        "status",
        String,
        nullable=False,
        default="PENDING"
    )

    b_expiresat = Column(
        "expires_at",
        DateTime
    )