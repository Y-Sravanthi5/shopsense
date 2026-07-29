import { useEffect, useMemo, useState } from "react";
import {
  FiRefreshCw,
  FiSearch,
  FiDollarSign,
  FiShoppingCart,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";
import AdminLayout from "../../components/layout/AdminLayout";
import API from "../../services/api";
import "../../styles/salesReport.css";

function SalesReport() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
    try {
      setLoading(true);

      const res = await API.get("/admin/sales");

      setOrders(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load sales report.");
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const value = search.toLowerCase();

      return (
        String(order.id).includes(value) ||
        String(order.customer_id).includes(value) ||
        order.order_status?.toLowerCase().includes(value)
      );
    });
  }, [orders, search]);

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.total_amount || 0),
    0
  );

  const completedOrders = orders.filter(
    (order) =>
      order.order_status?.toLowerCase() === "completed"
  ).length;

  const pendingOrders = orders.filter(
    (order) =>
      order.order_status?.toLowerCase() === "pending"
  ).length;

  return (
    <AdminLayout>
      <div className="sales-page">

        {/* Hero */}

        <div className="sales-hero">

          <div>

            <h1>Sales Report</h1>

            <p>
              Track marketplace revenue, monitor orders and review
              sales performance across the platform.
            </p>

          </div>

          <button
            className="refresh-btn"
            onClick={loadSales}
          >
            <FiRefreshCw />
            Refresh
          </button>

        </div>

        {/* Summary */}

        <div className="summary-grid">

          <div className="summary-card">

            <div className="summary-icon purple">
              <FiDollarSign />
            </div>

            <div>

              <h4>Total Revenue</h4>

              <h2>
                ₹{totalRevenue.toLocaleString()}
              </h2>

            </div>

          </div>

          <div className="summary-card">

            <div className="summary-icon blue">
              <FiShoppingCart />
            </div>

            <div>

              <h4>Total Orders</h4>

              <h2>{orders.length}</h2>

            </div>

          </div>

          <div className="summary-card">

            <div className="summary-icon green">
              <FiCheckCircle />
            </div>

            <div>

              <h4>Completed</h4>

              <h2>{completedOrders}</h2>

            </div>

          </div>

          <div className="summary-card">

            <div className="summary-icon orange">
              <FiClock />
            </div>

            <div>

              <h4>Pending</h4>

              <h2>{pendingOrders}</h2>

            </div>

          </div>

        </div>

        {/* Search */}

        <div className="table-toolbar">

          <div className="search-box">

            <FiSearch />

            <input
              type="text"
              placeholder="Search by Order ID, Customer ID or Status..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

        </div>

        {/* Table */}

        <div className="sales-card">

          {loading ? (

            <div className="loading-state">
              Loading sales report...
            </div>

          ) : filteredOrders.length === 0 ? (

            <div className="empty-state">

              <h3>No Orders Found</h3>

              <p>No sales data available.</p>

            </div>

          ) : (

            <div className="table-responsive">

              <table className="sales-table">

                <thead>

                  <tr>

                    <th>Order ID</th>

                    <th>Customer</th>

                    <th>Total</th>

                    <th>Status</th>

                    <th>Date</th>

                  </tr>

                </thead>

                <tbody>
                                      {filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <span className="order-id">
                          #{order.id}
                        </span>
                      </td>

                      <td>
                        <div className="customer-cell">
                          <div className="customer-avatar">
                            {String(order.customer_id).charAt(0)}
                          </div>

                          <div>
                            <div className="customer-name">
                              Customer #{order.customer_id}
                            </div>

                            <small>
                              ID: {order.customer_id}
                            </small>
                          </div>
                        </div>
                      </td>

                      <td className="amount">
                        ₹
                        {Number(
                          order.total_amount || 0
                        ).toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>

                      <td>
                        <span
                          className={`status ${order.order_status
                            ?.toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {order.order_status}
                        </span>
                      </td>

                      <td>
                        {new Date(
                          order.created_at
                        ).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default SalesReport;