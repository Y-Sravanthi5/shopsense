import { Link } from "react-router-dom";

function CustomerLayout({ children }) {
  return (
    <div className="d-flex">

      <div
        className="bg-success text-white p-3"
        style={{
          width: "250px",
          minHeight: "100vh"
        }}
      >

        <h3 className="mb-4">👤 Customer</h3>

        <ul className="nav flex-column">

          <li>
            <Link className="nav-link text-white" to="/customer/dashboard">
              Dashboard
            </Link>
          </li>

          <li>
            <Link className="nav-link text-white" to="/customer/products">
              Products
            </Link>
          </li>

          <li>
            <Link className="nav-link text-white" to="/customer/cart">
              Cart
            </Link>
          </li>

          <li>
            <Link className="nav-link text-white" to="/customer/orders">
              Orders
            </Link>
          </li>

          <li>
            <Link className="nav-link text-white" to="/customer/profile">
              Profile
            </Link>
          </li>

        </ul>

      </div>

      <div className="flex-grow-1 p-4 bg-light">
        {children}
      </div>

    </div>
  );
}

export default CustomerLayout;