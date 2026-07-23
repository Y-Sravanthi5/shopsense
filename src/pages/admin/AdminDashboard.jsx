import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import API from "../../services/api";
import DashboardCharts from "./DashboardCharts";

function AdminDashboard() {

    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState({});

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const res = await API.get("/admin/dashboard");

            setDashboard(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    const cards = [

        {
            title: "Total Vendors",
            value: dashboard.total_vendors || 0,
            color: "primary"
        },

        {
            title: "Pending Vendors",
            value: dashboard.pending_vendors || 0,
            color: "warning",
            path: "/admin/pending-vendors"
        },

        {
            title: "Approved Vendors",
            value: dashboard.approved_vendors || 0,
            color: "success",
            path: "/admin/approved-vendors"
        },

        {
            title: "Rejected Vendors",
            value: dashboard.rejected_vendors || 0,
            color: "danger",
            path: "/admin/rejected-vendors"
        },

        {
            title: "Customers",
            value: dashboard.total_customers || 0,
            color: "info"
        },

        {
            title: "Products",
            value: dashboard.total_products || 0,
            color: "secondary"
        },

        {
            title: "Orders",
            value: dashboard.total_orders || 0,
            color: "dark"
        },

        {
            title: "Revenue",
            value: "₹" + (dashboard.total_revenue || 0),
            color: "success"
        },
        {
    title: "Customer Segmentation",
    value: "View",
    color: "primary",
    path: "/admin/customer-segmentation"
},

    ];

    return (

        <AdminLayout>

            <h2 className="mb-4">

                Admin Dashboard

            </h2>

            <div className="row">

                {

                    cards.map((card, index) => (

                        <div
                            className="col-lg-3 col-md-6 mb-4"
                            key={index}
                        >

                            <div

                                className={`card border-${card.color} shadow h-100`}

                                style={{
                                    cursor: card.path ? "pointer" : "default"
                                }}

                                onClick={() => {

                                    if (card.path)

                                        navigate(card.path);

                                }}

                            >

                                <div className="card-body text-center">

                                    <h5>

                                        {card.title}

                                    </h5>

                                    <h2 className={`text-${card.color}`}>

                                        {card.value}

                                    </h2>

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

            {/* Dashboard Charts */}

            <DashboardCharts dashboard={dashboard} />

        </AdminLayout>

    );

}

export default AdminDashboard;