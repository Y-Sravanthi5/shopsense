import { Link, useLocation, useNavigate } from "react-router-dom";

function DashboardLayout({ children }) {

  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [

    {
      name: "Dashboard",
      icon: "🏠",
      path: "/vendor/dashboard"
    },

    {
      name: "Products",
      icon: "📦",
      path: "/vendor/products"
    },

    {
      name: "Add Product",
      icon: "➕",
      path: "/vendor/add-product"
    },

    {
      name: "Inventory",
      icon: "📋",
      path: "/vendor/inventory"
    },

    {
      name: "Transactions",
      icon: "💳",
      path: "/vendor/transactions"
    },

    {
  name: "Reports",
  icon: "📈",
  path: "/vendor/reports"
},
{
  name: "Analytics",
  icon: "📊",
  path: "/vendor/analytics"
},
{
  name: "Revenue Analytics",
  icon: "💰",
  path: "/vendor/revenue-analytics"
},{
  name: "Marketplace Benchmark",
  icon: "🏆",
  path: "/vendor/marketplace-benchmark"
}
,{
  name: "Sales Forecast",
  icon: "🤖",
  path: "/vendor/sales-forecast"
},
{
    name: "AI Dashboard",
    icon: "🤖",
    path: "/vendor/ai-dashboard"
}

  ];

  const logout = () => {

    localStorage.clear();

    navigate("/login");

  };

  return (

    <div
      className="d-flex"
      style={{
        minHeight: "100vh",
        background: "#F4F7FC"
      }}
    >

      {/* Sidebar */}

      <div
        style={{
          width: "260px",
          background: "#5B3CC4",
          color: "white",
          padding: "30px 20px"
        }}
      >

        <h2
          className="fw-bold text-center mb-5"
        >
          ShopSense
        </h2>

        {

          menuItems.map((item) => (

            <Link
              key={item.path}
              to={item.path}
              className="text-decoration-none"
            >

              <div

                style={{

                  padding: "14px 18px",

                  borderRadius: "12px",

                  marginBottom: "10px",

                  background:

                    location.pathname === item.path
                      ? "rgba(255,255,255,.18)"
                      : "transparent",

                  color: "white",

                  transition: ".3s"

                }}

              >

                <span
                  style={{
                    marginRight: "10px"
                  }}
                >
                  {item.icon}
                </span>

                {item.name}

              </div>

            </Link>

          ))

        }

        <button

          className="btn btn-danger w-100 mt-5"

          onClick={logout}

        >

          Logout

        </button>

      </div>

      {/* Main Content */}

      <div
        className="flex-grow-1 p-4"
      >

        {children}

      </div>

    </div>

  );

}

export default DashboardLayout;