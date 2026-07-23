import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

function VendorCharts({ dashboard }) {

    const data = {

        labels: [
            "Products",
            "Orders",
            "Revenue"
        ],

        datasets: [

            {

                label: "Vendor Statistics",

                data: [

                    dashboard.total_products || 0,

                    dashboard.total_orders || 0,

                    dashboard.total_revenue || 0

                ]

            }

        ]

    };

    return (

        <div className="card shadow mt-4">

            <div className="card-body">

                <h4 className="mb-4">

                    Vendor Performance

                </h4>

                <Bar data={data} />

            </div>

        </div>

    );

}

export default VendorCharts;