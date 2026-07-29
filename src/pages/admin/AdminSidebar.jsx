import { NavLink, useNavigate } from "react-router-dom";
import {
    FiGrid,
    FiClock,
    FiCheckCircle,
    FiXCircle,
    FiUsers,
    FiPieChart,
    FiTrendingUp,
    FiBarChart2,
    FiShoppingBag,
    FiLogOut
} from "react-icons/fi";

import "../../styles/adminSidebar.css";

function AdminSidebar() {

    const navigate = useNavigate();

    const handleLogout = () => {

        const confirmLogout = window.confirm(
            "Are you sure you want to logout?"
        );

        if (!confirmLogout) return;

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");

        navigate("/login");

    };

    const menu = [

        {
            name: "Dashboard",
            icon: <FiGrid />,
            path: "/admin/dashboard"
        },

        {
            name: "Pending Vendors",
            icon: <FiClock />,
            path: "/admin/pending-vendors"
        },

        {
            name: "Approved Vendors",
            icon: <FiCheckCircle />,
            path: "/admin/approved-vendors"
        },

        {
            name: "Rejected Vendors",
            icon: <FiXCircle />,
            path: "/admin/rejected-vendors"
        },

        {
            name: "Customer Analytics",
            icon: <FiUsers />,
            path: "/admin/customer-analytics"
        },

        {
            name: "Customer Segmentation",
            icon: <FiPieChart />,
            path: "/admin/customer-segmentation"
        },

        {
            name: "Sales Report",
            icon: <FiTrendingUp />,
            path: "/admin/sales"
        },

        {
            name: "Sales Forecast",
            icon: <FiBarChart2 />,
            path: "/admin/sales-forecast"
        }

    ];

    return (

        <aside className="admin-sidebar">

            <div>

                <div className="sidebar-header">

                    <div className="logo-circle">

                        <FiShoppingBag />

                    </div>

                    <div>

                        <h2>ShopSense</h2>

                        <p>Admin Panel</p>

                    </div>

                </div>

                <nav>

                    {

                        menu.map(item => (

                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    isActive
                                        ? "sidebar-link active"
                                        : "sidebar-link"
                                }
                            >

                                {item.icon}

                                <span>{item.name}</span>

                            </NavLink>

                        ))

                    }

                </nav>

            </div>

            <div>

                <div className="sidebar-footer">

                    <div className="admin-avatar">

                        A

                    </div>

                    <div>

                        <h4>Administrator</h4>

                        <p>admin@shopsense.com</p>

                    </div>

                </div>

                <button
                    className="sidebar-logout"
                    onClick={handleLogout}
                >

                    <FiLogOut />

                    <span>Logout</span>

                </button>

            </div>

        </aside>

    );

}

export default AdminSidebar;