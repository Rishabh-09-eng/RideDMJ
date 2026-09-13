import os
import secrets
import httpx
from datetime import datetime, timezone
from dotenv import load_dotenv

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import BookingsDB, TripsDB
from auth import get_cur_user
from .forms import VerifyPaymentRequest

load_dotenv()

router = APIRouter(
    prefix="/payment",
    tags=["Payment"]
)

CASHFREE_APP_ID = os.getenv("CASHFREE_APP_ID")
CASHFREE_SECRET_KEY = os.getenv("CASHFREE_SECRET_KEY")


async def create_payment(order_id: str):
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
            "customer_id": "ridedmj_user",
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


async def verify_payment(order_id: str):
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
    current_user=Depends(get_cur_user)
):
    try:
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

        # If already confirmed, return success idempotently
        if booking.b_status == "CONFIRMED":
            return {
                "success": True,
                "message": "Payment already confirmed",
                "payment": payment,
                "booking_id": booking.b_id,
                "ticket_code": booking.b_ticket_code
            }

        if payment.get("status") == "PAID":
            booking.b_status = "CONFIRMED"
            booking.b_expiresat = None

            if not booking.b_ticket_code:
                booking.b_ticket_code = secrets.token_urlsafe(16)

            db.commit()
            db.refresh(booking)

            return {
                "success": True,
                "message": "Payment confirmed",
                "payment": payment,
                "booking_id": booking.b_id,
                "ticket_code": booking.b_ticket_code
            }
        else:
            # Payment failed, cancelled, or user dropped
            if payment.get("status") in ["FAILED", "USER_DROPPED", "CANCELLED"]:
                if booking.b_status == "PENDING":
                    booking.b_status = "FAILED"
                    trip = db.query(TripsDB).filter(TripsDB.t_id == booking.b_trip_id).first()
                    if trip:
                        trip.t_available_seats += 1
                    db.commit()

            return {
                "success": False,
                "message": f"Payment status: {payment.get('status', 'Incomplete')}",
                "payment": payment,
                "booking_id": booking.b_id
            }

    except HTTPException:
        raise
    except Exception as e:
        print("VERIFY PAYMENT ERROR:", e)
        raise HTTPException(
            status_code=500,
            detail=f"Verification failed: {str(e)}"
        )
