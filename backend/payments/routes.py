import os
import uuid
import httpx

from fastapi import APIRouter, HTTPException
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/payment",tags=["Payment"])

CASHFREE_APP_ID = os.getenv("CASHFREE_APP_ID")
CASHFREE_SECRET_KEY = os.getenv("CASHFREE_SECRET_KEY")

@router.post("/create")
async def create_payment():

    order_id = f"ridedmj_{uuid.uuid4().hex[:12]}"

    headers = {
        "Content-Type":"application/json",
        "x-api-version":"2025-01-01",
        "x-client-id":CASHFREE_APP_ID,
        "x-client-secret":CASHFREE_SECRET_KEY
    }

    payload = {
        "order_id":order_id,
        "order_amount":20,
        "order_currency":"INR",
        "customer_details":{
            "customer_id":"test_user",
            "customer_name":"RideDMJ User",
            "customer_email":"test@example.com",
            "customer_phone":"9999999999"
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
        "order_id":data["order_id"],
        "payment_session_id":data["payment_session_id"],
        "amount":data["order_amount"],
        "status":data["order_status"]
    }