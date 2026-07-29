import { useEffect, useMemo, useState } from "react";
import {
  FiRefreshCw,
  FiSearch,
  FiUsers,
  FiStar,
  FiTrendingUp,
  FiDollarSign,
} from "react-icons/fi";
import AdminLayout from "../../components/layout/AdminLayout";
import API from "../../services/api";
import "../../styles/customerSegmentation.css";

function CustomerSegmentation() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadSegmentation();
  }, []);

  const loadSegmentation = async () => {
    try {
      setLoading(true);

      const res = await API.get("/admin/customer-segmentation");

      setCustomers(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load customer segmentation.");
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const value = search.toLowerCase();

      return (
        customer.customer_name?.toLowerCase().includes(value) ||
        customer.segment?.toLowerCase().includes(value)
      );
    });
  }, [customers, search]);

  const premium = customers.filter(
    (c) => c.segment === "Premium"
  ).length;

  const regular = customers.filter(
    (c) => c.segment === "Regular"
  ).length;

  const occasional = customers.filter(
    (c) => c.segment === "Occasional"
  ).length;

  const totalRevenue = customers.reduce(
    (sum, c) => sum + Number(c.monetary || 0),
    0
  );

  return (
    <AdminLayout>
      <div className="segment-page">

        {/* Hero */}

        <div className="segment-hero">

          <div>

            <h1>Customer Segmentation</h1>

            <p>
              Analyze customer purchasing behaviour and classify users
              into meaningful business segments.
            </p>

          </div>

          <button
            className="refresh-btn"
            onClick={loadSegmentation}
          >
            <FiRefreshCw />
            Refresh
          </button>

        </div>

        {/* Summary */}

        <div className="summary-grid">

          <div className="summary-card">

            <div className="summary-icon purple">
              <FiUsers />
            </div>

            <div>

              <h4>Total Customers</h4>

              <h2>{customers.length}</h2>

            </div>

          </div>

          <div className="summary-card">

            <div className="summary-icon green">
              <FiStar />
            </div>

            <div>

              <h4>Premium</h4>

              <h2>{premium}</h2>

            </div>

          </div>

          <div className="summary-card">

            <div className="summary-icon blue">
              <FiTrendingUp />
            </div>

            <div>

              <h4>Regular</h4>

              <h2>{regular}</h2>

            </div>

          </div>

          <div className="summary-card">

            <div className="summary-icon orange">
              <FiDollarSign />
            </div>

            <div>

              <h4>Total Spending</h4>

              <h2>₹{totalRevenue.toLocaleString()}</h2>

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

        <div className="segment-card">

          {loading ? (

            <div className="loading-state">
              Loading customer segmentation...
            </div>

          ) : filteredCustomers.length === 0 ? (

            <div className="empty-state">

              <h3>No Customer Data Found</h3>

              <p>No segmentation data available.</p>

            </div>

          ) : (

            <div className="table-responsive">

              <table className="segment-table">

                <thead>

                  <tr>

                    <th>Customer</th>

                    <th>Orders</th>

                    <th>Total Spent</th>

                    <th>Last Purchase</th>

                    <th>Segment</th>

                  </tr>

                </thead>

                <tbody>
                                      {filteredCustomers.map((customer) => (
                    <tr key={customer.customer_id}>
                      <td>
                        <div className="customer-info">
                          <div className="customer-avatar">
                            {customer.customer_name
                              ? customer.customer_name
                                  .charAt(0)
                                  .toUpperCase()
                              : "C"}
                          </div>

                          <div>
                            <div className="customer-name">
                              {customer.customer_name}
                            </div>

                            <small>
                              ID: {customer.customer_id}
                            </small>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="orders-badge">
                          {customer.frequency}
                        </span>
                      </td>

                      <td className="money">
                        ₹
                        {Number(
                          customer.monetary || 0
                        ).toLocaleString()}
                      </td>

                      <td>
                        {customer.recency_days === null
                          ? "—"
                          : customer.recency_days === 0
                          ? "Today"
                          : customer.recency_days === 1
                          ? "1 day ago"
                          : `${customer.recency_days} days ago`}
                      </td>

                      <td>
                        <span
                          className={`segment-badge ${customer.segment.toLowerCase()}`}
                        >
                          {customer.segment}
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

export default CustomerSegmentation;