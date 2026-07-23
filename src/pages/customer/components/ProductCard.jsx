import { Link } from "react-router-dom";
import axios from "axios";

function ProductCard({ product }) {

  const customerId = localStorage.getItem("customer_id");

  // Add to Cart
  const addToCart = () => {

    if (!customerId) {
      alert("Please login first.");
      return;
    }

    axios.post("http://127.0.0.1:8000/cart/add", {
      customer_id: Number(customerId),
      product_id: product.id,
      quantity: 1,
    })
    .then(() => {
      alert("Product added to cart.");
    })
    .catch((err) => {
      console.log(err);
      alert("Failed to add product to cart.");
    });

  };

  // Add to Wishlist
  const addToWishlist = () => {

    if (!customerId) {
      alert("Please login first.");
      return;
    }

    axios.post("http://127.0.0.1:8000/wishlist/add", {
      customer_id: Number(customerId),
      product_id: product.id,
    })
    .then(() => {
      alert("Added to wishlist.");
    })
    .catch((err) => {
      console.log(err);
      alert("Unable to add to wishlist.");
    });

  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">

      <div
        className="card h-100 shadow-sm border-0"
        style={{ borderRadius: "12px" }}
      >

        {/* Product Image */}
        <img
          src={`http://127.0.0.1:8000/uploads/${product.image}`}
          className="card-img-top"
          alt={product.product_name}
          style={{
            height: "230px",
            objectFit: "cover",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
        />

        <div className="card-body">

          {/* Category */}
          <span className="badge bg-secondary mb-2">
            {product.category}
          </span>

          {/* Product Name */}
          <h5 className="fw-bold">
            {product.product_name}
          </h5>

          {/* Description */}
          <p
            className="text-muted"
            style={{
              height: "48px",
              overflow: "hidden",
            }}
          >
            {product.description}
          </p>

          {/* Rating (Temporary) */}
          <div className="mb-2">
            ⭐⭐⭐⭐☆
            <small className="text-muted ms-2">
              (4.5)
            </small>
          </div>

          {/* Price */}
          <div className="mb-2">

            <span
              className="text-decoration-line-through text-secondary"
            >
              ₹{product.original_price}
            </span>

            <span className="badge bg-danger ms-2">
              {product.discount}% OFF
            </span>

          </div>

          <h4 className="text-success fw-bold">
            ₹{product.price}
          </h4>

          {/* Stock */}
          {product.stock > 0 ? (
            <p className="text-success fw-bold">
              ✔ In Stock ({product.stock})
            </p>
          ) : (
            <p className="text-danger fw-bold">
              Out of Stock
            </p>
          )}

        </div>

        <div className="card-footer bg-white border-0">

          <Link
            to={`/customer/product/${product.id}`}
            className="btn btn-primary w-100 mb-2"
          >
            View Details
          </Link>

          <button
            className="btn btn-success w-100 mb-2"
            onClick={addToCart}
            disabled={product.stock <= 0}
          >
            🛒 Add to Cart
          </button>

          <button
            className="btn btn-outline-danger w-100"
            onClick={addToWishlist}
          >
            ❤ Add to Wishlist
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;