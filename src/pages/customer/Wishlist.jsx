import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import CustomerNavbar from "./components/CustomerNavbar";

import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowRight,
  PackageX,
} from "lucide-react";

import "../../styles/wishlist.css";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const customerId = localStorage.getItem("customer_id");

  /* =========================
     LOAD WISHLIST
  ========================= */

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    if (!customerId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const res = await axios.get(
        `http://127.0.0.1:8000/wishlist/${customerId}`
      );

      setWishlist(res.data);
    } catch (err) {
      console.error("Wishlist Error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     ADD TO CART
  ========================= */

  const addToCart = async (item) => {
    if (!customerId) {
      alert("Please login first.");
      return;
    }

    if (Number(item.stock) <= 0) {
      alert("This product is currently out of stock.");
      return;
    }

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/cart/add",
        {
          customer_id: Number(customerId),
          product_id: item.product_id,
          quantity: 1,
        }
      );

      alert(
        res.data.message ||
          "Product added to cart successfully."
      );
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.detail ||
          "Failed to add product to cart."
      );
    }
  };

  /* =========================
     REMOVE WISHLIST ITEM
  ========================= */

  const removeWishlist = async (item) => {
    try {
      /*
        If your backend uses a different delete URL,
        we can change this after checking your API.
      */

      await axios.delete(
        `http://127.0.0.1:8000/wishlist/${item.wishlist_id}`
      );

      setWishlist((current) =>
        current.filter(
          (wishlistItem) =>
            wishlistItem.wishlist_id !== item.wishlist_id
        )
      );

      alert("Product removed from wishlist.");
    } catch (err) {
      console.error("Remove Wishlist Error:", err);

      alert(
        err.response?.data?.detail ||
          "Unable to remove product from wishlist."
      );
    }
  };

  /* =========================
     FORMAT PRICE
  ========================= */

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("en-IN");

  return (
    <div className="wishlist-page">

      <CustomerNavbar />

      {/* =========================
          HEADER
      ========================= */}

      <section className="wishlist-header">

        <div className="wishlist-header-inner">

          <div className="wishlist-header-icon">
            <Heart size={23} />
          </div>

          <div>
            <span>YOUR COLLECTION</span>

            <h1>My Wishlist</h1>

            <p>
              Products you've saved for later.
            </p>
          </div>

        </div>

      </section>

      {/* =========================
          MAIN
      ========================= */}

      <main className="wishlist-main">

        {loading ? (

          <div className="wishlist-state">

            <div className="wishlist-loader" />

            <h3>Loading your wishlist...</h3>

          </div>

        ) : wishlist.length === 0 ? (

          /* =========================
             EMPTY WISHLIST
          ========================= */

          <div className="wishlist-empty">

            <div className="wishlist-empty-icon">
              <Heart size={34} />
            </div>

            <h2>Your wishlist is empty</h2>

            <p>
              Save products you like and they'll appear
              here for you to find later.
            </p>

            <Link
              to="/customer/products"
              className="wishlist-shop-btn"
            >
              Explore Products
              <ArrowRight size={17} />
            </Link>

          </div>

        ) : (

          <>
            {/* =========================
                RESULT HEADER
            ========================= */}

            <div className="wishlist-result-header">

              <div>
                <h2>Saved Products</h2>

                <p>
                  {wishlist.length}{" "}
                  {wishlist.length === 1
                    ? "product"
                    : "products"}{" "}
                  in your wishlist
                </p>
              </div>

              <Link
                to="/customer/products"
                className="wishlist-continue"
              >
                Continue Shopping
                <ArrowRight size={15} />
              </Link>

            </div>

            {/* =========================
                WISHLIST GRID
            ========================= */}

            <div className="wishlist-grid">

              {wishlist.map((item) => {

                const stock = Number(item.stock || 0);

                return (
                  <article
                    className="wishlist-card"
                    key={item.wishlist_id}
                  >

                    {/* IMAGE */}

                    <div className="wishlist-image-wrapper">

                      <img
                        src={`http://127.0.0.1:8000/uploads/${item.image}`}
                        alt={item.product_name}
                        className="wishlist-image"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://placehold.co/600x500?text=No+Image";
                        }}
                      />

                      <button
                        type="button"
                        className="wishlist-remove-icon"
                        onClick={() =>
                          removeWishlist(item)
                        }
                        title="Remove from wishlist"
                      >
                        <Trash2 size={17} />
                      </button>

                      <span className="wishlist-category">
                        {item.category}
                      </span>

                    </div>

                    {/* CONTENT */}

                    <div className="wishlist-card-content">

                      <h3>
                        {item.product_name}
                      </h3>

                      <div className="wishlist-price">
                        ₹{formatPrice(item.price)}
                      </div>

                      {stock > 0 ? (

                        <div className="wishlist-stock available">
                          <span />
                          In Stock
                          <small>
                            ({stock} available)
                          </small>
                        </div>

                      ) : (

                        <div className="wishlist-stock unavailable">
                          <PackageX size={14} />
                          Out of Stock
                        </div>

                      )}

                    </div>

                    {/* ACTIONS */}

                    <div className="wishlist-actions">

                      <button
                        type="button"
                        className="wishlist-cart-btn"
                        onClick={() => addToCart(item)}
                        disabled={stock <= 0}
                      >
                        <ShoppingCart size={16} />

                        {stock > 0
                          ? "Add to Cart"
                          : "Unavailable"}
                      </button>

                      <Link
                        to={`/customer/product/${item.product_id}`}
                        className="wishlist-view-btn"
                        title="View Product"
                      >
                        <ArrowRight size={18} />
                      </Link>

                    </div>

                  </article>
                );
              })}

            </div>
          </>

        )}

      </main>

    </div>
  );
}

export default Wishlist;