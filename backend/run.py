from fastapi import FastAPI
from payments.routes import router as payment_router
from database import engine
from fastapi import FastAPI

app = FastAPI()

from .users.routes import router
 
app.include_router(payment_router)
