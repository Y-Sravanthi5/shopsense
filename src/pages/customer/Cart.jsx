import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import CustomerNavbar from "./components/CustomerNavbar";

import {
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ShoppingBag,
  PackageCheck,
  ShieldCheck,
  Tag,
} from "lucide-react";

import "../../styles/cart.css";

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const customerId = localStorage.getItem("customer_id");

  /* =========================
     LOAD CART
  ========================= */

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    if (!customerId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const res = await axios.get(
        `http://127.0.0.1:8000/cart/${customerId}`
      );

      setCart(res.data);
    } catch (err) {
      console.error("Cart Error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     INCREASE QUANTITY
  ========================= */

  const increaseQuantity = async (item) => {
    const currentQuantity = Number(item.quantity);
    const stock = Number(item.stock);

    if (currentQuantity >= stock) {
      alert("Maximum available stock reached.");
      return;
    }

    try {
      await axios.put(
        `http://127.0.0.1:8000/cart/${item.cart_id}`,
        {
          quantity: currentQuantity + 1,
        }
      );

      fetchCart();
    } catch (err) {
      console.error("Increase Quantity Error:", err);

      alert(
        err.response?.data?.detail ||
          "Unable to update quantity."
      );
    }
  };

  /* =========================
     DECREASE QUANTITY
  ========================= */

  const decreaseQuantity = async (item) => {
    const currentQuantity = Number(item.quantity);

    if (currentQuantity <= 1) {
      return;
    }

    try {
      await axios.put(
        `http://127.0.0.1:8000/cart/${item.cart_id}`,
        {
          quantity: currentQuantity - 1,
        }
      );

      fetchCart();
    } catch (err) {
      console.error("Decrease Quantity Error:", err);

      alert(
        err.response?.data?.detail ||
          "Unable to update quantity."
      );
    }
  };

  /* =========================
     REMOVE ITEM
  ========================= */

  const removeItem = async (cartId) => {
    const confirmRemove = window.confirm(
      "Remove this product from your cart?"
    );

    if (!confirmRemove) {
      return;
    }

    try {
      await axios.delete(
        `http://127.0.0.1:8000/cart/${cartId}`
      );

      setCart((currentCart) =>
        currentCart.filter(
          (item) => item.cart_id !== cartId
        )
      );
    } catch (err) {
      console.error("Remove Cart Error:", err);

      alert(
        err.response?.data?.detail ||
          "Unable to remove product."
      );
    }
  };

  /* =========================
     PRICE CALCULATIONS
  ========================= */

  const subtotal = cart.reduce((total, item) => {
    const originalPrice = Number(
      item.original_price || item.price || 0
    );

    return (
      total +
      originalPrice * Number(item.quantity || 0)
    );
  }, 0);

  const finalTotal = cart.reduce((total, item) => {
    return (
      total +
      Number(item.price || 0) *
        Number(item.quantity || 0)
    );
  }, 0);

  const discount = Math.max(
    0,
    subtotal - finalTotal
  );

  const totalItems = cart.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="cart-page">

      <CustomerNavbar />

      {/* =========================
          PAGE HEADER
      ========================= */}

      <section className="cart-header">

        <div className="cart-header-inner">

          <div className="cart-header-icon">
            <ShoppingCart size={24} />
          </div>

          <div>
            <span>YOUR SHOPPING</span>

            <h1>My Cart</h1>

            <p>
              Review your products before checkout.
            </p>
          </div>

        </div>

      </section>

      {/* =========================
          MAIN
      ========================= */}

      <main className="cart-main">

        {loading ? (

          /* LOADING */

          <div className="cart-loading">

            <div className="cart-loader" />

            <h3>Loading your cart...</h3>

            <p>
              Getting your products ready.
            </p>

          </div>

        ) : cart.length === 0 ? (

          /* EMPTY CART */

          <div className="cart-empty">

            <div className="cart-empty-icon">
              <ShoppingCart size={38} />
            </div>

            <h2>Your cart is empty</h2>

            <p>
              Looks like you haven't added anything to
              your cart yet. Explore the marketplace and
              discover products you like.
            </p>

            <Link
              to="/customer/products"
              className="cart-shop-button"
            >
              <ShoppingBag size={17} />
              Start Shopping
              <ArrowRight size={16} />
            </Link>

          </div>

        ) : (

          <>
            {/* =========================
                CART TOP BAR
            ========================= */}

            <div className="cart-topbar">

              <div>
                <h2>Shopping Cart</h2>

                <p>
                  {totalItems}{" "}
                  {totalItems === 1
                    ? "item"
                    : "items"}{" "}
                  in your cart
                </p>
              </div>

              <Link
                to="/customer/products"
                className="cart-continue-shopping"
              >
                Continue Shopping
                <ArrowRight size={15} />
              </Link>

            </div>

            {/* =========================
                CART LAYOUT
            ========================= */}

            <div className="cart-layout">

              {/* =========================
                  CART ITEMS
              ========================= */}

              <section className="cart-items-section">

                {cart.map((item) => {

                  const quantity = Number(
                    item.quantity || 0
                  );

                  const stock = Number(
                    item.stock || 0
                  );

                  const price = Number(
                    item.price || 0
                  );

                  const originalPrice = Number(
                    item.original_price ||
                      item.price ||
                      0
                  );

                  const itemTotal =
                    price * quantity;

                  return (
                    <article
                      className="cart-item"
                      key={item.cart_id}
                    >

                      {/* IMAGE */}

                      <Link
                        to={`/customer/product/${item.product_id}`}
                        className="cart-item-image-wrapper"
                      >
                        <img
                          src={`http://127.0.0.1:8000/uploads/${item.image}`}
                          alt={item.product_name}
                          className="cart-item-image"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://placehold.co/400x400?text=No+Image";
                          }}
                        />
                      </Link>

                      {/* PRODUCT INFO */}

                      <div className="cart-item-info">

                        <span className="cart-item-category">
                          {item.category}
                        </span>

                        <Link
                          to={`/customer/product/${item.product_id}`}
                          className="cart-item-name"
                        >
                          {item.product_name}
                        </Link>

                        <div className="cart-item-prices">

                          <strong>
                            ₹{formatPrice(price)}
                          </strong>

                          {originalPrice > price && (
                            <span>
                              ₹
                              {formatPrice(
                                originalPrice
                              )}
                            </span>
                          )}

                        </div>

                        {stock > 0 && (
                          <div className="cart-item-stock">
                            <PackageCheck size={14} />

                            {stock} available
                          </div>
                        )}

                      </div>

                      {/* QUANTITY */}

                      <div className="cart-item-quantity">

                        <span>Quantity</span>

                        <div className="cart-quantity-control">

                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(item)
                            }
                            disabled={quantity <= 1}
                          >
                            <Minus size={15} />
                          </button>

                          <strong>
                            {quantity}
                          </strong>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(item)
                            }
                            disabled={
                              quantity >= stock
                            }
                          >
                            <Plus size={15} />
                          </button>

                        </div>

                      </div>

                      {/* TOTAL */}

                      <div className="cart-item-total">

                        <span>Item Total</span>

                        <strong>
                          ₹{formatPrice(itemTotal)}
                        </strong>

                      </div>

                      {/* REMOVE */}

                      <button
                        type="button"
                        className="cart-remove-button"
                        onClick={() =>
                          removeItem(item.cart_id)
                        }
                        title="Remove product"
                      >
                        <Trash2 size={18} />
                      </button>

                    </article>
                  );
                })}

              </section>

              {/* =========================
                  ORDER SUMMARY
              ========================= */}

              <aside className="cart-summary">

                <div className="cart-summary-title">

                  <div className="cart-summary-icon">
                    <ShoppingBag size={19} />
                  </div>

                  <div>
                    <h3>Order Summary</h3>

                    <p>
                      {totalItems}{" "}
                      {totalItems === 1
                        ? "item"
                        : "items"}
                    </p>
                  </div>

                </div>

                <div className="cart-summary-divider" />

                <div className="cart-summary-row">
                  <span>Subtotal</span>

                  <strong>
                    ₹{formatPrice(subtotal)}
                  </strong>
                </div>

                {discount > 0 && (
                  <div className="cart-summary-row discount">

                    <span>
                      <Tag size={14} />
                      Product Discount
                    </span>

                    <strong>
                      − ₹{formatPrice(discount)}
                    </strong>

                  </div>
                )}

                <div className="cart-summary-row">
                  <span>Delivery</span>

                  <strong className="cart-free">
                    FREE
                  </strong>
                </div>

                <div className="cart-summary-divider" />

                <div className="cart-summary-total">

                  <div>
                    <span>Total</span>

                    <small>
                      Final payable amount
                    </small>
                  </div>

                  <strong>
                    ₹{formatPrice(finalTotal)}
                  </strong>

                </div>

                {/* CHECKOUT */}

                <Link
                  to="/customer/checkout"
                  className="cart-checkout-button"
                >
                  Proceed to Checkout

                  <ArrowRight size={17} />
                </Link>

                <div className="cart-secure">

                  <ShieldCheck size={15} />

                  <span>
                    Secure ShopSense checkout
                  </span>

                </div>

                {/* SAVINGS */}

                {discount > 0 && (
                  <div className="cart-savings">

                    <Tag size={16} />

                    <span>
                      You're saving{" "}
                      <strong>
                        ₹{formatPrice(discount)}
                      </strong>{" "}
                      on this order.
                    </span>

                  </div>
                )}

              </aside>

            </div>
          </>

        )}

      </main>

    </div>
  );
}

export default Cart;