import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomerNavbar from "./components/CustomerNavbar";
import "../../styles/orders.css";

function CustomerOrders() {
  const customerId = localStorage.getItem("customer_id");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    axios
      .get(`http://127.0.0.1:8000/orders/${customerId}`)
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const badgeClass = (status) => {
    if (!status) return "processing";

    const s = status.toLowerCase();

    if (s.includes("deliver")) return "delivered";
    if (s.includes("ship")) return "shipped";
    if (s.includes("cancel")) return "cancelled";

    return "processing";
  };

  return (
    <>
      <CustomerNavbar />

      <div className="orders-page">

        <div className="orders-header">
          <div>
            <h2>My Orders</h2>
            <p>Track and manage your purchases.</p>
          </div>

          <div className="order-count">
            {orders.length} Orders
          </div>
        </div>

        {loading ? (
          <div className="loading-card">
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="empty-orders">
            <div className="empty-icon">📦</div>
            <h3>No Orders Yet</h3>
            <p>Your purchases will appear here.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div className="order-card" key={order.id}>

              <div className="order-left">

                <div className="order-icon">
                  📦
                </div>

                <div className="order-info">

                  <h4>Order #{order.id}</h4>

                  <p>
                    Ordered on{" "}
                    {new Date(order.created_at).toLocaleString()}
                  </p>

                  <div className="payment">
                    💳 {order.payment_method}
                  </div>

                </div>

              </div>

              <div className="order-right">

                <h3>₹{order.total_amount}</h3>

                <span className={`status ${badgeClass(order.order_status)}`}>
                  {order.order_status}
                </span>

                <button
                  className="details-btn"
                  onClick={() =>
                    navigate(`/customer/order/${order.id}`)
                  }
                >
                  View Details
                </button>

              </div>

            </div>
          ))
        )}
      </div>
    </>
  );
}

export default CustomerOrders;