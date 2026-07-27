import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../services/api";

import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function SalesForecast() {
  const [forecast, setForecast] = useState({
    labels: [],
    revenue: [],
    prediction: 0,
    model: "",
    metrics: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const vendorId = localStorage.getItem("vendor_id");

    console.log("Sales Forecast Vendor ID:", vendorId);

    if (!vendorId) {
      setError("Vendor ID not found. Please login again.");
      setLoading(false);
      return;
    }

    API.get(`/vendor/sales-forecast/${vendorId}`)
      .then((res) => {
        console.log("Forecast Response:", res.data);

        setForecast({
          labels: res.data.labels || [],
          revenue: res.data.revenue || [],
          prediction: res.data.prediction || 0,
          model: res.data.model || "",
          metrics: res.data.metrics || null,
        });

        setError("");
      })
      .catch((err) => {
        console.error("Forecast Error:", err);

        setError(
          err.response?.data?.detail ||
            "Unable to load sales forecast."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const chartData = {
    labels: [...forecast.labels, "Prediction"],

    datasets: [
      {
        label: "Revenue (₹)",

        data: [
          ...forecast.revenue,
          forecast.prediction,
        ],

        borderColor: "#5B3CC4",
        backgroundColor: "#5B3CC4",

        borderWidth: 3,
        fill: false,
        tension: 0.4,
        pointRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: true,
      },

      tooltip: {
        callbacks: {
          label: function (context) {
            return `Revenue: ₹${Number(
              context.raw
            ).toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}`;
          },
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        ticks: {
          callback: function (value) {
            return `₹${Number(value).toLocaleString(
              "en-IN"
            )}`;
          },
        },
      },
    },
  };

  const formatMoney = (value) => {
    return Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center mt-5">
          <h4>Loading sales forecast...</h4>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="alert alert-danger mt-4">
          {error}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h2 className="fw-bold mb-4">
        🤖 AI Sales Forecast
      </h2>

      {/* =========================
          TOP CARDS
      ========================== */}

      <div className="row g-4 mb-4">

        {/* Predicted Revenue */}

        <div className="col-md-4">
          <div className="card shadow border-0 p-4 h-100 text-center">

            <h5>Predicted Revenue</h5>

            <h2 className="text-success mt-3">
              ₹ {formatMoney(forecast.prediction)}
            </h2>

            <small className="text-muted">
              Based on previous sales
            </small>

          </div>
        </div>

        {/* Model */}

        <div className="col-md-4">
          <div className="card shadow border-0 p-4 h-100 text-center">

            <h5>Forecasting Model</h5>

            <h4 className="mt-3 text-primary">
              {forecast.model || "Not Available"}
            </h4>

            <small className="text-muted">
              Machine learning algorithm
            </small>

          </div>
        </div>

        {/* Historical Points */}

        <div className="col-md-4">
          <div className="card shadow border-0 p-4 h-100 text-center">

            <h5>Historical Data Points</h5>

            <h2 className="mt-3">
              {forecast.labels.length}
            </h2>

            <small className="text-muted">
              Used for forecasting
            </small>

          </div>
        </div>

      </div>

      {/* =========================
          CHART
      ========================== */}

      <div
        className="card shadow border-0 p-4 mb-4"
        style={{ height: "450px" }}
      >

        <h4 className="mb-3">
          Sales Revenue & Forecast
        </h4>

        <Line
          data={chartData}
          options={chartOptions}
        />

      </div>

      {/* =========================
          MODEL METRICS
      ========================== */}

      {forecast.metrics && (
        <div className="card shadow border-0 p-4 mb-4">

          <h4 className="mb-4">
            📊 Model Evaluation Metrics
          </h4>

          <div className="row g-4">

            <div className="col-md-4">
              <div className="border rounded p-3 text-center">

                <h6>
                  MAE
                </h6>

                <h4>
                  ₹ {formatMoney(forecast.metrics.mae)}
                </h4>

                <small className="text-muted">
                  Mean Absolute Error
                </small>

              </div>
            </div>

            <div className="col-md-4">
              <div className="border rounded p-3 text-center">

                <h6>
                  RMSE
                </h6>

                <h4>
                  ₹ {formatMoney(forecast.metrics.rmse)}
                </h4>

                <small className="text-muted">
                  Root Mean Squared Error
                </small>

              </div>
            </div>

            <div className="col-md-4">
              <div className="border rounded p-3 text-center">

                <h6>
                  R² Score
                </h6>

                <h4>
                  {Number(
                    forecast.metrics.r2
                  ).toFixed(4)}
                </h4>

                <small className="text-muted">
                  Model fit score
                </small>

              </div>
            </div>

          </div>

        </div>
      )}

      {/* =========================
          FORECAST TABLE
      ========================== */}

      <div className="card shadow border-0 p-4">

        <h4 className="mb-3">
          Forecast Data
        </h4>

        {forecast.labels.length === 0 ? (

          <div className="alert alert-warning">

            Not enough historical sales data is
            available for this vendor.

          </div>

        ) : (

          <div className="table-responsive">

            <table className="table table-bordered table-hover">

              <thead className="table-light">

                <tr>
                  <th>Date</th>
                  <th>Revenue (₹)</th>
                </tr>

              </thead>

              <tbody>

                {forecast.labels.map(
                  (day, index) => (

                    <tr key={index}>

                      <td>
                        {day}
                      </td>

                      <td>
                        ₹{" "}
                        {formatMoney(
                          forecast.revenue[index]
                        )}
                      </td>

                    </tr>

                  )
                )}

                <tr className="table-success fw-bold">

                  <td>
                    Prediction
                  </td>

                  <td>
                    ₹{" "}
                    {formatMoney(
                      forecast.prediction
                    )}
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        )}

      </div>

    </DashboardLayout>
  );
}

export default SalesForecast;