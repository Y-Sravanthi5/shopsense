import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

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
      "Others"
    ],

    datasets: [
      {
        data: [35, 25, 20, 20]
      }
    ]
  };

  return (
    <div
      className="p-4 bg-white rounded-4 shadow"
    >
      <h5 className="mb-4">
        📦 Product Categories
      </h5>

      <Pie data={data} />
    </div>
  );
}

export default InventoryChart;