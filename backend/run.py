from fastapi import FastAPI
from payments.routes import router as payment_router
from database import engine
from fastapi import FastAPI
from users.routes import router as users
from bookings.routes import router as bookings
import models
app = FastAPI()

models.Base.metadata.create_all(bind=engine)
 
app.include_router(payment_router)
