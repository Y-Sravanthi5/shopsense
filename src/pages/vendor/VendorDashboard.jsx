import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Package,
  Boxes,
  IndianRupee,
  TriangleAlert,
  Sparkles,
  ArrowUpRight,
  ChartNoAxesCombined,
  PieChart,
  CircleCheck,
  Lightbulb,
  Plus,
  LoaderCircle,
} from "lucide-react";

import API from "../../services/api";

import DashboardLayout from "../../components/layout/DashboardLayout";
import SalesChart from "../../components/charts/SalesChart";
import InventoryChart from "../../components/charts/InventoryChart";

function VendorDashboard() {
  const navigate = useNavigate();

  /* =========================================================
     STATE
  ========================================================= */

  const [stats, setStats] = useState({
    total_products: 0,
    total_stock: 0,
    inventory_value: 0,
    low_stock_products: 0,
  });

  const [businessName, setBusinessName] = useState("Vendor");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  /* =========================================================
     LOAD BUSINESS NAME
  ========================================================= */

  useEffect(() => {
    const storedBusinessName =
      localStorage.getItem("business_name");

    if (
      storedBusinessName &&
      storedBusinessName !== "undefined" &&
      storedBusinessName !== "null"
    ) {
      setBusinessName(storedBusinessName);
    }
  }, []);


  /* =========================================================
     LOAD DASHBOARD DATA
  ========================================================= */

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const vendorId =
          localStorage.getItem("vendor_id");

        if (!vendorId) {
          setError("Vendor session not found.");
          setLoading(false);
          return;
        }

        const res = await API.get(
          `/dashboard/${vendorId}`
        );

        setStats({
          total_products:
            res.data.total_products || 0,

          total_stock:
            res.data.total_stock || 0,

          inventory_value:
            res.data.inventory_value || 0,

          low_stock_products:
            res.data.low_stock_products || 0,
        });

      } catch (err) {
        console.error(
          "Dashboard fetch error:",
          err
        );

        setError(
          "Unable to load dashboard data."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();

  }, []);


  /* =========================================================
     NUMBER FORMATTER
  ========================================================= */

  const formatNumber = (value) => {
    return Number(value || 0).toLocaleString(
      "en-IN"
    );
  };


  /* =========================================================
     CURRENCY FORMATTER
  ========================================================= */

  const formatCurrency = (value) => {
    return Number(value || 0).toLocaleString(
      "en-IN",
      {
        maximumFractionDigits: 2,
      }
    );
  };


  /* =========================================================
     LOADING SCREEN
  ========================================================= */

  if (loading) {
    return (
      <DashboardLayout>

        <div className="vendor-loading">

          <LoaderCircle
            size={25}
            className="vendor-loading-icon"
          />

          <span>
            Loading dashboard...
          </span>

        </div>

      </DashboardLayout>
    );
  }


  /* =========================================================
     DASHBOARD
  ========================================================= */

  return (
    <DashboardLayout>

      <div className="vendor-dashboard">


        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="vendor-page-header">

          <div className="vendor-welcome">

            <div className="vendor-welcome-label">
              WELCOME BACK
            </div>

            <h1>
              Hi, {businessName} 👋
            </h1>

            <p>
              Here's what's happening with your
              marketplace today.
            </p>

          </div>


          <button
            type="button"
            className="vendor-primary-button"
            onClick={() =>
              navigate("/vendor/add-product")
            }
          >

            <Plus size={18} />

            <span>
              Add Product
            </span>

          </button>

        </header>


        {/* =====================================================
            ERROR MESSAGE
        ===================================================== */}

        {error && (

          <div className="vendor-error-message">

            <TriangleAlert size={18} />

            <span>
              {error}
            </span>

          </div>

        )}


        {/* =====================================================
            KPI CARDS
        ===================================================== */}

        <section className="vendor-stat-grid">


          {/* TOTAL PRODUCTS */}

          <article className="vendor-stat-card">

            <div className="vendor-stat-top">

              <div className="vendor-stat-icon indigo">

                <Package size={21} />

              </div>

              <span className="vendor-stat-label">
                Total Products
              </span>

            </div>

            <div className="vendor-stat-value">

              {formatNumber(
                stats.total_products
              )}

            </div>

            <div className="vendor-stat-description">
              Products in your catalog
            </div>

          </article>


          {/* TOTAL STOCK */}

          <article className="vendor-stat-card">

            <div className="vendor-stat-top">

              <div className="vendor-stat-icon blue">

                <Boxes size={21} />

              </div>

              <span className="vendor-stat-label">
                Total Stock
              </span>

            </div>

            <div className="vendor-stat-value">

              {formatNumber(
                stats.total_stock
              )}

            </div>

            <div className="vendor-stat-description">
              Units currently in inventory
            </div>

          </article>


          {/* INVENTORY VALUE */}

          <article className="vendor-stat-card">

            <div className="vendor-stat-top">

              <div className="vendor-stat-icon green">

                <IndianRupee size={21} />

              </div>

              <span className="vendor-stat-label">
                Inventory Value
              </span>

            </div>

            <div className="vendor-stat-value">

              ₹{formatCurrency(
                stats.inventory_value
              )}

            </div>

            <div className="vendor-stat-description">
              Total value of your inventory
            </div>

          </article>


          {/* LOW STOCK */}

          <article className="vendor-stat-card">

            <div className="vendor-stat-top">

              <div className="vendor-stat-icon red">

                <TriangleAlert size={21} />

              </div>

              <span className="vendor-stat-label">
                Low Stock
              </span>

            </div>

            <div className="vendor-stat-value">

              {formatNumber(
                stats.low_stock_products
              )}

            </div>

            <div className="vendor-stat-description">
              Products need restocking
            </div>

          </article>

        </section>


        {/* =====================================================
            CHARTS
        ===================================================== */}

        <section className="vendor-chart-section">


          {/* SALES PERFORMANCE */}

          <div className="vendor-chart-large">

            <div className="vendor-panel">

              <div className="vendor-panel-header">

                <div className="vendor-panel-title-row">

                  <div className="vendor-panel-icon">

                    <ChartNoAxesCombined
                      size={20}
                    />

                  </div>

                  <div>

                    <h3>
                      Sales Performance
                    </h3>

                    <p>
                      Weekly sales trend
                    </p>

                  </div>

                </div>


                <button
                  type="button"
                  className="vendor-panel-link"
                  onClick={() =>
                    navigate(
                      "/vendor/analytics"
                    )
                  }
                >

                  View Analytics

                  <ArrowUpRight
                    size={14}
                  />

                </button>

              </div>


              <SalesChart />

            </div>

          </div>


          {/* INVENTORY OVERVIEW */}

          <div className="vendor-chart-small">

            <div className="vendor-panel">

              <div className="vendor-panel-header">

                <div className="vendor-panel-title-row">

                  <div className="vendor-panel-icon">

                    <PieChart size={20} />

                  </div>

                  <div>

                    <h3>
                      Inventory Overview
                    </h3>

                    <p>
                      Products by category
                    </p>

                  </div>

                </div>

              </div>


              <InventoryChart />

            </div>

          </div>

        </section>


        {/* =====================================================
            MARKETPLACE INSIGHTS
        ===================================================== */}

        <section className="vendor-panel vendor-insights-panel">

          <div className="vendor-panel-header">

            <div className="vendor-panel-title-row">

              <div className="vendor-panel-icon">

                <Sparkles size={20} />

              </div>

              <div>

                <h3>
                  Marketplace Insights
                </h3>

                <p>
                  Smart recommendations for your store
                </p>

              </div>

            </div>


            <button
              type="button"
              className="vendor-panel-link"
              onClick={() =>
                navigate(
                  "/vendor/ai-dashboard"
                )
              }
            >

              Open AI Dashboard

              <ArrowUpRight
                size={14}
              />

            </button>

          </div>


          <div className="vendor-insight-list">


            {/* INSIGHT 1 */}

            <div className="vendor-insight-item">

              <div className="vendor-insight-icon success">

                <CircleCheck size={18} />

              </div>

              <div>

                <h6>
                  Inventory health looks good
                </h6>

                <p>
                  Most products have healthy
                  stock levels.
                </p>

              </div>

            </div>


            {/* INSIGHT 2 */}

            <div className="vendor-insight-item">

              <div className="vendor-insight-icon warning">

                <TriangleAlert size={18} />

              </div>

              <div>

                <h6>
                  Watch low-stock items
                </h6>

                <p>
                  Restock products below 10
                  units to avoid missed sales.
                </p>

              </div>

            </div>


            {/* INSIGHT 3 */}

            <div className="vendor-insight-item">

              <div className="vendor-insight-icon info">

                <Lightbulb size={18} />

              </div>

              <div>

                <h6>
                  Grow your catalog
                </h6>

                <p>
                  Adding relevant products can
                  improve marketplace reach.
                </p>

              </div>

            </div>

          </div>

        </section>

      </div>

    </DashboardLayout>
  );
}

export default VendorDashboard;