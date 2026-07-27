import time
import statistics
import concurrent.futures

import requests


URL = "http://127.0.0.1:8000/vendor/advanced-revenue/1"

TOTAL_REQUESTS = 100
CONCURRENT_USERS = 10


def send_request():

    start = time.perf_counter()

    try:

        response = requests.get(
            URL,
            timeout=10
        )

        elapsed = (
            time.perf_counter() - start
        ) * 1000

        return {
            "success": response.status_code == 200,
            "time": elapsed,
            "status_code": response.status_code
        }

    except requests.RequestException:

        elapsed = (
            time.perf_counter() - start
        ) * 1000

        return {
            "success": False,
            "time": elapsed,
            "status_code": None
        }


def percentile(values, percentile_value):

    values = sorted(values)

    index = int(
        len(values) * percentile_value
    )

    index = min(
        index,
        len(values) - 1
    )

    return values[index]


def run_test():

    print("\nShopSense Analytics API Performance Test")
    print("----------------------------------------")

    print("Endpoint:", URL)
    print("Requests:", TOTAL_REQUESTS)
    print("Concurrent Users:", CONCURRENT_USERS)

    results = []

    test_start = time.perf_counter()

    with concurrent.futures.ThreadPoolExecutor(
        max_workers=CONCURRENT_USERS
    ) as executor:

        futures = [
            executor.submit(send_request)
            for _ in range(TOTAL_REQUESTS)
        ]

        for future in concurrent.futures.as_completed(
            futures
        ):
            results.append(future.result())

    total_duration = (
        time.perf_counter() - test_start
    )

    successful = [
        result
        for result in results
        if result["success"]
    ]

    failed = TOTAL_REQUESTS - len(successful)

    if not successful:

        print("\nAll requests failed.")
        return

    response_times = [
        result["time"]
        for result in successful
    ]

    average = statistics.mean(response_times)

    minimum = min(response_times)

    maximum = max(response_times)

    p95 = percentile(
        response_times,
        0.95
    )

    requests_per_second = (
        TOTAL_REQUESTS / total_duration
    )

    print("\nRESULTS")
    print("----------------------------------------")

    print(
        f"Successful Requests : {len(successful)}"
    )

    print(
        f"Failed Requests     : {failed}"
    )

    print(
        f"Average Response    : {average:.2f} ms"
    )

    print(
        f"Minimum Response    : {minimum:.2f} ms"
    )

    print(
        f"Maximum Response    : {maximum:.2f} ms"
    )

    print(
        f"P95 Response Time   : {p95:.2f} ms"
    )

    print(
        f"Requests / Second   : {requests_per_second:.2f}"
    )

    print(
        f"Total Test Time     : {total_duration:.2f} sec"
    )

    print("----------------------------------------")

    if failed == 0 and p95 < 300:

        print(
            "PASS: P95 response time is below 300 ms."
        )

    else:

        print(
            "FAIL: Performance target was not achieved."
        )


if __name__ == "__main__":
    run_test()