import os
import uuid
import httpx

from fastapi import APIRouter, HTTPException, Depends
from dotenv import load_dotenv
from database import get_db
from .forms import VerifyPaymentRequest
from models import BookingsDB
from sqlalchemy.orm import Session
from datetime import datetime
from auth import get_cur_user



load_dotenv()


router = APIRouter(
    prefix="/payment",
    tags=["Payment"]
)


CASHFREE_APP_ID = os.getenv("CASHFREE_APP_ID")
CASHFREE_SECRET_KEY = os.getenv("CASHFREE_SECRET_KEY")

@router.post("/create")
async def create_payment(db: Session=Depends(get_db)):

    order_id = f"ridedmj_{uuid.uuid4().hex[:12]}"

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
            "customer_name": "RideDMJ User",
            "customer_email": "test@example.com",
            "customer_phone": "9999999999"
        }
    }

    async with httpx.AsyncClient() as client:

        response = await client.post(
            "https://sandbox.cashfree.com/pg/orders",
            headers=headers,
            json=payload
        )

    if response.status_code not in [200, 201]:
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
    db: Session=Depends(get_db),
    current_user = Depends(get_cur_user)
):

    payment = await verify_payment(data.order_id)

    if payment["status"] != "PAID":

        return {
            "success": False,
            "message": "Payment not completed",
            "payment": payment
        }

    booking = BookingsDB(
    b_trip_id=data.trip_id,
    u_id=current_user,
    b_createdat=datetime.utcnow(),
    b_status="CONFIRMED",
    b_expiresat=None
    )

    db.add(booking)
    db.commit()
    db.refresh(booking)

    return {
        "success": True,
        "message": "Payment successful",
        "payment": payment
    }