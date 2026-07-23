import { Link } from "react-router-dom";

function CustomerDashboard() {
  return (
    <div className="container-fluid p-0">

      {/* Hero Section */}
      <div
        className="text-white text-center py-5"
        style={{
          background: "linear-gradient(90deg,#0d6efd,#6610f2)",
        }}
      >
        <h1 className="fw-bold">Welcome to ShopSense</h1>
        <p className="lead">
          Discover amazing products at the best prices.
        </p>

        <Link
          to="/customer/products"
          className="btn btn-warning btn-lg mt-3"
        >
          Shop Now
        </Link>
      </div>

      <div className="container mt-5">

        {/* Categories */}
        <h3 className="mb-4">Shop by Category</h3>

        <div className="row">

          <div className="col-md-3 mb-4">
            <div className="card shadow text-center p-4 h-100">
              <h1>💻</h1>
              <h5>Electronics</h5>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card shadow text-center p-4 h-100">
              <h1>👕</h1>
              <h5>Fashion</h5>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card shadow text-center p-4 h-100">
              <h1>🛋️</h1>
              <h5>Furniture</h5>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card shadow text-center p-4 h-100">
              <h1>🏀</h1>
              <h5>Sports</h5>
            </div>
          </div>

        </div>

        {/* Quick Access */}

        <h3 className="mt-5 mb-4">Quick Access</h3>

        <div className="row">

          <div className="col-md-3 mb-4">
            <div className="card shadow h-100">
              <div className="card-body text-center">

                <h2>🛍️</h2>

                <h5>Browse Products</h5>

                <p>View all available products.</p>

                <Link
                  to="/customer/products"
                  className="btn btn-primary w-100"
                >
                  Browse
                </Link>

              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card shadow h-100">
              <div className="card-body text-center">

                <h2>❤️</h2>

                <h5>Wishlist</h5>

                <p>Save your favourite products.</p>

                <Link
                  to="/customer/wishlist"
                  className="btn btn-danger w-100"
                >
                  Wishlist
                </Link>

              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card shadow h-100">
              <div className="card-body text-center">

                <h2>🛒</h2>

                <h5>My Cart</h5>

                <p>View products in your cart.</p>

                <Link
                  to="/customer/cart"
                  className="btn btn-success w-100"
                >
                  Cart
                </Link>

              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card shadow h-100">
              <div className="card-body text-center">

                <h2>📦</h2>

                <h5>Orders</h5>

                <p>Track your previous orders.</p>

                <Link
                  to="/customer/orders"
                  className="btn btn-warning w-100"
                >
                  Orders
                </Link>

              </div>
            </div>
          </div>

        </div>

        {/* Offers */}

        <div className="card mt-5 bg-light shadow">
          <div className="card-body text-center">

            <h3 className="text-primary">
              🔥 Special Offer
            </h3>

            <p className="lead">
              Flat <strong>20% OFF</strong> on selected products this week!
            </p>

            <Link
              to="/customer/products"
              className="btn btn-outline-primary"
            >
              Explore Deals
            </Link>

          </div>
        </div>

      </div>

    </div>
  );
}

export default CustomerDashboard;