import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function SalesChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

    datasets: [
      {
        label: "Sales",
        data: [12, 19, 8, 15, 22, 18, 25],

        borderColor: "#6546D7",
        backgroundColor: "#6546D7",

        borderWidth: 3,

        pointRadius: 4,
        pointHoverRadius: 6,

        pointBackgroundColor: "#6546D7",

        tension: 0.4,

        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top",

        labels: {
          boxWidth: 45,
          boxHeight: 14,

          padding: 12,

          font: {
            size: 14,
          },
        },
      },

      tooltip: {
        backgroundColor: "#242333",
        padding: 10,
        cornerRadius: 8,
      },
    },

    scales: {
      x: {
        grid: {
          color: "rgba(0,0,0,0.08)",
        },

        ticks: {
          font: {
            size: 13,
          },
        },
      },

      y: {
        grid: {
          color: "rgba(0,0,0,0.08)",
        },

        ticks: {
          font: {
            size: 13,
          },
        },
      },
    },

    layout: {
      padding: {
        top: 0,
        left: 4,
        right: 4,
        bottom: 0,
      },
    },
  };

  return (
    <div className="ss-sales-chart">

      <h3 className="ss-chart-title">
        📈 Weekly Sales Trend
      </h3>

      <div className="ss-sales-canvas">
        <Line data={data} options={options} />
      </div>

    </div>
  );
}

export default SalesChart;