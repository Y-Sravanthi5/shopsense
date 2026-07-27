import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../services/api";

import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import {
  IndianRupee,
  Trophy,
  TrendingUp,
  TrendingDown,
  Minus,
  PackageCheck,
  ReceiptText,
  Users,
  Target,
  BarChart3,
  RefreshCw,
  TriangleAlert,
  Medal,
} from "lucide-react";

import "../../styles/marketplaceBenchmark.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function MarketplaceBenchmark() {
  const [data, setData] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* =========================================================
     LOAD MARKETPLACE BENCHMARK
  ========================================================= */

  const loadBenchmark = async () => {
    const vendorId =
      localStorage.getItem(
        "vendor_id"
      );

    if (!vendorId) {
      setError(
        "Vendor session not found. Please login again."
      );

      setLoading(false);

      return;
    }

    try {
      setLoading(true);

      setError("");

      const res =
        await API.get(
          `/vendor/marketplace-benchmark/${vendorId}`
        );

      if (res.data?.error) {
        setError(
          res.data.error
        );

        setData(null);

        return;
      }

      setData(res.data);
    } catch (err) {
      console.error(
        "Marketplace Benchmark Error:",
        err
      );

      setError(
        "Unable to load marketplace benchmark."
      );

      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBenchmark();
  }, []);

  /* =========================================================
     FORMATTERS
  ========================================================= */

  const money = (value) =>
    Number(
      value || 0
    ).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );

  const number = (value) =>
    Number(
      value || 0
    ).toLocaleString(
      "en-IN"
    );

  const compactMoney = (
    value
  ) => {
    const amount =
      Number(value || 0);

    if (
      amount >=
      10000000
    ) {
      return `₹${(
        amount / 10000000
      ).toFixed(1)}Cr`;
    }

    if (
      amount >= 100000
    ) {
      return `₹${(
        amount / 100000
      ).toFixed(1)}L`;
    }

    if (
      amount >= 1000
    ) {
      return `₹${(
        amount / 1000
      ).toFixed(1)}K`;
    }

    return `₹${amount}`;
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <DashboardLayout>

        <div className="benchmark-state">

          <RefreshCw
            size={29}
            className="benchmark-spin"
          />

          <h3>
            Loading Marketplace
            Benchmark...
          </h3>

          <p>
            Comparing your
            performance with the
            marketplace.
          </p>

        </div>

      </DashboardLayout>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (
    error ||
    !data
  ) {
    return (
      <DashboardLayout>

        <div className="benchmark-state">

          <TriangleAlert
            size={31}
          />

          <h3>
            Marketplace Benchmark
            Unavailable
          </h3>

          <p>
            {error ||
              "Unable to load marketplace benchmark."}
          </p>

          <button
            type="button"
            onClick={
              loadBenchmark
            }
            className="benchmark-retry"
          >
            Try Again
          </button>

        </div>

      </DashboardLayout>
    );
  }

  /* =========================================================
     VALUES
  ========================================================= */

  const performance =
    Number(
      data.performance_percentage ||
        0
    );

  const marketShare =
    Number(
      data.market_share_percentage ||
        0
    );

  const vendorRevenue =
    Number(
      data.vendor_revenue || 0
    );

  const averageRevenue =
    Number(
      data.marketplace_average_revenue ||
        0
    );

  const vendorUnits =
    Number(
      data.vendor_units_sold ||
        0
    );

  const averageUnits =
    Number(
      data.marketplace_average_units ||
        0
    );

  const vendorTransactions =
    Number(
      data.vendor_transactions ||
        0
    );

  const averageTransactions =
    Number(
      data.marketplace_average_transactions ||
        0
    );

  /* =========================================================
     PERFORMANCE
  ========================================================= */

  const PerformanceIcon =
    performance > 0
      ? TrendingUp
      : performance < 0
      ? TrendingDown
      : Minus;

  const performanceClass =
    performance > 0
      ? "positive"
      : performance < 0
      ? "negative"
      : "neutral";

  /* =========================================================
     REVENUE CHART
  ========================================================= */

  const revenueComparison = {
    labels: [
      "Your Revenue",
      "Marketplace Avg.",
    ],

    datasets: [
      {
        data: [
          vendorRevenue,
          averageRevenue,
        ],

        backgroundColor: [
          "#7657E8",
          "#DDD8EB",
        ],

        borderRadius: 8,

        borderSkipped: false,

        maxBarThickness: 65,
      },
    ],
  };

  /* =========================================================
     UNITS CHART
  ========================================================= */

  const unitsComparison = {
    labels: [
      "Your Units",
      "Marketplace Avg.",
    ],

    datasets: [
      {
        data: [
          vendorUnits,
          averageUnits,
        ],

        backgroundColor: [
          "#7657E8",
          "#DDD8EB",
        ],

        borderRadius: 8,

        borderSkipped: false,

        maxBarThickness: 65,
      },
    ],
  };

  /* =========================================================
     CHART OPTIONS
  ========================================================= */

  const revenueOptions = {
    responsive: true,

    maintainAspectRatio:
      false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        backgroundColor:
          "#252333",

        titleColor:
          "#FFFFFF",

        bodyColor:
          "#FFFFFF",

        padding: 11,

        cornerRadius: 8,

        displayColors: false,

        callbacks: {
          label: (
            context
          ) =>
            `Revenue: ₹${money(
              context.parsed.y
            )}`,
        },
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        border: {
          display: false,
        },

        ticks: {
          color: "#777487",

          font: {
            size: 11,
          },
        },
      },

      y: {
        beginAtZero: true,

        border: {
          display: false,
        },

        grid: {
          color:
            "rgba(118,87,232,0.08)",
        },

        ticks: {
          color: "#8C8998",

          font: {
            size: 10,
          },

          callback: (
            value
          ) =>
            compactMoney(
              value
            ),
        },
      },
    },
  };

  const unitsOptions = {
    responsive: true,

    maintainAspectRatio:
      false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        backgroundColor:
          "#252333",

        titleColor:
          "#FFFFFF",

        bodyColor:
          "#FFFFFF",

        padding: 11,

        cornerRadius: 8,

        displayColors: false,

        callbacks: {
          label: (
            context
          ) =>
            `Units: ${number(
              context.parsed.y
            )}`,
        },
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        border: {
          display: false,
        },

        ticks: {
          color: "#777487",

          font: {
            size: 11,
          },
        },
      },

      y: {
        beginAtZero: true,

        border: {
          display: false,
        },

        grid: {
          color:
            "rgba(118,87,232,0.08)",
        },

        ticks: {
          color: "#8C8998",

          font: {
            size: 10,
          },

          precision: 0,
        },
      },
    },
  };

  return (
    <DashboardLayout>

      <div className="benchmark-page">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="benchmark-header">

          <div>

            <p className="benchmark-eyebrow">
              MARKETPLACE INSIGHTS
            </p>

            <h1>
              Marketplace Benchmark
            </h1>

            <p className="benchmark-subtitle">
              Compare your business
              performance with other
              approved ShopSense
              vendors.
            </p>

          </div>

          <button
            type="button"
            className="benchmark-refresh"
            onClick={
              loadBenchmark
            }
          >

            <RefreshCw
              size={17}
            />

            Refresh

          </button>

        </div>

        {/* =====================================================
            KPI CARDS
        ===================================================== */}

        <div className="benchmark-kpi-grid">

          {/* REVENUE */}

          <div className="benchmark-kpi-card">

            <div className="benchmark-kpi-icon violet">

              <IndianRupee
                size={21}
              />

            </div>

            <div>

              <span>
                Your Revenue
              </span>

              <h2>
                ₹
                {money(
                  vendorRevenue
                )}
              </h2>

              <p>
                Marketplace avg. ₹
                {money(
                  averageRevenue
                )}
              </p>

            </div>

          </div>

          {/* PERFORMANCE */}

          <div className="benchmark-kpi-card">

            <div
              className={`benchmark-kpi-icon ${performanceClass}`}
            >

              <PerformanceIcon
                size={21}
              />

            </div>

            <div>

              <span>
                Performance
              </span>

              <h2
                className={`benchmark-performance ${performanceClass}`}
              >

                {performance >
                0
                  ? "+"
                  : ""}

                {performance.toFixed(
                  2
                )}
                %

              </h2>

              <p>
                Compared with
                marketplace average
              </p>

            </div>

          </div>

          {/* MARKET SHARE */}

          <div className="benchmark-kpi-card">

            <div className="benchmark-kpi-icon blue">

              <Target
                size={21}
              />

            </div>

            <div className="benchmark-share-content">

              <span>
                Market Share
              </span>

              <h2>
                {marketShare.toFixed(
                  2
                )}
                %
              </h2>

              <div className="benchmark-mini-progress">

                <div
                  style={{
                    width: `${Math.min(
                      Math.max(
                        marketShare,
                        0
                      ),
                      100
                    )}%`,
                  }}
                />

              </div>

            </div>

          </div>

          {/* RANK */}

          <div className="benchmark-kpi-card rank">

            <div className="benchmark-kpi-icon amber">

              <Trophy
                size={21}
              />

            </div>

            <div>

              <span>
                Revenue Rank
              </span>

              <h2>

                #
                {data.revenue_rank ||
                  "—"}

                <small>
                  {" "}
                  of{" "}
                  {data.total_vendors ||
                    0}
                </small>

              </h2>

              <p>
                Marketplace position
              </p>

            </div>

          </div>

        </div>

        {/* =====================================================
            COMPARISON STRIP
        ===================================================== */}

        <div className="benchmark-comparison-strip">

          <div className="benchmark-strip-title">

            <div className="benchmark-strip-icon">

              <BarChart3
                size={20}
              />

            </div>

            <div>

              <h3>
                Your Performance
              </h3>

              <p>
                You vs marketplace
                average
              </p>

            </div>

          </div>

          {/* UNITS */}

          <div className="benchmark-strip-stat">

            <span>
              Units Sold
            </span>

            <strong>
              {number(
                vendorUnits
              )}
            </strong>

            <small>
              Avg.{" "}
              {Number(
                averageUnits
              ).toFixed(2)}
            </small>

          </div>

          <div className="benchmark-strip-divider" />

          {/* TRANSACTIONS */}

          <div className="benchmark-strip-stat">

            <span>
              Transactions
            </span>

            <strong>
              {number(
                vendorTransactions
              )}
            </strong>

            <small>
              Avg.{" "}
              {Number(
                averageTransactions
              ).toFixed(2)}
            </small>

          </div>

          <div className="benchmark-strip-divider" />

          {/* VENDORS */}

          <div className="benchmark-strip-stat">

            <span>
              Vendors
            </span>

            <strong>
              {number(
                data.total_vendors
              )}
            </strong>

            <small>
              Approved vendors
            </small>

          </div>

        </div>

        {/* =====================================================
            CHARTS
        ===================================================== */}

        <div className="benchmark-chart-grid">

          {/* REVENUE */}

          <div className="benchmark-chart-card">

            <div className="benchmark-chart-header">

              <div>

                <h3>
                  Revenue Comparison
                </h3>

                <p>
                  Your revenue compared
                  with the marketplace
                  average.
                </p>

              </div>

              <div className="benchmark-chart-icon">

                <IndianRupee
                  size={19}
                />

              </div>

            </div>

            <div className="benchmark-chart-area">

              <Bar
                data={
                  revenueComparison
                }
                options={
                  revenueOptions
                }
              />

            </div>

          </div>

          {/* UNITS */}

          <div className="benchmark-chart-card">

            <div className="benchmark-chart-header">

              <div>

                <h3>
                  Sales Volume
                </h3>

                <p>
                  Compare units sold
                  against the marketplace
                  average.
                </p>

              </div>

              <div className="benchmark-chart-icon">

                <PackageCheck
                  size={19}
                />

              </div>

            </div>

            <div className="benchmark-chart-area">

              <Bar
                data={
                  unitsComparison
                }
                options={
                  unitsOptions
                }
              />

            </div>

          </div>

        </div>

        {/* =====================================================
            LEADERBOARD
        ===================================================== */}

        <div className="benchmark-leaderboard">

          <div className="benchmark-leaderboard-header">

            <div>

              <h3>
                Marketplace Leaderboard
              </h3>

              <p>
                Revenue ranking across
                approved ShopSense
                vendors.
              </p>

            </div>

            <div className="benchmark-leaderboard-badge">

              <Users
                size={15}
              />

              {data.total_vendors ||
                0}{" "}
              Vendors

            </div>

          </div>

          <div className="benchmark-table-wrapper">

            <table className="benchmark-table">

              <thead>

                <tr>

                  <th>
                    Rank
                  </th>

                  <th>
                    Vendor
                  </th>

                  <th>
                    Revenue
                  </th>

                  <th>
                    Units Sold
                  </th>

                  <th>
                    Position
                  </th>

                </tr>

              </thead>

              <tbody>

                {(data.leaderboard ||
                  []).length >
                0 ? (

                  data.leaderboard.map(
                    (
                      vendor
                    ) => {

                      const isYou =
                        Number(
                          vendor.vendor_id
                        ) ===
                        Number(
                          data.vendor_id
                        );

                      return (

                        <tr
                          key={
                            vendor.vendor_id
                          }
                          className={
                            isYou
                              ? "benchmark-you-row"
                              : ""
                          }
                        >

                          <td>

                            <div
                              className={`benchmark-rank ${
                                Number(
                                  vendor.rank
                                ) <=
                                3
                                  ? "top"
                                  : ""
                              }`}
                            >

                              {Number(
                                vendor.rank
                              ) <=
                              3 && (

                                <Medal
                                  size={14}
                                />

                              )}

                              #
                              {
                                vendor.rank
                              }

                            </div>

                          </td>

                          <td>

                            <div className="benchmark-vendor-name">

                              <strong>
                                {
                                  vendor.business_name
                                }
                              </strong>

                              {isYou && (

                                <span>
                                  You
                                </span>

                              )}

                            </div>

                          </td>

                          <td>

                            <strong className="benchmark-revenue-value">

                              ₹
                              {money(
                                vendor.revenue
                              )}

                            </strong>

                          </td>

                          <td>

                            {number(
                              vendor.units_sold
                            )}

                          </td>

                          <td>

                            {Number(
                              vendor.rank
                            ) ===
                            1 ? (

                              <span className="benchmark-position first">
                                Leader
                              </span>

                            ) : Number(
                                vendor.rank
                              ) <=
                              3 ? (

                              <span className="benchmark-position top">
                                Top 3
                              </span>

                            ) : (

                              <span className="benchmark-position">
                                Ranked
                              </span>

                            )}

                          </td>

                        </tr>

                      );
                    }
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="5"
                      className="benchmark-no-data"
                    >
                      No leaderboard
                      data available.
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default MarketplaceBenchmark;