import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../services/api";

import {
  BrainCircuit,
  Package,
  ShoppingCart,
  IndianRupee,
  TriangleAlert,
  PackageX,
  Trophy,
  Sparkles,
  TrendingUp,
  Boxes,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import "../../styles/aiDashboard.css";

function AIDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ==========================================
     LOAD DASHBOARD
  ========================================== */

  const loadDashboard = async () => {
    const vendorId = localStorage.getItem("vendor_id");

    if (!vendorId) {
      setError("Vendor ID not found. Please login again.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await API.get(
        `/vendor/ai-dashboard/${vendorId}`
      );

      setData(res.data);
    } catch (err) {
      console.error("AI Dashboard Error:", err);

      setError(
        err.response?.data?.detail ||
          "Unable to load AI dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  /* ==========================================
     FORMATTERS
  ========================================== */

  const money = (value) =>
    Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  /* ==========================================
     LOADING
  ========================================== */

  if (loading) {
    return (
      <DashboardLayout>
        <div className="ai-state">
          <RefreshCw
            size={30}
            className="ai-spin"
          />

          <h3>Preparing AI Insights...</h3>

          <p>
            Analyzing your store performance and inventory.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  /* ==========================================
     ERROR
  ========================================== */

  if (error || !data) {
    return (
      <DashboardLayout>
        <div className="ai-state">
          <AlertCircle size={31} />

          <h3>AI Dashboard Unavailable</h3>

          <p>
            {error || "Unable to load dashboard data."}
          </p>

          <button
            type="button"
            className="ai-retry"
            onClick={loadDashboard}
          >
            Try Again
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const totalProducts = Number(data.total_products || 0);
  const totalOrders = Number(data.total_orders || 0);
  const totalRevenue = Number(data.total_revenue || 0);

  const lowStock = Number(data.low_stock_products || 0);

  const outOfStock = Number(
    data.out_of_stock_products || 0
  );

  const topProduct =
    data.top_selling_product || "No sales yet";

  const stockIssues = lowStock + outOfStock;

  return (
    <DashboardLayout>
      <div className="ai-page">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="ai-header">

          <div>
            <p className="ai-eyebrow">
              INTELLIGENT BUSINESS OVERVIEW
            </p>

            <h1>AI Dashboard</h1>

            <p className="ai-subtitle">
              Smart insights from your sales, products and
              inventory performance.
            </p>
          </div>

          <div className="ai-powered-badge">
            <Sparkles size={15} />
            AI Powered
          </div>

        </div>

        {/* ==========================================
            MAIN KPI CARDS
        ========================================== */}

        <div className="ai-kpi-grid">

          {/* PRODUCTS */}

          <div className="ai-kpi-card">

            <div className="ai-kpi-icon">
              <Package size={21} />
            </div>

            <div>
              <span>Total Products</span>

              <h2>{totalProducts}</h2>

              <p>Products currently listed</p>
            </div>

          </div>

          {/* ORDERS */}

          <div className="ai-kpi-card">

            <div className="ai-kpi-icon">
              <ShoppingCart size={21} />
            </div>

            <div>
              <span>Total Orders</span>

              <h2>{totalOrders}</h2>

              <p>Completed sales transactions</p>
            </div>

          </div>

          {/* REVENUE */}

          <div className="ai-kpi-card revenue">

            <div className="ai-kpi-icon">
              <IndianRupee size={21} />
            </div>

            <div>
              <span>Total Revenue</span>

              <h2>₹{money(totalRevenue)}</h2>

              <p>Revenue generated from sales</p>
            </div>

          </div>

          {/* TOP PRODUCT */}

          <div className="ai-kpi-card">

            <div className="ai-kpi-icon trophy">
              <Trophy size={21} />
            </div>

            <div className="ai-product-content">
              <span>Top Product</span>

              <h2 className="ai-top-product">
                {topProduct}
              </h2>

              <p>Best-selling product</p>
            </div>

          </div>

        </div>

        {/* ==========================================
            AI BUSINESS SUMMARY
        ========================================== */}

        <div className="ai-main-grid">

          {/* AI INSIGHT PANEL */}

          <div className="ai-insight-panel">

            <div className="ai-section-header">

              <div className="ai-section-title">

                <div className="ai-section-icon">
                  <BrainCircuit size={20} />
                </div>

                <div>
                  <h3>AI Business Summary</h3>

                  <p>
                    Quick interpretation of your current
                    store performance.
                  </p>
                </div>

              </div>

              <span className="ai-live-badge">
                <span />
                Live Data
              </span>

            </div>

            <div className="ai-insight-list">

              {/* REVENUE INSIGHT */}

              <div className="ai-insight-item">

                <div className="ai-insight-icon positive">
                  <TrendingUp size={18} />
                </div>

                <div>
                  <span>Sales Performance</span>

                  <p>
                    Your store has generated{" "}
                    <strong>
                      ₹{money(totalRevenue)}
                    </strong>{" "}
                    from{" "}
                    <strong>{totalOrders}</strong>{" "}
                    completed orders.
                  </p>
                </div>

              </div>

              {/* PRODUCT INSIGHT */}

              <div className="ai-insight-item">

                <div className="ai-insight-icon violet">
                  <Boxes size={18} />
                </div>

                <div>
                  <span>Product Portfolio</span>

                  <p>
                    You currently have{" "}
                    <strong>{totalProducts}</strong>{" "}
                    products listed in your store.
                  </p>
                </div>

              </div>

              {/* TOP PRODUCT */}

              <div className="ai-insight-item">

                <div className="ai-insight-icon trophy">
                  <Trophy size={18} />
                </div>

                <div>
                  <span>Best Performer</span>

                  <p>
                    Your current best-selling product is{" "}
                    <strong>{topProduct}</strong>.
                  </p>
                </div>

              </div>

              {/* INVENTORY */}

              <div className="ai-insight-item">

                <div
                  className={`ai-insight-icon ${
                    stockIssues > 0
                      ? "warning"
                      : "positive"
                  }`}
                >
                  {stockIssues > 0 ? (
                    <TriangleAlert size={18} />
                  ) : (
                    <CheckCircle2 size={18} />
                  )}
                </div>

                <div>
                  <span>Inventory Health</span>

                  {stockIssues > 0 ? (
                    <p>
                      <strong>{lowStock}</strong>{" "}
                      products have low stock and{" "}
                      <strong>{outOfStock}</strong>{" "}
                      products are currently out of stock.
                    </p>
                  ) : (
                    <p>
                      Your inventory is healthy. There are
                      currently no low-stock or out-of-stock
                      products.
                    </p>
                  )}
                </div>

              </div>

            </div>

          </div>

          {/* ==========================================
              INVENTORY STATUS
          ========================================== */}

          <div className="ai-inventory-panel">

            <div className="ai-section-header">

              <div>
                <h3>Inventory Attention</h3>

                <p>
                  Products requiring action
                </p>
              </div>

              <div className="ai-section-icon">
                <Package size={20} />
              </div>

            </div>

            <div className="ai-inventory-stats">

              {/* LOW STOCK */}

              <div className="ai-stock-stat">

                <div className="ai-stock-icon warning">
                  <TriangleAlert size={19} />
                </div>

                <div>
                  <span>Low Stock</span>

                  <strong>{lowStock}</strong>

                  <p>Need restocking soon</p>
                </div>

              </div>

              {/* OUT OF STOCK */}

              <div className="ai-stock-stat">

                <div className="ai-stock-icon danger">
                  <PackageX size={19} />
                </div>

                <div>
                  <span>Out of Stock</span>

                  <strong>{outOfStock}</strong>

                  <p>Currently unavailable</p>
                </div>

              </div>

            </div>

            {/* INVENTORY MESSAGE */}

            <div
              className={`ai-inventory-message ${
                stockIssues === 0 ? "healthy" : ""
              }`}
            >

              {stockIssues === 0 ? (
                <>
                  <CheckCircle2 size={17} />

                  <span>
                    Inventory is currently in good condition.
                  </span>
                </>
              ) : (
                <>
                  <TriangleAlert size={17} />

                  <span>
                    {stockIssues} product
                    {stockIssues !== 1 ? "s" : ""} require
                    inventory attention.
                  </span>
                </>
              )}

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default AIDashboard;