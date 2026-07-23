import { Link, useLocation } from "react-router-dom";

function AdminSidebar() {

    const location = useLocation();

    const menu = [

        {
            name: "Dashboard",
            icon: "📊",
            path: "/admin/dashboard"
        },

        {
            name: "Pending Vendors",
            icon: "⏳",
            path: "/admin/pending-vendors"
        },

        {
            name: "Approved Vendors",
            icon: "✅",
            path: "/admin/approved-vendors"
        },

        {
            name: "Rejected Vendors",
            icon: "❌",
            path: "/admin/rejected-vendors"
        },

        {
            name: "Customer Analytics",
            icon: "👥",
            path: "/admin/customer-analytics"
        },
        {
    name: "Customer Segmentation",
    icon: "🧩",
    path: "/admin/customer-segmentation"
},

        {
            name: "Sales Report",
            icon: "📈",
            path: "/admin/sales"
        },

        {
            name: "Sales Forecast",
            icon: "📉",
            path: "/admin/sales-forecast"
        }

    ];

    return (

        <div
            style={{
                width: "250px",
                background: "#1E1B4B",
                color: "white",
                minHeight: "100vh",
                padding: "25px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }}
        >

            <div>

                <h2 className="fw-bold mb-5">
                    🛍 ShopSense
                </h2>

                {

                    menu.map((item) => (

                        <Link
                            key={item.path}
                            to={item.path}
                            style={{
                                textDecoration: "none"
                            }}
                        >

                            <div
                                style={{
                                    padding: "14px",
                                    borderRadius: "12px",
                                    marginBottom: "10px",
                                    color: "white",
                                    background:
                                        location.pathname === item.path
                                            ? "#4F46E5"
                                            : "transparent"
                                }}
                            >

                                <span
                                    style={{
                                        marginRight: "12px"
                                    }}
                                >
                                    {item.icon}
                                </span>

                                {item.name}

                            </div>

                        </Link>

                    ))

                }

            </div>

            <div
                style={{
                    borderTop: "1px solid rgba(255,255,255,0.3)",
                    paddingTop: "15px"
                }}
            >

                <h6>Administrator</h6>

                <small>
                    admin@shopsense.com
                </small>

            </div>

        </div>

    );

}

export default AdminSidebar;