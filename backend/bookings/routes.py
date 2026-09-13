from fastapi import APIRouter
from database import get_db
from sqlalchemy.orm import Depends, Session

router = APIRouter(prefix="/booking_info")

@router.get("/generate_ticket")
def generate_tkt(db: Session=Depends(get_db)):
    pass