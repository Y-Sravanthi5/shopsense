import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../services/api";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
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

function Analytics() {

    const [sales, setSales] = useState([]);

    useEffect(() => {

        const vendorId = localStorage.getItem("vendor_id");

        API.get(`/vendor/sales-chart/${vendorId}`)
            .then((res) => {
                setSales(res.data);
            });

    }, []);

    const data = {

        labels: sales.map(item => item.date),

        datasets: [

            {
                label: "Revenue",
                data: sales.map(item => item.revenue),
                borderColor: "green",
                backgroundColor: "rgba(0,128,0,0.2)",
                tension: 0.3
            }

        ]
    };

    return (

        <DashboardLayout>

            <h2 className="mb-4">
                📈 Sales Analytics
            </h2>

            <div className="card shadow p-4">

                <Line data={data} />

            </div>

        </DashboardLayout>

    );

}

export default Analytics;