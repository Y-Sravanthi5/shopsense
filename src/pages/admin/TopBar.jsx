import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaUserCircle,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";

import "../../styles/topbar.css";

function Topbar() {
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

  return (
    <header className="topbar">

      {/* Left */}

      <div className="topbar-left">

        <h2>Admin Dashboard</h2>

        <p>
          Welcome back! Manage your marketplace efficiently.
        </p>

      </div>

      {/* Search */}

      <div className="search-box">

        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search products, vendors..."
        />

      </div>

      {/* Right */}

      <div className="topbar-right">

        <button className="notification-btn">

          <FaBell />

          <span>3</span>

        </button>

        <div className="profile-card">

          <FaUserCircle className="profile-icon" />

          <div>

            <h5>Administrator</h5>

            <small>admin@shopsense.com</small>

          </div>

        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <FaSignOutAlt />

          Logout
        </button>

      </div>

    </header>
  );
}

export default Topbar;