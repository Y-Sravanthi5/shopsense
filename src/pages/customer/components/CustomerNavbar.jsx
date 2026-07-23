import { Link } from "react-router-dom";

function CustomerNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand fw-bold fs-3" to="/customer/products">
          ShopSense
        </Link>

        {/* Navbar Buttons */}
        <div className="ms-auto">

          <Link
            className="btn btn-outline-light me-2"
            to="/customer/products"
          >
            Products
          </Link>

          <Link
            className="btn btn-outline-light me-2"
            to="/customer/cart"
          >
            Cart
          </Link>

          <Link
            className="btn btn-outline-light me-2"
            to="/customer/wishlist"
          >
            Wishlist
          </Link>

          <Link
            className="btn btn-outline-light me-2"
            to="/customer/orders"
          >
            Orders
          </Link>

          <Link
            className="btn btn-warning"
            to="/"
          >
            Logout
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default CustomerNavbar;