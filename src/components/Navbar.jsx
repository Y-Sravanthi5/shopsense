import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{
        background: "#fff",
        boxShadow: "0 4px 20px rgba(0,0,0,.08)",
        padding: "15px 0"
      }}
    >
      <div className="container">

        {/* Logo */}
        <Link
          to="/"
          className="navbar-brand fw-bold"
          style={{
            fontSize: "30px",
            color: "#5B3CC4",
            textDecoration: "none"
          }}
        >
          🛍 ShopSense
        </Link>

        {/* Mobile Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >

          {/* Center Menu */}
          <ul className="navbar-nav mx-auto">

            <li className="nav-item">
              <a className="nav-link fw-semibold" href="#home">
                Home
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link fw-semibold" href="#features">
                Features
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link fw-semibold" href="#about">
                How It Works
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link fw-semibold" href="#contact">
                Contact
              </a>
            </li>

          </ul>

          {/* Right Side */}

          <ul className="navbar-nav">

            {/* Customer */}

            <li className="nav-item dropdown">

              <a
                className="nav-link dropdown-toggle fw-semibold"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                👤 Customer
              </a>

              <ul className="dropdown-menu">

                <li>
                  <Link
                    className="dropdown-item"
                    to="/customer/login"
                  >
                    Login
                  </Link>
                </li>

                <li>
                  <Link
                    className="dropdown-item"
                    to="/customer/register"
                  >
                    Register
                  </Link>
                </li>

              </ul>

            </li>

            {/* Vendor */}

            <li className="nav-item dropdown">

              <a
                className="nav-link dropdown-toggle fw-semibold"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                🏪 Vendor
              </a>

              <ul className="dropdown-menu">

                <li>
                  <Link
                    className="dropdown-item"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>

                <li>
                  <Link
                    className="dropdown-item"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>

              </ul>

            </li>

            {/* Admin */}

            <li className="nav-item dropdown">

              <a
                className="nav-link dropdown-toggle fw-semibold"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                🛠 Admin
              </a>

              <ul className="dropdown-menu">

                <li>
                  <Link
                    className="dropdown-item"
                    to="/admin/login"
                  >
                    Login
                  </Link>
                </li>

              </ul>

            </li>

          </ul>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;