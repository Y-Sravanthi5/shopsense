import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
);

function DashboardCharts({ dashboard }) {

    const barData = {
        labels: [
            "Customers",
            "Vendors",
            "Products",
            "Orders"
        ],
        datasets: [
            {
                label: "Count",
                data: [
                    dashboard.total_customers || 0,
                    dashboard.total_vendors || 0,
                    dashboard.total_products || 0,
                    dashboard.total_orders || 0
                ]
            }
        ]
    };

    const pieData = {
        labels: [
            "Approved",
            "Pending",
            "Rejected"
        ],
        datasets: [
            {
                data: [
                    dashboard.approved_vendors || 0,
                    dashboard.pending_vendors || 0,
                    dashboard.rejected_vendors || 0
                ]
            }
        ]
    };

    return (

        <div className="row mt-4">

            <div className="col-md-7">

                <div className="card shadow">

                    <div className="card-body">

                        <h5>Marketplace Overview</h5>

                        <Bar data={barData} />

                    </div>

                </div>

            </div>

            <div className="col-md-5">

                <div className="card shadow">

                    <div className="card-body">

                        <h5>Vendor Status</h5>

                        <Pie data={pieData} />

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DashboardCharts;