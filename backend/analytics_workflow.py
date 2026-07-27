from datetime import datetime

import models
import crud


def run_analytics_workflow(db):

    start_time = datetime.utcnow()

    vendors = (
        db.query(models.Vendor)
        .filter(models.Vendor.status == "Approved")
        .all()
    )

    results = []

    successful = 0
    failed = 0

    for vendor in vendors:

        try:

            # --------------------------------
            # Revenue Analytics
            # --------------------------------

            revenue_analytics = (
                crud.advanced_revenue_analytics(
                    db,
                    vendor.id
                )
            )

            # --------------------------------
            # Marketplace Benchmark
            # --------------------------------

            benchmark = (
                crud.marketplace_benchmark(
                    db,
                    vendor.id
                )
            )

            # --------------------------------
            # ML Sales Forecast
            # --------------------------------

            forecast = (
                crud.ml_sales_forecast(
                    db,
                    vendor.id
                )
            )

            successful += 1

            results.append({
                "vendor_id": vendor.id,
                "business_name": vendor.business_name,
                "status": "success",

                "total_revenue":
                    revenue_analytics
                    .get("summary", {})
                    .get("total_revenue", 0),

                "marketplace_rank":
                    benchmark.get(
                        "revenue_rank",
                        0
                    ),

                "predicted_sales":
                    forecast.get(
                        "prediction",
                        0
                    )
            })

        except Exception as error:

            failed += 1

            results.append({
                "vendor_id": vendor.id,
                "business_name": vendor.business_name,
                "status": "failed",
                "error": str(error)
            })

    end_time = datetime.utcnow()

    execution_seconds = (
        end_time - start_time
    ).total_seconds()

    return {
        "workflow": "ShopSense Analytics Pipeline",

        "started_at":
            start_time.isoformat(),

        "completed_at":
            end_time.isoformat(),

        "execution_seconds":
            round(execution_seconds, 3),

        "vendors_processed":
            len(vendors),

        "successful":
            successful,

        "failed":
            failed,

        "status":
            "completed"
            if failed == 0
            else "completed_with_errors",

        "results":
            results
    }