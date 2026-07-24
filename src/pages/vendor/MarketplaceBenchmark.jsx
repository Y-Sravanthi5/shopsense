import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../services/api";

import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function MarketplaceBenchmark() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const vendorId = localStorage.getItem("vendor_id");

    if (!vendorId) {
      setLoading(false);
      return;
    }

    API.get(`/vendor/marketplace-benchmark/${vendorId}`)
      .then((res) => {
        console.log("Marketplace Benchmark:", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.error("Benchmark Error:", err);
      })
      .finally(() => {
        setLoading(false);
      });

  }, []);


  if (loading) {
    return (
      <DashboardLayout>
        <h4>Loading marketplace benchmark...</h4>
      </DashboardLayout>
    );
  }


  if (!data || data.error) {
    return (
      <DashboardLayout>

        <div className="alert alert-danger">
          {data?.error || "Unable to load marketplace benchmark."}
        </div>

      </DashboardLayout>
    );
  }


  const performance =
    Number(data.performance_percentage || 0);

  const marketShare =
    Number(data.market_share_percentage || 0);


  const revenueComparison = {

    labels: [
      "Your Revenue",
      "Marketplace Average"
    ],

    datasets: [
      {
        label: "Revenue (₹)",

        data: [
          data.vendor_revenue || 0,
          data.marketplace_average_revenue || 0
        ],

        backgroundColor: [
          "#5B3CC4",
          "#A5A5A5"
        ]
      }
    ]

  };


  const unitsComparison = {

    labels: [
      "Your Units",
      "Marketplace Average"
    ],

    datasets: [
      {
        label: "Units Sold",

        data: [
          data.vendor_units_sold || 0,
          data.marketplace_average_units || 0
        ],

        backgroundColor: [
          "#198754",
          "#A5A5A5"
        ]
      }
    ]

  };


  return (

    <DashboardLayout>

      <div className="container-fluid">

        <div className="mb-4">

          <h2 className="fw-bold">
            📊 Marketplace Benchmark
          </h2>

          <p className="text-muted">
            Compare your business performance with
            other approved vendors in ShopSense.
          </p>

        </div>


        {/* PERFORMANCE CARDS */}

        <div className="row g-4">

          <div className="col-lg-3 col-md-6">

            <div className="card shadow border-0 h-100">

              <div className="card-body">

                <p className="text-muted">
                  Your Revenue
                </p>

                <h3 className="fw-bold">
                  ₹{Number(
                    data.vendor_revenue || 0
                  ).toFixed(2)}
                </h3>

              </div>

            </div>

          </div>


          <div className="col-lg-3 col-md-6">

            <div className="card shadow border-0 h-100">

              <div className="card-body">

                <p className="text-muted">
                  Marketplace Average
                </p>

                <h3 className="fw-bold">
                  ₹{Number(
                    data.marketplace_average_revenue || 0
                  ).toFixed(2)}
                </h3>

              </div>

            </div>

          </div>


          <div className="col-lg-3 col-md-6">

            <div className="card shadow border-0 h-100">

              <div className="card-body">

                <p className="text-muted">
                  Performance
                </p>

                <h3
                  className={
                    performance > 0
                      ? "text-success fw-bold"
                      : performance < 0
                      ? "text-danger fw-bold"
                      : "text-secondary fw-bold"
                  }
                >

                  {performance > 0 ? "▲ " : ""}
                  {performance < 0 ? "▼ " : ""}

                  {performance.toFixed(2)}%

                </h3>

              </div>

            </div>

          </div>


          <div className="col-lg-3 col-md-6">

            <div className="card shadow border-0 h-100">

              <div className="card-body">

                <p className="text-muted">
                  Revenue Rank
                </p>

                <h3 className="fw-bold">

                  #{data.revenue_rank || "-"}

                  <span className="fs-6 text-muted">
                    {" "}of {data.total_vendors || 0}
                  </span>

                </h3>

              </div>

            </div>

          </div>

        </div>


        {/* SECOND ROW */}

        <div className="row g-4 mt-1">

          <div className="col-md-4">

            <div className="card shadow border-0 h-100">

              <div className="card-body">

                <h6 className="text-muted">
                  Market Share
                </h6>

                <h3 className="fw-bold">
                  {marketShare.toFixed(2)}%
                </h3>

                <div className="progress mt-3">

                  <div
                    className="progress-bar"
                    style={{
                      width:
                        `${Math.min(marketShare, 100)}%`
                    }}
                  >
                    {marketShare.toFixed(1)}%
                  </div>

                </div>

              </div>

            </div>

          </div>


          <div className="col-md-4">

            <div className="card shadow border-0 h-100">

              <div className="card-body">

                <h6 className="text-muted">
                  Units Sold
                </h6>

                <h3>
                  {data.vendor_units_sold || 0}
                </h3>

                <small className="text-muted">
                  Marketplace average:{" "}
                  {Number(
                    data.marketplace_average_units || 0
                  ).toFixed(2)}
                </small>

              </div>

            </div>

          </div>


          <div className="col-md-4">

            <div className="card shadow border-0 h-100">

              <div className="card-body">

                <h6 className="text-muted">
                  Transactions
                </h6>

                <h3>
                  {data.vendor_transactions || 0}
                </h3>

                <small className="text-muted">
                  Marketplace average:{" "}
                  {Number(
                    data.marketplace_average_transactions || 0
                  ).toFixed(2)}
                </small>

              </div>

            </div>

          </div>

        </div>


        {/* COMPARISON CHARTS */}

        <div className="row g-4 mt-1">

          <div className="col-lg-6">

            <div className="card shadow border-0">

              <div className="card-body">

                <h5 className="mb-4">
                  💰 Revenue Comparison
                </h5>

                <Bar data={revenueComparison} />

              </div>

            </div>

          </div>


          <div className="col-lg-6">

            <div className="card shadow border-0">

              <div className="card-body">

                <h5 className="mb-4">
                  📦 Sales Volume Comparison
                </h5>

                <Bar data={unitsComparison} />

              </div>

            </div>

          </div>

        </div>


        {/* LEADERBOARD */}

        <div className="card shadow border-0 mt-4 mb-5">

          <div className="card-body">

            <h4 className="mb-4">
              🏆 Marketplace Leaderboard
            </h4>

            <div className="table-responsive">

              <table className="table table-hover">

                <thead>

                  <tr>
                    <th>Rank</th>
                    <th>Vendor</th>
                    <th>Revenue</th>
                    <th>Units Sold</th>
                  </tr>

                </thead>

                <tbody>

                  {(data.leaderboard || []).map(
                    (vendor) => (

                      <tr
                        key={vendor.vendor_id}
                        className={
                          vendor.vendor_id ===
                          Number(data.vendor_id)
                            ? "table-success"
                            : ""
                        }
                      >

                        <td>
                          #{vendor.rank}
                        </td>

                        <td>
                          {vendor.business_name}
                        </td>

                        <td>
                          ₹{Number(
                            vendor.revenue || 0
                          ).toFixed(2)}
                        </td>

                        <td>
                          {vendor.units_sold}
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

}

export default MarketplaceBenchmark;