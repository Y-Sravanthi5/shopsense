import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../services/api";

function AIDashboard() {

    const [data, setData] = useState(null);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const vendorId = localStorage.getItem("vendor_id");

            const res = await API.get(
                `/vendor/ai-dashboard/${vendorId}`
            );

            setData(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    if (!data) {

        return (

            <DashboardLayout>

                <h3>Loading AI Dashboard...</h3>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <h2 className="fw-bold mb-4">
                🤖 AI Dashboard
            </h2>

            <div className="row g-4">

                <div className="col-md-4">
                    <div className="card shadow border-0">
                        <div className="card-body text-center">
                            <h5>📦 Products</h5>
                            <h2>{data.total_products}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow border-0">
                        <div className="card-body text-center">
                            <h5>💳 Orders</h5>
                            <h2>{data.total_orders}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow border-0">
                        <div className="card-body text-center">
                            <h5>💰 Revenue</h5>
                            <h2>₹ {data.total_revenue}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow border-0">
                        <div className="card-body text-center">
                            <h5>⚠️ Low Stock</h5>
                            <h2>{data.low_stock_products}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow border-0">
                        <div className="card-body text-center">
                            <h5>❌ Out Of Stock</h5>
                            <h2>{data.out_of_stock_products}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow border-0">
                        <div className="card-body text-center">
                            <h5>🏆 Top Product</h5>
                            <h5>{data.top_selling_product}</h5>
                        </div>
                    </div>
                </div>

            </div>

            <div className="card shadow border-0 mt-5">

                <div className="card-body">

                    <h4 className="mb-4">
                        🤖 AI Insights
                    </h4>

                    <ul className="list-group">

                        <li className="list-group-item">
                            📦 You currently have <b>{data.total_products}</b> products listed.
                        </li>

                        <li className="list-group-item">
                            💳 Total completed orders:
                            <b> {data.total_orders}</b>
                        </li>

                        <li className="list-group-item">
                            💰 Total revenue generated:
                            <b> ₹ {data.total_revenue}</b>
                        </li>

                        <li className="list-group-item">
                            ⚠️
                            <b> {data.low_stock_products}</b>
                            {" "}products need restocking.
                        </li>

                        <li className="list-group-item">
                            ❌
                            <b> {data.out_of_stock_products}</b>
                            {" "}products are completely out of stock.
                        </li>

                        <li className="list-group-item">
                            🏆 Your best-selling product is
                            <b> {data.top_selling_product}</b>.
                        </li>

                    </ul>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default AIDashboard;