import { useEffect, useState } from "react";
import axios from "axios";
import CustomerNavbar from "./components/CustomerNavbar";
import "../../styles/cAnalytics.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,        
    ArcElement,
    Tooltip,
    Legend
);
function CustomerAnalytics() {
    const customerId = localStorage.getItem("customer_id");

    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        try {
            console.log("Customer ID:", customerId);

            if (!customerId) {
                setError("Customer ID not found. Please login again.");
                setLoading(false);
                return;
            }

            const response = await axios.get(
                `http://127.0.0.1:8000/customer/analytics/${customerId}`
            );

            console.log("Analytics Response:", response.data);

            setAnalytics(response.data);
        } catch (err) {
            console.error(err);

            if (err.response) {
                setError(err.response.data.detail || "Failed to load analytics.");
            } else {
                setError("Unable to connect to server.");
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <>
                <CustomerNavbar />
                <div className="analytics-page">
                    <h2>Loading analytics...</h2>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <CustomerNavbar />
                <div className="analytics-page">
                    <h2>{error}</h2>
                </div>
            </>
        );
    }

    if (!analytics) {
        return (
            <>
                <CustomerNavbar />
                <div className="analytics-page">
                    <h2>No analytics found.</h2>
                </div>
            </>
        );
    }

    const summary = [
        {
            title: "Total Spent",
            value: `₹${analytics.total_spent.toLocaleString()}`,
            icon: "💰",
        },
        {
            title: "Orders",
            value: analytics.total_orders,
            icon: "📦",
        },
        {
            title: "Average Order",
            value: `₹${analytics.average_order_value.toLocaleString()}`,
            icon: "🛒",
        },
        {
            title: "Status",
            value: analytics.status,
            icon: "⭐",
        },
    ];
    const monthlyChartData = {
    labels: analytics.monthly_spending.map(item => item.month),
    datasets: [
        {
            label: "Monthly Spending",
            data: analytics.monthly_spending.map(item => item.amount),
            borderColor: "#2563eb",
            backgroundColor: "rgba(37,99,235,0.2)",
            fill: true,
            tension: 0.4
        }
    ]
};

const categoryChartData = {
    labels: analytics.category_spending.map(item => item.category),
    datasets: [
        {
            data: analytics.category_spending.map(item => item.amount),
            backgroundColor: [
                "#3b82f6",
                "#10b981",
                "#f59e0b",
                "#ef4444",
                "#8b5cf6",
                "#06b6d4"
            ]
        }
    ]
};

    return (
        <>
            <CustomerNavbar />

            <div className="analytics-page">

                <div className="analytics-header">
                    <h1>Customer Spending Analytics</h1>
                    <p>
                        Track your spending habits, shopping trends and personalized insights.
                    </p>
                </div>

                <div className="analytics-summary">
                    {summary.map((item, index) => (
                        <div className="analytics-card" key={index}>
                            <div className="analytics-icon">
                                {item.icon}
                            </div>

                            <h2>{item.value}</h2>
                            <p>{item.title}</p>
                        </div>
                    ))}
                </div>

                <div className="analytics-charts">

                    <div className="chart-card">
                        <h2>Monthly Spending</h2>

                        <div className="chart-container">
    {analytics.monthly_spending.length > 0 ? (
        <Line
            data={monthlyChartData}
            options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "top",
                    },
                },
            }}
        />
    ) : (
        <p>No monthly data available.</p>
    )}
</div>
                    </div>

                    <div className="chart-card">
                        <h2>Category Distribution</h2>

                        <div className="chart-container">
    {analytics.category_spending.length > 0 ? (
        <Doughnut
            data={categoryChartData}
            options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "bottom",
                    },
                },
            }}
        />
    ) : (
        <p>No category data available.</p>
    )}
</div>
                    </div>

                </div>

                <div className="analytics-bottom">

                    <div className="recent-orders">

                        <h2>Recent Purchases</h2>

                        <table>

                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Category</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>

                            <tbody>

                                {analytics.recent_orders.length > 0 ? (
                                    analytics.recent_orders.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.product}</td>
                                            <td>{item.category}</td>
                                            <td>₹{item.amount.toFixed(2)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">
                                            No recent purchases.
                                        </td>
                                    </tr>
                                )}

                            </tbody>

                        </table>

                    </div>

                    <div className="shopping-insights">

                        <h2>Shopping Insights</h2>

                        <ul>

                            <li>
                                Total Spent:
                                <strong> ₹{analytics.total_spent.toLocaleString()}</strong>
                            </li>

                            <li>
                                Total Orders:
                                <strong> {analytics.total_orders}</strong>
                            </li>

                            <li>
                                Average Order Value:
                                <strong> ₹{analytics.average_order_value.toLocaleString()}</strong>
                            </li>

                            <li>
                                Last Purchase:
                                <strong> {analytics.last_purchase_days} days ago</strong>
                            </li>

                            <li>
                                Customer Status:
                                <strong> {analytics.status}</strong>
                            </li>

                        </ul>

                    </div>

                </div>

            </div>
        </>
    );
}

export default CustomerAnalytics;