from apscheduler.schedulers.asyncio import AsyncIOScheduler

from database import SessionLocal
from trip_creator import create_daily_trips


scheduler = AsyncIOScheduler()


def daily_trip_job():
    
    db = SessionLocal()

    try:
        create_daily_trips(db)
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()

scheduler.add_job(
    daily_trip_job,
    "cron",
    hour=0,
    minute=5
)