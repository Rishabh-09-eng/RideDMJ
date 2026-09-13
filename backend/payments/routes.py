import os
import uuid
import httpx

from datetime import datetime,timezone
import secrets
from dotenv import load_dotenv

from fastapi import APIRouter,HTTPException,Depends
from sqlalchemy.orm import Session

from database import get_db
from models import BookingsDB
from auth import get_cur_user

from .forms import VerifyPaymentRequest


load_dotenv()


router = APIRouter(
    prefix="/payment",
    tags=["Payment"]
)


CASHFREE_APP_ID = os.getenv("CASHFREE_APP_ID")
CASHFREE_SECRET_KEY = os.getenv("CASHFREE_SECRET_KEY")


async def create_payment(order_id):

    headers = {
        "Content-Type": "application/json",
        "x-api-version": "2025-01-01",
        "x-client-id": CASHFREE_APP_ID,
        "x-client-secret": CASHFREE_SECRET_KEY
    }

    payload = {
        "order_id": order_id,
        "order_amount": 20,
        "order_currency": "INR",
        "customer_details": {
            "customer_id": "test_user",
            "customer_phone": "9999999999"
        }
    }

    async with httpx.AsyncClient() as client:

        response = await client.post(
            "https://sandbox.cashfree.com/pg/orders",
            headers=headers,
            json=payload
        )

    if response.status_code not in [200,201]:

        raise HTTPException(
            status_code=response.status_code,
            detail=response.json()
        )

    data = response.json()

    return {
        "order_id": data["order_id"],
        "payment_session_id": data["payment_session_id"],
        "amount": data["order_amount"],
        "status": data["order_status"]
    }


async def verify_payment(order_id):

    headers = {
        "x-api-version": "2025-01-01",
        "x-client-id": CASHFREE_APP_ID,
        "x-client-secret": CASHFREE_SECRET_KEY
    }

    async with httpx.AsyncClient() as client:

        response = await client.get(
            f"https://sandbox.cashfree.com/pg/orders/{order_id}",
            headers=headers
        )

    if response.status_code != 200:

        raise HTTPException(
            status_code=response.status_code,
            detail=response.json()
        )

    data = response.json()

    return {
        "order_id": data["order_id"],
        "status": data["order_status"]
    }


@router.post("/verify")
async def payment_verify(
    data: VerifyPaymentRequest,
    db: Session = Depends(get_db),
    current_user = Depends(get_cur_user)
):

    payment = await verify_payment(data.order_id)

    booking = (
        db.query(BookingsDB)
        .filter(
            BookingsDB.b_order_id == data.order_id,
            BookingsDB.u_id == current_user
        )
        .first()
    )

    if not booking:

        raise HTTPException(
            status_code=404,
            detail="Booking not found"
        )

    if booking.b_trip_id != data.trip_id:

        raise HTTPException(
            status_code=400,
            detail="Trip does not match booking"
        )

    if payment["status"] != "PAID":

        return {
            "success": False,
            "message": "Payment not completed",
            "payment": payment,
            "booking_id": booking.b_id
        }

    if payment["status"] == "PAID":
        booking.b_status = "CONFIRMED"
        booking.b_expiresat = None

        if not booking.b_ticket_code:
            booking.b_ticket_code = secrets.token_urlsafe(16)

        db.commit()
        db.refresh(booking)
        
        return {
            "success": True,
            "message": "Payment already confirmed",
            "payment": payment,
            "booking_id": booking.b_id
        }

    
