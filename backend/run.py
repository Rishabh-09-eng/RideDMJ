from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from payments.routes import router as payment_router
from trips.routes import router as trips_router
from booking_info.routes import router as booking_info_router
from bookings.routes import router as bookings_router

import models


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://172.16.0.2:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(payment_router, prefix="/api")
app.include_router(trips_router, prefix="/api")
app.include_router(booking_info_router, prefix="/api")
app.include_router(bookings_router, prefix="/api")

# Also mount without /api prefix for backward compatibility
app.include_router(payment_router)
app.include_router(trips_router)
app.include_router(booking_info_router)
app.include_router(bookings_router)