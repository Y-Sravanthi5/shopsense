import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomerNavbar from "./components/CustomerNavbar";
import "../../styles/checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const customerId = localStorage.getItem("customer_id");

  const [checkout, setCheckout] = useState({
    address: "",
    payment_method: "Cash on Delivery",
  });

  const handleChange = (e) => {
    setCheckout({
      ...checkout,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = () => {
    axios
      .post("http://127.0.0.1:8000/orders", {
        customer_id: Number(customerId),
        address: checkout.address,
        payment_method: checkout.payment_method,
      })
      .then(() => {
        alert("Order Placed Successfully");
        navigate("/customer/orders");
      })
      .catch((err) => {
        console.log(err);
        alert("Unable to place order");
      });
  };

  return (
    <>
      <CustomerNavbar />

      <div className="checkout-page">

        <div className="checkout-header">
          <h2>Secure Checkout</h2>
          <p>Complete your purchase safely and securely.</p>
        </div>

        <div className="checkout-grid">

          <div className="checkout-form">

            <div className="checkout-card">

              <h4>📍 Delivery Address</h4>

              <textarea
                rows="5"
                name="address"
                placeholder="Enter your complete delivery address..."
                value={checkout.address}
                onChange={handleChange}
              />

            </div>

            <div className="checkout-card">

              <h4>💳 Payment Method</h4>

              <select
                name="payment_method"
                value={checkout.payment_method}
                onChange={handleChange}
              >
                <option>Cash on Delivery</option>
                <option>UPI</option>
                <option>Credit Card</option>
                <option>Debit Card</option>
              </select>

            </div>

          </div>

          <div className="summary-card">

            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>Calculated at checkout</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="summary-row">
              <span>Taxes</span>
              <span>Included</span>
            </div>

            <hr />

            <div className="summary-row total">
              <span>Total</span>
              <span>Final amount after order</span>
            </div>

            <button
              className="place-order-btn"
              onClick={placeOrder}
            >
              Place Order
            </button>

            <div className="secure-box">
              🔒 Secure Checkout<br />
              Your order information is protected.
            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Checkout;