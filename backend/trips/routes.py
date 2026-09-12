from sqlalchemy.orm import Session
from database import get_db
from datetime import date
from models import TripsDB
from fastapi import Depends, Response, status, HTTPException, APIRouter
from auth import get_cur_user

router = APIRouter(prefix="/trips")

@router.get("/")
def get_ticket(db: Session=Depends(get_db)):
    today = 0 if date.today().weekday() < 5 else 1
    db.query(TripsDB).get()

@router.get("/availability/{trip_id}")
def get_availability(db: Session=Depends(get_db)):
    

@router.get("/book")
def book_ticket(data=dict, db: Session=Depends(get_db), user_id: int = Depends(get_cur_user)):
    #bus_id
    #time slot

    bus_id = data["bus_id"]
    bus_slot = data["bus_slot"]

    available_seats = db.query(TripsDB).filter("t_bus_id"==bus_id, 
                                               "t_time"==bus_slot).first().t_available_seats


    if available_seats>0:
        #start payment gateway
        #if payment successfull



