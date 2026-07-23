import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: "📊", path: "/vendor/dashboard" },
    { name: "Products", icon: "📦", path: "/vendor/products" },
    { name: "Add Product", icon: "➕", path: "/vendor/add-product" },
    { name: "Inventory", icon: "📋", path: "/vendor/inventory" },
    { name: "Reports", icon: "📈", path: "/vendor/reports" },
  ];

  return (
    <div
      style={{
        width: "260px",
        minHeight: "100vh",
        background: "linear-gradient(180deg,#5B3CC4,#7C3AED)",
        color: "white",
        padding: "30px 20px",
        position: "sticky",
        top: 0
      }}
    >
      <h2
        style={{
          fontWeight: "bold",
          marginBottom: "40px",
          textAlign: "center"
        }}
      >
        🛍 ShopSense
      </h2>

      {menuItems.map((item) => (

        <Link
          key={item.name}
          to={item.path}
          style={{
            display: "block",
            padding: "14px 18px",
            marginBottom: "12px",
            borderRadius: "12px",
            textDecoration: "none",
            color: "white",
            background:
              location.pathname === item.path
                ? "rgba(255,255,255,0.25)"
                : "transparent",
            transition: "0.3s"
          }}
        >
          {item.icon} {item.name}
        </Link>

      ))}

      <div
        style={{
          position: "absolute",
          bottom: "30px",
          width: "220px"
        }}
      >
        <hr style={{ borderColor: "#ffffff50" }} />

        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none"
          }}
        >
          🚪 Logout
        </Link>

      </div>

    </div>
  );
}

export default Sidebar;