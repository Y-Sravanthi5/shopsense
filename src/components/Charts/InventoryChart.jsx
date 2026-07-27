import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function InventoryChart() {

  const data = {
    labels: [
      "Electronics",
      "Fashion",
      "Groceries",
      "Others",
    ],

    datasets: [
      {
        data: [35, 25, 20, 20],

        backgroundColor: [
          "#6D4CE8",
          "#9278EE",
          "#B9A8F4",
          "#DED6FA",
        ],

        borderColor: "#FFFFFF",

        borderWidth: 3,

        hoverOffset: 4,
      },
    ],
  };


  const options = {

    responsive: true,

    maintainAspectRatio: false,

    cutout: "65%",

    plugins: {

      legend: {

        display: true,

        position: "top",

        labels: {

          usePointStyle: true,

          pointStyle: "circle",

          boxWidth: 8,

          boxHeight: 8,

          padding: 10,

          color: "#6B6C7C",

          font: {
            size: 12,
            family: "Inter, Segoe UI, sans-serif",
          },

        },

      },


      tooltip: {

        backgroundColor: "#242333",

        titleColor: "#FFFFFF",

        bodyColor: "#FFFFFF",

        padding: 10,

        cornerRadius: 8,

        callbacks: {

          label: function (context) {

            return ` ${context.label}: ${context.parsed}%`;

          },

        },

      },

    },


    layout: {

      padding: {
        top: 0,
        bottom: 0,
        left: 5,
        right: 5,
      },

    },

  };


  return (

    <div className="ss-inventory-chart">

      <h3 className="ss-chart-title">
        📦 Product Categories
      </h3>

      <div className="ss-inventory-canvas">

        <Doughnut
          data={data}
          options={options}
        />

      </div>

    </div>

  );

}

export default InventoryChart;