import {
  LayoutDashboard,
  Package,
  PackagePlus,
  ClipboardList,
  CreditCard,
  FileChartColumn,
  ChartNoAxesCombined,
  CircleDollarSign,
  Trophy,
  TrendingUp,
  BrainCircuit,
  LogOut,
  Store,
} from "lucide-react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import "../../styles/dashboard.css";

function DashboardLayout({ children }) {

  const location = useLocation();
  const navigate = useNavigate();

  const menuGroups = [

    {
      title: "OVERVIEW",

      items: [
        {
          name: "Dashboard",
          icon: LayoutDashboard,
          path: "/vendor/dashboard",
        },
      ],
    },

    {
      title: "STORE MANAGEMENT",

      items: [
        {
          name: "Products",
          icon: Package,
          path: "/vendor/products",
        },

        {
          name: "Add Product",
          icon: PackagePlus,
          path: "/vendor/add-product",
        },

        {
          name: "Inventory",
          icon: ClipboardList,
          path: "/vendor/inventory",
        },

        {
          name: "Transactions",
          icon: CreditCard,
          path: "/vendor/transactions",
        },
      ],
    },

    {
      title: "INSIGHTS",

      items: [
        {
          name: "Reports",
          icon: FileChartColumn,
          path: "/vendor/reports",
        },

        {
          name: "Analytics",
          icon: ChartNoAxesCombined,
          path: "/vendor/analytics",
        },

        {
          name: "Revenue Analytics",
          icon: CircleDollarSign,
          path: "/vendor/revenue-analytics",
        },

        {
          name: "Marketplace Benchmark",
          icon: Trophy,
          path: "/vendor/marketplace-benchmark",
        },

        {
          name: "Sales Forecast",
          icon: TrendingUp,
          path: "/vendor/sales-forecast",
        },

        {
          name: "AI Dashboard",
          icon: BrainCircuit,
          path: "/vendor/ai-dashboard",
        },
      ],
    },

  ];


  const logout = () => {

    localStorage.clear();

    navigate("/login");

  };


  return (

    <div className="ss-app">

      {/* SIDEBAR */}

      <aside className="ss-sidebar">

        {/* LOGO */}

        <div className="ss-logo">

          <div className="ss-logo-icon">

            <Store size={21} />

          </div>

          <div>

            <h2>
              ShopSense
            </h2>

            <span>
              Vendor Portal
            </span>

          </div>

        </div>


        {/* NAVIGATION */}

        <nav className="ss-nav">

          {menuGroups.map((group) => (

            <div
              className="ss-nav-group"
              key={group.title}
            >

              <p className="ss-nav-title">

                {group.title}

              </p>


              {group.items.map((item) => {

                const Icon = item.icon;

                const active =
                  location.pathname === item.path;


                return (

                  <Link
                    key={item.path}
                    to={item.path}
                    className={
                      `ss-nav-link ${
                        active ? "active" : ""
                      }`
                    }
                  >

                    <Icon size={18} />

                    <span>
                      {item.name}
                    </span>

                  </Link>

                );

              })}

            </div>

          ))}

        </nav>


        {/* LOGOUT */}

        <div className="ss-sidebar-footer">

          <button
            className="ss-logout"
            onClick={logout}
          >

            <LogOut size={18} />

            <span>
              Logout
            </span>

          </button>

        </div>

      </aside>


      {/* MAIN CONTENT */}

      <main className="ss-main">

        <div className="ss-page-container">

          {children}

        </div>

      </main>

    </div>

  );

}

export default DashboardLayout;