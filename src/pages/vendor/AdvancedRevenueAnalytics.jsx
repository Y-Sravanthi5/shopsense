import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../services/api";

import { Bar, Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

function AdvancedRevenueAnalytics() {

  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const vendorId = localStorage.getItem("vendor_id");

    if (!vendorId) {
      console.error("Vendor ID not found");
      setLoading(false);
      return;
    }

    API.get(`/vendor/advanced-revenue/${vendorId}`)
      .then((res) => {

        console.log("Advanced Revenue Analytics:", res.data);

        setAnalytics(res.data);
        setLoading(false);

      })
      .catch((err) => {

        console.error(err);
        setLoading(false);

      });

  }, []);


  if (loading) {

    return (
      <DashboardLayout>

        <div className="text-center mt-5">

          <h4>Loading Revenue Analytics...</h4>

        </div>

      </DashboardLayout>
    );

  }


  if (!analytics) {

    return (
      <DashboardLayout>

        <div className="alert alert-danger">

          Unable to load revenue analytics.

        </div>

      </DashboardLayout>
    );

  }


  const summary = analytics.summary || {};
  const growth = analytics.growth || {};

  const revenueTrend = analytics.revenue_trend || [];
  const categories = analytics.category_performance || [];


  // ---------------------------------------------------
  // Revenue Trend Chart
  // ---------------------------------------------------

  const revenueChartData = {

    labels: revenueTrend.map((item) => item.date),

    datasets: [
      {
        label: "Revenue (₹)",

        data: revenueTrend.map(
          (item) => item.revenue
        ),

        borderColor: "#4F46E5",
        backgroundColor: "#4F46E5",

        tension: 0.4
      }
    ]

  };


  // ---------------------------------------------------
  // Category Performance Chart
  // ---------------------------------------------------

  const categoryChartData = {

    labels: categories.map(
      (item) => item.category || "Uncategorized"
    ),

    datasets: [
      {
        label: "Category Revenue (₹)",

        data: categories.map(
          (item) => item.revenue
        ),

        backgroundColor: "#6366F1"
      }
    ]

  };


  const growthValue =
    Number(growth.growth_percentage || 0);


  return (

    <DashboardLayout>

      <div className="container-fluid">

        <div className="mb-4">

          <h2 className="fw-bold">
            📊 Advanced Revenue Analytics
          </h2>

          <p className="text-muted">

            Monitor revenue performance,
            growth trends and product insights.

          </p>

        </div>


        {/* ===========================
            SUMMARY CARDS
        =========================== */}

        <div className="row g-4">

          <div className="col-lg-3 col-md-6">

            <div className="card shadow border-0 h-100">

              <div className="card-body">

                <p className="text-muted mb-2">
                  Total Revenue
                </p>

                <h3 className="fw-bold text-success">

                  ₹
                  {Number(
                    summary.total_revenue || 0
                  ).toFixed(2)}

                </h3>

              </div>

            </div>

          </div>


          <div className="col-lg-3 col-md-6">

            <div className="card shadow border-0 h-100">

              <div className="card-body">

                <p className="text-muted mb-2">
                  Transactions
                </p>

                <h3 className="fw-bold">

                  {summary.total_transactions || 0}

                </h3>

              </div>

            </div>

          </div>


          <div className="col-lg-3 col-md-6">

            <div className="card shadow border-0 h-100">

              <div className="card-body">

                <p className="text-muted mb-2">
                  Units Sold
                </p>

                <h3 className="fw-bold">

                  {summary.total_units_sold || 0}

                </h3>

              </div>

            </div>

          </div>


          <div className="col-lg-3 col-md-6">

            <div className="card shadow border-0 h-100">

              <div className="card-body">

                <p className="text-muted mb-2">
                  Average Transaction
                </p>

                <h3 className="fw-bold">

                  ₹
                  {Number(
                    summary.average_transaction_value || 0
                  ).toFixed(2)}

                </h3>

              </div>

            </div>

          </div>

        </div>


        {/* ===========================
            GROWTH
        =========================== */}

        <div className="row g-4 mt-1">

          <div className="col-md-4">

            <div className="card shadow border-0 h-100">

              <div className="card-body">

                <h6 className="text-muted">
                  Current 30 Days
                </h6>

                <h3>

                  ₹
                  {Number(
                    growth.current_30_days || 0
                  ).toFixed(2)}

                </h3>

              </div>

            </div>

          </div>


          <div className="col-md-4">

            <div className="card shadow border-0 h-100">

              <div className="card-body">

                <h6 className="text-muted">
                  Previous 30 Days
                </h6>

                <h3>

                  ₹
                  {Number(
                    growth.previous_30_days || 0
                  ).toFixed(2)}

                </h3>

              </div>

            </div>

          </div>


          <div className="col-md-4">

            <div className="card shadow border-0 h-100">

              <div className="card-body">

                <h6 className="text-muted">
                  Revenue Growth
                </h6>

                <h3
                  className={
                    growthValue > 0
                      ? "text-success"
                      : growthValue < 0
                      ? "text-danger"
                      : "text-secondary"
                  }
                >

                  {growthValue > 0 ? "▲ " : ""}
                  {growthValue < 0 ? "▼ " : ""}

                  {growthValue.toFixed(2)}%

                </h3>

              </div>

            </div>

          </div>

        </div>


        {/* ===========================
            PRODUCT INSIGHTS
        =========================== */}

        <div className="row g-4 mt-1">

          <div className="col-md-4">

            <div className="card shadow border-0 h-100">

              <div className="card-body">

                <h5>
                  🏆 Top Selling Product
                </h5>

                <h4 className="mt-3">

                  {
                    analytics.top_selling_product
                      ?.product_name || "N/A"
                  }

                </h4>

                <p className="text-muted">

                  Units Sold:{" "}

                  {
                    analytics.top_selling_product
                      ?.units_sold || 0
                  }

                </p>

              </div>

            </div>

          </div>


          <div className="col-md-4">

            <div className="card shadow border-0 h-100">

              <div className="card-body">

                <h5>
                  💰 Top Revenue Product
                </h5>

                <h4 className="mt-3">

                  {
                    analytics.top_revenue_product
                      ?.product_name || "N/A"
                  }

                </h4>

                <p className="text-muted">

                  Revenue: ₹

                  {Number(
                    analytics.top_revenue_product
                      ?.revenue || 0
                  ).toFixed(2)}

                </p>

              </div>

            </div>

          </div>


          <div className="col-md-4">

            <div className="card shadow border-0 h-100">

              <div className="card-body">

                <h5>
                  📦 Top Category
                </h5>

                <h4 className="mt-3">

                  {analytics.top_category || "N/A"}

                </h4>

                <p className="text-muted">

                  Highest revenue category

                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ===========================
            CHARTS
        =========================== */}

        <div className="row g-4 mt-1 mb-5">

          <div className="col-lg-7">

            <div className="card shadow border-0">

              <div className="card-body">

                <h5 className="mb-4">
                  📈 Revenue Trend
                </h5>

                {
                  revenueTrend.length > 0
                    ? (
                      <Line
                        data={revenueChartData}
                      />
                    )
                    : (
                      <p className="text-muted">
                        No revenue trend data available.
                      </p>
                    )
                }

              </div>

            </div>

          </div>


          <div className="col-lg-5">

            <div className="card shadow border-0">

              <div className="card-body">

                <h5 className="mb-4">
                  📊 Category Performance
                </h5>

                {
                  categories.length > 0
                    ? (
                      <Bar
                        data={categoryChartData}
                      />
                    )
                    : (
                      <p className="text-muted">
                        No category sales data available.
                      </p>
                    )
                }

              </div>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

}

export default AdvancedRevenueAnalytics;