import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
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
        borderColor: "#5B3CC4",
        backgroundColor: "#5B3CC4",
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      }
    }
  };

  return (
    <div
      className="p-4 bg-white rounded-4 shadow"
    >
      <h5 className="mb-4">
        📈 Weekly Sales Trend
      </h5>

      <Line
        data={data}
        options={options}
      />
    </div>
  );
}

export default SalesChart;