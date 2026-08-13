import sys
import os
import random
import time
from datetime import datetime, timedelta

sys.path.insert(0, os.path.abspath("backend"))

from database import SessionLocal
from models import Vendor, Product, Transaction


TOTAL_TRANSACTIONS = 100_000
BATCH_SIZE = 5_000

db = SessionLocal()

try:
    vendors = db.query(Vendor).all()
    products = db.query(Product).all()

    if not vendors or not products:
        raise Exception(
            "Test vendors/products are missing. "
            "Run the setup step first."
        )

    print("Starting transaction generation...")
    print(f"Target transactions: {TOTAL_TRANSACTIONS}")
    print(f"Batch size: {BATCH_SIZE}")

    start_time = time.perf_counter()

    transactions_created = 0

    while transactions_created < TOTAL_TRANSACTIONS:

        batch = []

        remaining = TOTAL_TRANSACTIONS - transactions_created
        current_batch_size = min(BATCH_SIZE, remaining)

        for _ in range(current_batch_size):

            product = random.choice(products)

            quantity = random.randint(1, 10)

            unit_price = float(product.price)

            total_amount = quantity * unit_price

            transaction_date = (
                datetime.utcnow()
                - timedelta(
                    days=random.randint(0, 365)
                )
            )

            transaction = Transaction(
                vendor_id=product.vendor_id,
                product_id=product.id,
                quantity=quantity,
                unit_price=unit_price,
                total_amount=total_amount,
                transaction_date=transaction_date
            )

            batch.append(transaction)

        db.bulk_save_objects(batch)
        db.commit()

        transactions_created += current_batch_size

        print(
            f"Created "
            f"{transactions_created:,}/"
            f"{TOTAL_TRANSACTIONS:,} transactions"
        )

    elapsed = time.perf_counter() - start_time

    print("\n----------------------------------------")
    print("Transaction generation completed.")
    print(f"Total transactions : {transactions_created:,}")
    print(f"Generation time    : {elapsed:.2f} seconds")
    print("----------------------------------------")

finally:
    db.close()