import { useEffect, useMemo, useState } from "react";
import {
  FiRefreshCw,
  FiSearch,
  FiUsers,
  FiShoppingBag,
  FiDollarSign,
  FiTrendingUp,
} from "react-icons/fi";
import AdminLayout from "../../components/layout/AdminLayout";
import API from "../../services/api";
import "../../styles/customerAnalytics.css";

function CustomerAnalytics() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);

      const res = await API.get("/analytics/customers");

      setCustomers(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load customer analytics.");
    } finally {
      setLoading(false);
    }
  };

  const formatMoney = (value) => {
    return Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const value = search.toLowerCase();

      return (
        customer.customer_name?.toLowerCase().includes(value) ||
        customer.email?.toLowerCase().includes(value)
      );
    });
  }, [customers, search]);

  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const totalOrders = customers.reduce(
    (sum, customer) => sum + Number(customer.total_orders || 0),
    0
  );

  const totalSpending = customers.reduce(
    (sum, customer) => sum + Number(customer.total_spent || 0),
    0
  );

  return (
    <AdminLayout>
      <div className="customer-page">

        {/* Hero */}

        <div className="customer-hero">

          <div>

            <h1>Customer Analytics</h1>

            <p>
              Monitor customer activity, purchasing behaviour and lifetime
              value across your marketplace.
            </p>

          </div>

          <button
            className="refresh-btn"
            onClick={loadCustomers}
          >
            <FiRefreshCw />
            Refresh
          </button>

        </div>

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        {/* Summary */}

        <div className="summary-grid">

          <div className="summary-card">

            <div className="summary-icon blue">
              <FiUsers />
            </div>

            <div>

              <h4>Total Customers</h4>

              <h2>{totalCustomers}</h2>

            </div>

          </div>

          <div className="summary-card">

            <div className="summary-icon green">
              <FiTrendingUp />
            </div>

            <div>

              <h4>Active Customers</h4>

              <h2>{activeCustomers}</h2>

            </div>

          </div>

          <div className="summary-card">

            <div className="summary-icon orange">
              <FiShoppingBag />
            </div>

            <div>

              <h4>Total Orders</h4>

              <h2>{totalOrders}</h2>

            </div>

          </div>

          <div className="summary-card">

            <div className="summary-icon purple">
              <FiDollarSign />
            </div>

            <div>

              <h4>Total Spending</h4>

              <h2>
                ₹{formatMoney(totalSpending)}
              </h2>

            </div>

          </div>

        </div>

        {/* Toolbar */}

        <div className="table-toolbar">

          <div className="search-box">

            <FiSearch />

            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

        </div>

        {/* Table */}

        <div className="analytics-card">

          {loading ? (

            <div className="loading-state">
              Loading customer analytics...
            </div>

          ) : filteredCustomers.length === 0 ? (

            <div className="empty-state">

              <h3>No Customers Found</h3>

              <p>
                Customer analytics will appear here once orders are placed.
              </p>

            </div>

          ) : (

            <div className="table-responsive">

              <table className="analytics-table">

                <thead>

                  <tr>

                    <th>Customer</th>

                    <th>Email</th>

                    <th>Orders</th>

                    <th>Total Spending</th>

                    <th>Avg Order</th>

                    <th>Lifetime Value</th>

                    <th>Last Purchase</th>

                    <th>Status</th>

                  </tr>

                </thead>

                <tbody>
                                      {filteredCustomers.map((customer) => (
                    <tr key={customer.customer_id}>
                      <td>
                        <div className="customer-info">
                          <div className="customer-avatar">
                            {customer.customer_name
                              ? customer.customer_name.charAt(0).toUpperCase()
                              : "C"}
                          </div>

                          <div>
                            <div className="customer-name">
                              {customer.customer_name || "N/A"}
                            </div>

                            <small>
                              ID: {customer.customer_id}
                            </small>
                          </div>
                        </div>
                      </td>

                      <td>{customer.email}</td>

                      <td>
                        <span className="order-count">
                          {customer.total_orders || 0}
                        </span>
                      </td>

                      <td className="money">
                        ₹{formatMoney(customer.total_spent)}
                      </td>

                      <td className="money">
                        ₹
                        {formatMoney(
                          customer.average_order_value
                        )}
                      </td>

                      <td className="money lifetime">
                        ₹
                        {formatMoney(
                          customer.customer_lifetime_value
                        )}
                      </td>

                      <td>
                        {customer.last_purchase_days === null ||
                        customer.last_purchase_days ===
                          undefined ? (
                          <span className="text-muted">
                            No purchases
                          </span>
                        ) : customer.last_purchase_days ===
                          0 ? (
                          "Today"
                        ) : customer.last_purchase_days ===
                          1 ? (
                          "1 day ago"
                        ) : (
                          `${customer.last_purchase_days} days ago`
                        )}
                      </td>

                      <td>
                        <span
                          className={`status ${
                            customer.status === "Active"
                              ? "active"
                              : "inactive"
                          }`}
                        >
                          {customer.status}
                        </span>
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

export default CustomerAnalytics;