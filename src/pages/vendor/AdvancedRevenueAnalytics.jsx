import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../services/api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line, Bar } from "react-chartjs-2";

import {
  IndianRupee,
  ShoppingCart,
  PackageCheck,
  ReceiptIndianRupee,
  TrendingUp,
  Trophy,
  Package,
  BarChart3,
} from "lucide-react";

import "../../styles/revenueAnalytics.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler
);

function AdvancedRevenueAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const vendorId = localStorage.getItem("vendor_id");

    if (!vendorId) {
      setLoading(false);
      return;
    }

    API.get(`/vendor/advanced-revenue/${vendorId}`)
      .then((res) => {
        setAnalytics(res.data);
      })
      .catch((err) => {
        console.error("Revenue analytics error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="revenue-state">
          <h3>Loading Revenue Analytics...</h3>
          <p>Please wait while your sales data is prepared.</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!analytics) {
    return (
      <DashboardLayout>
        <div className="revenue-state">
          <h3>Unable to load analytics</h3>
          <p>Please try again later.</p>
        </div>
      </DashboardLayout>
    );
  }

  const summary = analytics.summary || {};
  const growth = analytics.growth || {};
  const revenueTrend = analytics.revenue_trend || [];
  const categories = analytics.category_performance || [];

  const money = (value) =>
    Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const compactMoney = (value) =>
    Number(value || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });

  const currentRevenue = Number(growth.current_30_days || 0);
  const previousRevenue = Number(growth.previous_30_days || 0);
  const growthValue = Number(growth.growth_percentage || 0);

  const growthDisplay =
    previousRevenue === 0 && currentRevenue > 0
      ? "New"
      : `${growthValue > 0 ? "+" : ""}${growthValue.toFixed(2)}%`;

  const growthClass =
    previousRevenue === 0 && currentRevenue > 0
      ? "positive"
      : growthValue > 0
      ? "positive"
      : growthValue < 0
      ? "negative"
      : "neutral";

  const revenueChartData = {
    labels: revenueTrend.map((item) => item.date),

    datasets: [
      {
        label: "Revenue",
        data: revenueTrend.map((item) => Number(item.revenue || 0)),
        borderColor: "#6D4AFF",
        backgroundColor: "rgba(109, 74, 255, 0.10)",
        pointBackgroundColor: "#6D4AFF",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 3,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const revenueChartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    interaction: {
      mode: "index",
      intersect: false,
    },

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        backgroundColor: "#171725",
        padding: 12,
        cornerRadius: 8,

        callbacks: {
          label: (context) =>
            ` Revenue: ₹${money(context.parsed.y)}`,
        },
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: "#777487",
          font: {
            size: 12,
          },
        },
      },

      y: {
        beginAtZero: true,

        border: {
          display: false,
        },

        grid: {
          color: "#EEEAF8",
        },

        ticks: {
          color: "#777487",

          callback: (value) =>
            `₹${compactMoney(value)}`,
        },
      },
    },
  };

  const categoryChartData = {
    labels: categories.map(
      (item) => item.category || "Uncategorized"
    ),

    datasets: [
      {
        label: "Revenue",
        data: categories.map((item) =>
          Number(item.revenue || 0)
        ),
        backgroundColor: "#7657E8",
        borderRadius: 7,
        borderSkipped: false,
        maxBarThickness: 55,
      },
    ],
  };

  const categoryChartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        backgroundColor: "#171725",
        padding: 12,
        cornerRadius: 8,

        callbacks: {
          label: (context) =>
            ` Revenue: ₹${money(context.parsed.y)}`,
        },
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: "#777487",
        },
      },

      y: {
        beginAtZero: true,

        border: {
          display: false,
        },

        grid: {
          color: "#EEEAF8",
        },

        ticks: {
          color: "#777487",

          callback: (value) =>
            `₹${compactMoney(value)}`,
        },
      },
    },
  };

  return (
    <DashboardLayout>
      <div className="revenue-page">

        {/* ================= HEADER ================= */}

        <div className="revenue-header">
          <div>
            <p className="revenue-eyebrow">
              PERFORMANCE OVERVIEW
            </p>

            <h1>Revenue Analytics</h1>

            <p className="revenue-subtitle">
              Track revenue performance, sales growth and
              product insights.
            </p>
          </div>
        </div>

        {/* ================= KPI CARDS ================= */}

        <div className="revenue-kpi-grid">

          <div className="revenue-kpi-card">
            <div className="revenue-kpi-icon violet">
              <IndianRupee size={21} />
            </div>

            <div>
              <span>Total Revenue</span>

              <h2>
                ₹{money(summary.total_revenue)}
              </h2>

              <p>Overall sales revenue</p>
            </div>
          </div>


          <div className="revenue-kpi-card">
            <div className="revenue-kpi-icon blue">
              <ShoppingCart size={21} />
            </div>

            <div>
              <span>Transactions</span>

              <h2>
                {summary.total_transactions || 0}
              </h2>

              <p>Total completed sales</p>
            </div>
          </div>


          <div className="revenue-kpi-card">
            <div className="revenue-kpi-icon violet">
              <PackageCheck size={21} />
            </div>

            <div>
              <span>Units Sold</span>

              <h2>
                {summary.total_units_sold || 0}
              </h2>

              <p>Products sold</p>
            </div>
          </div>


          <div className="revenue-kpi-card">
            <div className="revenue-kpi-icon blue">
              <ReceiptIndianRupee size={21} />
            </div>

            <div>
              <span>Average Transaction</span>

              <h2>
                ₹{money(
                  summary.average_transaction_value
                )}
              </h2>

              <p>Average sale value</p>
            </div>
          </div>

        </div>

        {/* ================= GROWTH STRIP ================= */}

        <div className="growth-panel">

          <div className="growth-title">
            <div className="growth-title-icon">
              <TrendingUp size={21} />
            </div>

            <div>
              <h3>Revenue Growth</h3>
              <p>30-day revenue comparison</p>
            </div>
          </div>


          <div className="growth-metrics">

            <div className="growth-item">
              <span>Current 30 Days</span>

              <strong>
                ₹{money(currentRevenue)}
              </strong>
            </div>


            <div className="growth-divider" />


            <div className="growth-item">
              <span>Previous 30 Days</span>

              <strong>
                ₹{money(previousRevenue)}
              </strong>
            </div>


            <div className="growth-divider" />


            <div className="growth-item">
              <span>Growth</span>

              <strong
                className={`growth-number ${growthClass}`}
              >
                {growthDisplay}
              </strong>
            </div>

          </div>

        </div>

        {/* ================= CHARTS ================= */}

        <div className="revenue-chart-grid">

          <div className="analytics-chart-card">

            <div className="chart-card-header">
              <div>
                <h3>Revenue Trend</h3>
                <p>Revenue generated over time</p>
              </div>

              <div className="chart-header-icon">
                <TrendingUp size={20} />
              </div>
            </div>

            <div className="revenue-chart-area">

              {revenueTrend.length > 0 ? (
                <Line
                  data={revenueChartData}
                  options={revenueChartOptions}
                />
              ) : (
                <div className="chart-empty">
                  No revenue trend data available.
                </div>
              )}

            </div>

          </div>


          <div className="analytics-chart-card">

            <div className="chart-card-header">
              <div>
                <h3>Category Performance</h3>
                <p>Revenue contribution by category</p>
              </div>

              <div className="chart-header-icon">
                <BarChart3 size={20} />
              </div>
            </div>

            <div className="revenue-chart-area">

              {categories.length > 0 ? (
                <Bar
                  data={categoryChartData}
                  options={categoryChartOptions}
                />
              ) : (
                <div className="chart-empty">
                  No category sales data available.
                </div>
              )}

            </div>

          </div>

        </div>

        {/* ================= BUSINESS HIGHLIGHTS ================= */}

        <div className="business-highlights">

          <div className="highlights-header">
            <h3>Business Highlights</h3>

            <p>
              Your strongest products and category
            </p>
          </div>


          <div className="highlight-grid">

            <div className="highlight-item">

              <div className="highlight-icon">
                <Trophy size={21} />
              </div>

              <div>
                <span>Top Selling Product</span>

                <h4>
                  {analytics.top_selling_product
                    ?.product_name || "N/A"}
                </h4>

                <p>
                  {analytics.top_selling_product
                    ?.units_sold || 0}{" "}
                  units sold
                </p>
              </div>

            </div>


            <div className="highlight-item">

              <div className="highlight-icon">
                <IndianRupee size={21} />
              </div>

              <div>
                <span>Top Revenue Product</span>

                <h4>
                  {analytics.top_revenue_product
                    ?.product_name || "N/A"}
                </h4>

                <p>
                  ₹
                  {money(
                    analytics.top_revenue_product
                      ?.revenue
                  )}
                </p>
              </div>

            </div>


            <div className="highlight-item">

              <div className="highlight-icon">
                <Package size={21} />
              </div>

              <div>
                <span>Top Category</span>

                <h4>
                  {analytics.top_category || "N/A"}
                </h4>

                <p>Highest revenue category</p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default AdvancedRevenueAnalytics;