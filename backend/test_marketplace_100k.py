import os
import sys
import time

from dotenv import load_dotenv

sys.path.insert(0, os.path.abspath("backend"))

load_dotenv("tests/.env.test", override=True)

from database import SessionLocal
from models import Vendor, Transaction
from crud import advanced_revenue_analytics


def main():

    print("\nShopSense 100,000 Transaction Marketplace Test")
    print("================================================")

    db = SessionLocal()

    try:
        # -----------------------------------------
        # Check total transaction dataset
        # -----------------------------------------

        total_transactions = db.query(Transaction).count()

        print(
            f"\nTotal marketplace transactions: "
            f"{total_transactions:,}"
        )

        if total_transactions < 100_000:
            print(
                "FAIL: Less than 100,000 transactions "
                "are available."
            )
            return

        vendors = db.query(Vendor).all()

        print(
            f"Test vendors: {len(vendors)}"
        )

        # -----------------------------------------
        # Run analytics for every vendor
        # -----------------------------------------

        marketplace_start = time.perf_counter()

        total_processed = 0

        results = []

        for vendor in vendors:

            start = time.perf_counter()

            result = advanced_revenue_analytics(
                db,
                vendor.id
            )

            elapsed = (
                time.perf_counter() - start
            ) * 1000

            vendor_transactions = (
                result["summary"]["total_transactions"]
            )

            total_processed += vendor_transactions

            results.append({
                "vendor_id": vendor.id,
                "transactions": vendor_transactions,
                "time_ms": elapsed
            })

            print(
                f"Vendor {vendor.id}: "
                f"{vendor_transactions:,} transactions "
                f"processed in {elapsed:.2f} ms"
            )

        marketplace_elapsed = (
            time.perf_counter() - marketplace_start
        )

        # -----------------------------------------
        # Results
        # -----------------------------------------

        print("\n================================================")
        print("MARKETPLACE RESULTS")
        print("================================================")

        print(
            f"Database transactions : "
            f"{total_transactions:,}"
        )

        print(
            f"Analytics processed    : "
            f"{total_processed:,}"
        )

        print(
            f"Total processing time  : "
            f"{marketplace_elapsed:.2f} seconds"
        )

        print(
            f"Average vendor time    : "
            f"{sum(r['time_ms'] for r in results) / len(results):.2f} ms"
        )

        # -----------------------------------------
        # Validation
        # -----------------------------------------

        print("\n================================================")
        print("VALIDATION")
        print("================================================")

        if total_transactions == 100_000:
            print(
                "PASS: 100,000 marketplace transactions "
                "are available."
            )
        else:
            print(
                "INFO: Dataset contains more than "
                "100,000 transactions."
            )

        if total_processed > 0:
            print(
                "PASS: Analytics successfully processed "
                "marketplace transaction data."
            )
        else:
            print(
                "FAIL: No transactions were processed."
            )

        print("================================================")

    finally:
        db.close()


if __name__ == "__main__":
    main()