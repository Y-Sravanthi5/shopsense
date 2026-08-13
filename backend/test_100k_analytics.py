import os
import sys
import time

from dotenv import load_dotenv

# Add backend to Python path
sys.path.insert(0, os.path.abspath("backend"))

# Use the test database
load_dotenv("tests/.env.test", override=True)

from database import SessionLocal
from crud import advanced_revenue_analytics


VENDOR_ID = 1


def main():

    print("\nShopSense 100,000 Transaction Analytics Test")
    print("---------------------------------------------")

    db = SessionLocal()

    try:
        # Verify transaction count
        from models import Transaction

        transaction_count = (
            db.query(Transaction)
            .count()
        )

        print(
            f"Transactions in test database: "
            f"{transaction_count:,}"
        )

        if transaction_count < 100_000:
            print(
                "\nFAIL: Test database contains "
                "less than 100,000 transactions."
            )
            return

        print(f"Vendor being tested: {VENDOR_ID}")

        # -----------------------------------------
        # Run actual ShopSense analytics
        # -----------------------------------------

        start = time.perf_counter()

        result = advanced_revenue_analytics(
            db,
            VENDOR_ID
        )

        elapsed = (
            time.perf_counter() - start
        ) * 1000

        # -----------------------------------------
        # Display results
        # -----------------------------------------

        print("\nANALYTICS RESULT")
        print("---------------------------------------------")

        summary = result["summary"]

        print(
            f"Total Revenue       : "
            f"₹{summary['total_revenue']:,.2f}"
        )

        print(
            f"Total Transactions  : "
            f"{summary['total_transactions']:,}"
        )

        print(
            f"Total Units Sold    : "
            f"{summary['total_units_sold']:,}"
        )

        print(
            f"Average Transaction : "
            f"₹{summary['average_transaction_value']:,.2f}"
        )

        print(
            f"Top Category        : "
            f"{result['top_category']}"
        )

        print("\nPERFORMANCE")
        print("---------------------------------------------")

        print(
            f"Analytics Processing Time : "
            f"{elapsed:.2f} ms"
        )

        print(
            f"Transactions Processed    : "
            f"{summary['total_transactions']:,}"
        )

        # -----------------------------------------
        # Validation
        # -----------------------------------------

        print("\nVALIDATION")
        print("---------------------------------------------")

        if summary["total_transactions"] > 0:

            print(
                "PASS: Analytics successfully "
                "processed transaction data."
            )

        else:

            print(
                "FAIL: Analytics returned zero transactions."
            )

        print("---------------------------------------------")

    finally:
        db.close()


if __name__ == "__main__":
    main()