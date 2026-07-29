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

import "../../styles/DashboardCharts.css";

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
                label: "Marketplace Count",
                data: [
                    dashboard.total_customers || 0,
                    dashboard.total_vendors || 0,
                    dashboard.total_products || 0,
                    dashboard.total_orders || 0
                ],
                backgroundColor: [
                    "#6C63FF",
                    "#3B82F6",
                    "#10B981",
                    "#F59E0B"
                ],
                borderRadius: 10
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
                ],
                backgroundColor: [
                    "#10B981",
                    "#F59E0B",
                    "#EF4444"
                ],
                borderWidth: 0
            }
        ]
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0
                }
            }
        }
    };

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom"
            }
        }
    };

    return (

        <div className="charts-grid">

            <div className="chart-card">

                <div className="chart-header">

                    <h3>Marketplace Overview</h3>

                    <span>Statistics</span>

                </div>

                <Bar
                    data={barData}
                    options={barOptions}
                />

            </div>

            <div className="chart-card">

                <div className="chart-header">

                    <h3>Vendor Status</h3>

                    <span>Distribution</span>

                </div>

                <Pie
                    data={pieData}
                    options={pieOptions}
                />

            </div>

        </div>

    );

}

export default DashboardCharts;