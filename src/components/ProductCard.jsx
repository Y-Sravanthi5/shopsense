import { Link } from "react-router-dom";
import axios from "axios";
import {
  FiHeart,
  FiShoppingCart,
  FiEye,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

import "../styles/ProductCard.css";

function ProductCard({ product }) {
  const customerId = localStorage.getItem("customer_id");

  const addToCart = () => {
    if (!customerId) {
      alert("Please login first.");
      return;
    }

    axios
      .post("http://127.0.0.1:8000/cart/add", {
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

  const addToWishlist = () => {
    if (!customerId) {
      alert("Please login first.");
      return;
    }

    axios
      .post("http://127.0.0.1:8000/wishlist/add", {
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
    <div className="shop-product-card">
      {/* IMAGE */}

      <div className="shop-product-image-wrapper">
        <img
          src={`http://127.0.0.1:8000/uploads/${product.image}`}
          alt={product.product_name}
          className="shop-product-image"
        />

        <span className="shop-product-category">
          {product.category}
        </span>

        <button
          className="shop-product-heart"
          onClick={addToWishlist}
          title="Add to Wishlist"
        >
          <FiHeart />
        </button>

        <span className="shop-product-discount">
          {product.discount}% OFF
        </span>
      </div>

      {/* CONTENT */}

      <div className="shop-product-content">
        <h3 className="shop-product-name">
          {product.product_name}
        </h3>

        <p className="shop-product-description">
          {product.description}
        </p>

        {/* Rating */}

        <div
          style={{
            color: "#ffc107",
            fontSize: "15px",
            marginBottom: "12px",
          }}
        >
          ★★★★☆
          <span
            style={{
              color: "#777",
              marginLeft: "8px",
            }}
          >
            (4.5)
          </span>
        </div>

        {/* PRICE */}

        <div className="shop-product-price-row">
          <span className="shop-product-price">
            ₹{product.price}
          </span>

          <span className="shop-product-original-price">
            ₹{product.original_price}
          </span>
        </div>

        {/* STOCK */}

        <div
          className={`shop-product-stock ${
            product.stock > 0
              ? "shop-in-stock"
              : "shop-out-stock"
          }`}
        >
          {product.stock > 0 ? (
            <>
              <FiCheckCircle />
              In Stock
              <small>({product.stock})</small>
            </>
          ) : (
            <>
              <FiXCircle />
              Out of Stock
            </>
          )}
        </div>
      </div>

      {/* ACTIONS */}

      <div className="shop-product-actions">
        <button
          className="shop-add-cart"
          onClick={addToCart}
          disabled={product.stock <= 0}
        >
          <FiShoppingCart />
          Add to Cart
        </button>

        <Link
          to={`/customer/product/${product.id}`}
          className="shop-view-product"
          title="View Details"
        >
          <FiEye />
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;