import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

import DashboardLayout from "../../components/layout/DashboardLayout";
import SalesChart from "../../components/charts/SalesChart";
import InventoryChart from "../../components/charts/InventoryChart";

function VendorDashboard() {

  const [stats, setStats] = useState({});
  const navigate = useNavigate();

  useEffect(() => {

    const vendorId = localStorage.getItem("vendor_id");

    API.get(`/dashboard/${vendorId}`)
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (

    <DashboardLayout>

      {/* Header */}

      <div className="mb-5">

        <h2
          className="fw-bold"
          style={{ color: "#2D3748" }}
        >
          Welcome Back 👋
        </h2>

        <p className="text-muted">
          Manage your marketplace using AI-powered insights.
        </p>

      </div>

      {/* KPI Cards */}

      <div className="row g-4">

        {/* Total Products */}

        <div className="col-lg-3">

          <div
            className="p-4"
            style={{
              background: "linear-gradient(135deg,#5B3CC4,#7C3AED)",
              color: "white",
              borderRadius: "20px",
              boxShadow: "0 15px 35px rgba(91,60,196,.25)"
            }}
          >

            <h6>📦 Total Products</h6>

            <h1 className="fw-bold mt-3">
              {stats.total_products || 0}
            </h1>

            <small>Products available</small>

          </div>

        </div>

        {/* Total Stock */}

        <div className="col-lg-3">

          <div
            className="p-4"
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              boxShadow: "0 10px 30px rgba(0,0,0,.08)"
            }}
          >

            <h6>📋 Total Stock</h6>

            <h1
              className="fw-bold mt-3"
              style={{ color: "#5B3CC4" }}
            >
              {stats.total_stock || 0}
            </h1>

            <small>Items currently in inventory</small>

          </div>

        </div>

        {/* Inventory Value */}

        <div className="col-lg-3">

          <div
            className="p-4"
            style={{
              background: "linear-gradient(135deg,#10B981,#059669)",
              color: "white",
              borderRadius: "20px",
              boxShadow: "0 15px 35px rgba(16,185,129,.25)"
            }}
          >

            <h6>💰 Inventory Value</h6>

            <h1 className="fw-bold mt-3">
              ₹ {stats.inventory_value || 0}
            </h1>

            <small>Total inventory worth</small>

          </div>

        </div>

        {/* Low Stock */}

        <div className="col-lg-3">

          <div
            className="p-4"
            style={{
              background: "linear-gradient(135deg,#EF4444,#DC2626)",
              color: "white",
              borderRadius: "20px",
              boxShadow: "0 15px 35px rgba(239,68,68,.25)"
            }}
          >

            <h6>⚠️ Low Stock Products</h6>

            <h1 className="fw-bold mt-3">
              {stats.low_stock_products || 0}
            </h1>

            <small>Products below 10 units</small>

          </div>

        </div>

      </div>

      {/* AI Insights */}

      <div className="mt-5">

        <div
          className="p-4"
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,.08)"
          }}
        >

          <h4 className="mb-3">
            🤖 AI Marketplace Insights
          </h4>

          <div className="alert alert-success">
            ✅ Inventory health is good.
          </div>

          <div className="alert alert-warning">
            ⚠️ Products with stock below <strong>10</strong> should be restocked.
          </div>

          <div className="alert alert-info">
            📈 Continue adding products to improve marketplace performance.
          </div>

        </div>

      </div>

      {/* Quick Actions */}

      <div className="row mt-4 g-3">

        <div className="col-md-4">

          <button
            className="btn btn-primary w-100 p-3"
            onClick={() => navigate("/vendor/add-product")}
          >
            ➕ Add Product
          </button>

        </div>

        <div className="col-md-4">

          <button
            className="btn btn-dark w-100 p-3"
            onClick={() => navigate("/vendor/products")}
          >
            📦 View Products
          </button>

        </div>

        <div className="col-md-4">

          <button
            className="btn btn-success w-100 p-3"
            onClick={() => navigate("/vendor/reports")}
          >
            📈 View Reports
          </button>

        </div>

      </div>

      {/* Charts */}

      <div className="row mt-5">

        <div className="col-lg-8">
          <SalesChart />
        </div>

        <div className="col-lg-4">
          <InventoryChart />
        </div>

      </div>

    </DashboardLayout>

  );

}

export default VendorDashboard;