import os

from fastapi import FastAPI
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL,SUPABASE_KEY)

app = FastAPI()


@app.get("/")
def home():
    return {"message":"RideDMJ backend is running"}


@app.get("/supabase-test")
def supabase_test():
    try:
        response = supabase.table("test").select("*").execute()

        return {
            "connected":True,
            "data":response.data
        }

    except Exception as e:
        return {
            "connected":False,
            "error":str(e)
        }