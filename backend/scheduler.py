from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime

from database import SessionLocal
import analytics_workflow


scheduler = BackgroundScheduler()


def scheduled_analytics_job():

    db = SessionLocal()

    try:

        print("\n====================================")
        print("Starting scheduled analytics workflow")
        print("Time:", datetime.now())
        print("====================================")

        result = analytics_workflow.run_analytics_workflow(db)

        print("Workflow Status:", result["status"])
        print("Vendors Processed:", result["vendors_processed"])
        print("Successful:", result["successful"])
        print("Failed:", result["failed"])

        print("====================================")
        print("Analytics workflow completed")
        print("====================================\n")

    except Exception as error:

        print("Scheduled analytics workflow failed:")
        print(error)

    finally:

        db.close()


def start_scheduler():

    if not scheduler.running:

        scheduler.add_job(
    scheduled_analytics_job,
    trigger="cron",
    hour=0,
    minute=0,
    id="shopsense_analytics_job",
    replace_existing=True
)

        scheduler.start()

        print(
            "ShopSense Analytics Scheduler Started"
        )