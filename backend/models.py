from .database import Base
from sqlalchemy import Column, Integer, DateTime, Time, ForeignKey
from sqlalchemy.dialects.postgresql import UUID

class BookingsDB(Base):
    __tablename__ = "bookings"

    b_id = Column("id", Integer, primary_key=True)
    b_slot = Column("slot", Time)
    u_id = Column("user_id", UUID, ForeignKey("auth.users.id"))
    b_createdat = Column("created_at", DateTime)
    # b_payment_reference = 