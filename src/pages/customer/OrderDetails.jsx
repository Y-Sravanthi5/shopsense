import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CustomerNavbar from "./components/CustomerNavbar";
import "../../styles/orderDetails.css";

function OrderDetails() {
  const { id } = useParams();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = () => {
    axios
      .get(`http://127.0.0.1:8000/order/${id}`)
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const grandTotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <>
      <CustomerNavbar />

      <div className="order-details-page">

        <div className="order-header">
          <div>
            <h2>Order Details</h2>
            <p>Order #{id}</p>
          </div>

          <span className="status delivered">
            Delivered
          </span>
        </div>

        {loading ? (
          <div className="loading-card">
            Loading order details...
          </div>
        ) : items.length === 0 ? (
          <div className="empty-card">
            No items found.
          </div>
        ) : (
          <>
            {items.map((item) => (
              <div className="order-item-card" key={item.id}>
                <div className="product-icon">
                  📦
                </div>

                <div className="item-info">
                  <h5>Product #{item.product_id}</h5>

                  <p>
                    Quantity :
                    <strong> {item.quantity}</strong>
                  </p>

                  <p>
                    Price :
                    <strong> ₹{item.price}</strong>
                  </p>
                </div>

                <div className="item-total">
                  ₹{item.quantity * item.price}
                </div>
              </div>
            ))}

            <div className="summary-card">
              <div>
                <h4>Total Amount</h4>
                <h2>₹{grandTotal}</h2>
              </div>

              <button className="buy-btn">
                Buy Again
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default OrderDetails;