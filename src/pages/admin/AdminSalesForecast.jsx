import { useEffect, useMemo, useState } from "react";
import {
  FiRefreshCw,
  FiSearch,
  FiTrendingUp,
  FiPackage,
  FiBarChart2,
  FiAlertCircle,
} from "react-icons/fi";
import AdminLayout from "../../components/layout/AdminLayout";
import API from "../../services/api";
import "../../styles/adminSalesForecast.css";

function SalesForecast() {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadForecast();
  }, []);

  const loadForecast = async () => {
    try {
      setLoading(true);

      const res = await API.get("/analytics/sales-forecast");

      setForecast(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load sales forecast.");
    } finally {
      setLoading(false);
    }
  };

  const filteredForecast = useMemo(() => {
    return forecast.filter((item) =>
      item.product_name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [forecast, search]);

  const totalProducts = forecast.length;

  const totalPredictedSales = forecast.reduce(
    (sum, item) => sum + Number(item.predicted_sales || 0),
    0
  );

  const totalRestock = forecast.reduce(
    (sum, item) => sum + Number(item.suggested_restock || 0),
    0
  );

  const lowStockProducts = forecast.filter(
    (item) => item.current_stock < item.suggested_restock
  ).length;

  return (
    <AdminLayout>
      <div className="forecast-page">

        {/* Hero */}

        <div className="forecast-hero">

          <div>

            <h1>AI Sales Forecast</h1>

            <p>
              AI-powered sales prediction to help optimize inventory,
              forecast demand, and plan product restocking.
            </p>

          </div>

          <button
            className="refresh-btn"
            onClick={loadForecast}
          >
            <FiRefreshCw />
            Refresh
          </button>

        </div>

        {/* Summary */}

        <div className="summary-grid">

          <div className="summary-card">

            <div className="summary-icon purple">
              <FiPackage />
            </div>

            <div>

              <h4>Products</h4>

              <h2>{totalProducts}</h2>

            </div>

          </div>

          <div className="summary-card">

            <div className="summary-icon blue">
              <FiTrendingUp />
            </div>

            <div>

              <h4>Predicted Sales</h4>

              <h2>{totalPredictedSales}</h2>

            </div>

          </div>

          <div className="summary-card">

            <div className="summary-icon green">
              <FiBarChart2 />
            </div>

            <div>

              <h4>Suggested Restock</h4>

              <h2>{totalRestock}</h2>

            </div>

          </div>

          <div className="summary-card">

            <div className="summary-icon orange">
              <FiAlertCircle />
            </div>

            <div>

              <h4>Low Stock Items</h4>

              <h2>{lowStockProducts}</h2>

            </div>

          </div>

        </div>

        {/* Toolbar */}

        <div className="table-toolbar">

          <div className="search-box">

            <FiSearch />

            <input
              type="text"
              placeholder="Search product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

        </div>

        {/* Table */}

        <div className="forecast-card">

          {loading ? (

            <div className="loading-state">
              Loading AI Forecast...
            </div>

          ) : filteredForecast.length === 0 ? (

            <div className="empty-state">

              <h3>No Forecast Data</h3>

              <p>No prediction records available.</p>

            </div>

          ) : (

            <div className="table-responsive">

              <table className="forecast-table">

                <thead>

                  <tr>

                    <th>Product</th>

                    <th>Current Stock</th>

                    <th>Historical Sales</th>

                    <th>Predicted Sales</th>

                    <th>Suggested Restock</th>

                  </tr>

                </thead>

                <tbody>
                                      {filteredForecast.map((item) => (
                    <tr key={item.product_id}>

                      <td>

                        <div className="product-cell">

                          <div className="product-avatar">
                            {item.product_name?.charAt(0).toUpperCase()}
                          </div>

                          <div className="product-name">
                            {item.product_name}
                          </div>

                        </div>

                      </td>

                      <td>

                        <span
                          className={`stock-badge ${
                            item.current_stock < item.suggested_restock
                              ? "low"
                              : "good"
                          }`}
                        >
                          {item.current_stock}
                        </span>

                      </td>

                      <td>
                        {item.historical_sales}
                      </td>

                      <td className="predicted-sales">
                        {item.predicted_sales}
                      </td>

                      <td>

                        <span className="restock-badge">
                          {item.suggested_restock}
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

export default SalesForecast;