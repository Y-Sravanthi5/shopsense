import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import API from "../../services/api";

function CustomerAnalytics() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --------------------------------
  // Load Customer Analytics
  // --------------------------------
  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);

      const res = await API.get("/analytics/customers");

      console.log("Customer Analytics Response:", res.data);

      setCustomers(res.data);
      setError("");
    } catch (err) {
      console.error("Customer Analytics Error:", err);

      setError("Unable to load customer analytics.");
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // Currency Formatter
  // --------------------------------
  const formatMoney = (value) => {
    return Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // --------------------------------
  // Summary Analytics
  // --------------------------------
  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const totalOrders = customers.reduce(
    (sum, customer) =>
      sum + Number(customer.total_orders || 0),
    0
  );

  const totalSpending = customers.reduce(
    (sum, customer) =>
      sum + Number(customer.total_spent || 0),
    0
  );

  // --------------------------------
  // Loading
  // --------------------------------
  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center mt-5">
          <h4>Loading customer analytics...</h4>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      {/* Page Title */}

      <h2 className="mb-4 fw-bold">
        👥 Customer Analytics
      </h2>

      {/* Error */}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* =====================================
          SUMMARY CARDS
      ====================================== */}

      <div className="row g-4 mb-4">

        {/* Total Customers */}

        <div className="col-md-3">
          <div className="card shadow-sm border-0 p-4 text-center h-100">

            <h6 className="text-muted">
              Total Customers
            </h6>

            <h2 className="mt-2 text-primary">
              {totalCustomers}
            </h2>

          </div>
        </div>

        {/* Active Customers */}

        <div className="col-md-3">
          <div className="card shadow-sm border-0 p-4 text-center h-100">

            <h6 className="text-muted">
              Active Customers
            </h6>

            <h2 className="mt-2 text-success">
              {activeCustomers}
            </h2>

          </div>
        </div>

        {/* Total Orders */}

        <div className="col-md-3">
          <div className="card shadow-sm border-0 p-4 text-center h-100">

            <h6 className="text-muted">
              Total Orders
            </h6>

            <h2 className="mt-2">
              {totalOrders}
            </h2>

          </div>
        </div>

        {/* Total Spending */}

        <div className="col-md-3">
          <div className="card shadow-sm border-0 p-4 text-center h-100">

            <h6 className="text-muted">
              Total Customer Spending
            </h6>

            <h3 className="mt-2 text-success">
              ₹{formatMoney(totalSpending)}
            </h3>

          </div>
        </div>

      </div>

      {/* =====================================
          CUSTOMER PERFORMANCE TABLE
      ====================================== */}

      <div className="card shadow-sm border-0 p-4">

        <h4 className="mb-4">
          📊 Customer Performance
        </h4>

        <div className="table-responsive">

          <table className="table table-bordered table-hover align-middle">

            <thead className="table-dark">

              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Orders</th>
                <th>Total Spending</th>
                <th>Avg. Order Value</th>
                <th>Customer Lifetime Value</th>
                <th>Last Purchase</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {customers.length === 0 ? (

                <tr>
                  <td
                    colSpan="8"
                    className="text-center text-muted"
                  >
                    No customer analytics available.
                  </td>
                </tr>

              ) : (

                customers.map((customer) => (

                  <tr key={customer.customer_id}>

                    {/* Customer Name */}

                    <td>
                      <div className="fw-bold">
                        {customer.customer_name || "N/A"}
                      </div>

                      <small className="text-muted">
                        ID: {customer.customer_id}
                      </small>
                    </td>

                    {/* Email */}

                    <td>
                      {customer.email}
                    </td>

                    {/* Orders */}

                    <td className="text-center fw-bold">
                      {customer.total_orders || 0}
                    </td>

                    {/* Total Spending */}

                    <td>
                      ₹{formatMoney(customer.total_spent)}
                    </td>

                    {/* Average Order Value */}

                    <td>
                      ₹{formatMoney(
                        customer.average_order_value
                      )}
                    </td>

                    {/* Customer Lifetime Value */}

                    <td className="fw-bold text-primary">
                      ₹{formatMoney(
                        customer.customer_lifetime_value
                      )}
                    </td>

                    {/* Last Purchase */}

                    <td>

                      {customer.last_purchase_days === null ||
                      customer.last_purchase_days === undefined ? (

                        <span className="text-muted">
                          No purchases
                        </span>

                      ) : customer.last_purchase_days === 0 ? (

                        <span>
                          Today
                        </span>

                      ) : customer.last_purchase_days === 1 ? (

                        <span>
                          1 day ago
                        </span>

                      ) : (

                        <span>
                          {customer.last_purchase_days} days ago
                        </span>

                      )}

                    </td>

                    {/* Status */}

                    <td>

                      {customer.status === "Active" ? (

                        <span className="badge bg-success">
                          Active
                        </span>

                      ) : (

                        <span className="badge bg-secondary">
                          Inactive
                        </span>

                      )}

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>
  );
}

export default CustomerAnalytics;