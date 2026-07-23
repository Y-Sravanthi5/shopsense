import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../services/api";

import {
  Line
} from "react-chartjs-2";

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
  });

  useEffect(() => {

    const vendorId = localStorage.getItem("vendor_id");

    API.get(`/vendor/sales-forecast/${vendorId}`)
      .then((res) => {
        console.log("Forecast Response:", res.data);
        setForecast(res.data);
      })
      .catch((err) => {
        console.error("Forecast Error:", err);
      });

  }, []);

  const chartData = {
    labels: [...forecast.labels, "Prediction"],
    datasets: [
      {
        label: "Revenue (₹)",
        data: [...forecast.revenue, forecast.prediction],
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
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <DashboardLayout>

      <h2 className="fw-bold mb-4">
        🤖 AI Sales Forecast
      </h2>

      <div className="row">

        <div className="col-md-4">

          <div className="card shadow border-0 p-4">

            <h5>Predicted Revenue</h5>

            <h2 className="text-success mt-3">
              ₹ {forecast.prediction}
            </h2>

            <small className="text-muted">
              Based on previous sales
            </small>

          </div>

        </div>

        <div className="col-md-8">

          <div
            className="card shadow border-0 p-4"
            style={{ height: "450px" }}
          >

            <Line
              data={chartData}
              options={chartOptions}
            />

          </div>

        </div>

      </div>

      <div className="card shadow border-0 mt-4 p-4">

        <h4>Forecast Data</h4>

        <table className="table table-bordered mt-3">

          <thead>

            <tr>
              <th>Day</th>
              <th>Revenue (₹)</th>
            </tr>

          </thead>

          <tbody>

            {forecast.labels.map((day, index) => (
              <tr key={index}>
                <td>{day}</td>
                <td>₹ {forecast.revenue[index]}</td>
              </tr>
            ))}

            <tr className="table-success fw-bold">
              <td>Prediction</td>
              <td>₹ {forecast.prediction}</td>
            </tr>

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}

export default SalesForecast;