import { Link } from "react-router-dom";

function VendorLayout({ children }) {
  return (
    <div className="d-flex">

      <div
        className="bg-primary text-white p-3"
        style={{
          width: "250px",
          minHeight: "100vh"
        }}
      >

        <h3 className="mb-4">🏪 Vendor</h3>

        <ul className="nav flex-column">

          <li>
            <Link className="nav-link text-white" to="/vendor/dashboard">
              Dashboard
            </Link>
          </li>

          <li>
            <Link className="nav-link text-white" to="/vendor/products">
              Products
            </Link>
          </li>

          <li>
            <Link className="nav-link text-white" to="/vendor/add-product">
              Add Product
            </Link>
          </li>

          <li>
            <Link className="nav-link text-white" to="/vendor/inventory">
              Inventory
            </Link>
          </li>

          <li>
            <Link className="nav-link text-white" to="/vendor/orders">
              Orders
            </Link>
          </li>

          <li>
            <Link className="nav-link text-white" to="/vendor/transactions">
              Transactions
            </Link>
          </li>

          <li>
            <Link className="nav-link text-white" to="/reports">
              Reports
            </Link>
          </li>

        </ul>

      </div>

      <div className="flex-grow-1 p-4 bg-light">
        {children}
      </div>
      <li>
  <Link to="/vendor/analytics">
    📈 Analytics
  </Link>
</li>

    </div>
  );
}

export default VendorLayout;