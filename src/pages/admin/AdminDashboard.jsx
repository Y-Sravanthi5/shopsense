import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FiUsers,
    FiUserCheck,
    FiUserX,
    FiClock,
    FiPackage,
    FiShoppingCart,
    FiDollarSign,
    FiPieChart
} from "react-icons/fi";

import AdminLayout from "../../components/layout/AdminLayout";
import API from "../../services/api";
import DashboardCharts from "./DashboardCharts";

import "../../styles/adminDashboard.css";

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
            icon: <FiUsers />,
            color: "purple"
        },

        {
            title: "Pending Vendors",
            value: dashboard.pending_vendors || 0,
            icon: <FiClock />,
            color: "orange",
            path: "/admin/pending-vendors"
        },

        {
            title: "Approved Vendors",
            value: dashboard.approved_vendors || 0,
            icon: <FiUserCheck />,
            color: "green",
            path: "/admin/approved-vendors"
        },

        {
            title: "Rejected Vendors",
            value: dashboard.rejected_vendors || 0,
            icon: <FiUserX />,
            color: "red",
            path: "/admin/rejected-vendors"
        },

        {
            title: "Customers",
            value: dashboard.total_customers || 0,
            icon: <FiUsers />,
            color: "blue"
        },

        {
            title: "Products",
            value: dashboard.total_products || 0,
            icon: <FiPackage />,
            color: "indigo"
        },

        {
            title: "Orders",
            value: dashboard.total_orders || 0,
            icon: <FiShoppingCart />,
            color: "cyan"
        },

        {
    title: "Revenue",
    value: `₹${Number(dashboard.total_revenue || 0).toLocaleString("en-IN", {
        maximumFractionDigits: 0
    })}`,
    icon: <FiDollarSign />,
    color: "green"
},

       
    ];

    return (

        <AdminLayout>

            <div className="admin-dashboard">

                {/* Hero */}

                <section className="dashboard-hero">

                    <div className="hero-left">

                        <span className="dashboard-tag">

                            ShopSense Admin

                        </span>

                        <h1>
    Welcome Back, Admin 👋
</h1>

<p>
    Here's what's happening across your marketplace today.
    Monitor vendors, customers, orders, products and revenue
    from one centralized dashboard.
</p>

                    </div>

                    <div className="hero-right">

                        <div className="hero-circle">

                            <FiPieChart />

                        </div>

                    </div>

                </section>
                <div className="dashboard-summary">

    <div>

        <h3>

            Marketplace Health

        </h3>

        <p>

            All systems are running normally.

        </p>

    </div>

    <div className="summary-badge">

        Active Marketplace

    </div>

</div>

                {/* Statistics */}

                <section className="dashboard-grid">

                    {

                        cards.map((card, index) => (

                            <div

                                key={index}

                                className="dashboard-card"

                                style={{
                                    cursor: card.path
                                        ? "pointer"
                                        : "default"
                                }}

                                onClick={() => {

                                    if (card.path)

                                        navigate(card.path);

                                }}

                            >

                                <div className="dashboard-card-top">

                                    <div>

                                        <p>

                                            {card.title}

                                        </p>

                                        <h2>

                                            {card.value}

                                        </h2>

                                    </div>

                                    <div
                                        className={`dashboard-icon ${card.color}`}
                                    >

                                        {card.icon}

                                    </div>

                                </div>

                            </div>

                        ))

                    }

                </section>

                {/* Charts */}

                <section className="dashboard-chart-section">

                    <DashboardCharts dashboard={dashboard} />
                    
                    

                </section>

            </div>

        </AdminLayout>

    );

}

export default AdminDashboard;