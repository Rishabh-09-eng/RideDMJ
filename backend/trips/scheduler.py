import traceback
from apscheduler.schedulers.asyncio import AsyncIOScheduler

from database import SessionLocal
from .trip_creator import create_daily_trips

scheduler = AsyncIOScheduler(timezone="Asia/Kolkata")


def daily_trip_job():
    print("[SCHEDULER] >>> Triggered daily_trip_job...")
    db = SessionLocal()

    try:
        create_daily_trips(db)
        print("[SCHEDULER] >>> Trips created successfully in database!")
    except Exception as e:
        db.rollback()
        print(f"[SCHEDULER ERROR] Failed to create trips: {e}")
        traceback.print_exc()
    finally:
        db.close()


scheduler.add_job(
    daily_trip_job,
    "cron",
    hour=0,   # Target hour (IST)
    minute=5  # Target minute (IST)
    # second=30
)