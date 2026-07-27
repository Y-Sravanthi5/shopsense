import { useEffect, useMemo, useState } from "react";

import {
  Package,
  Boxes,
  TriangleAlert,
  PackageX,
  IndianRupee,
  Search,
  SlidersHorizontal,
  RefreshCw,
  Warehouse,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../services/api";

function Inventory() {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================================================
     LOAD INVENTORY
  ========================================================= */

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const vendorId =
        localStorage.getItem("vendor_id");

      if (!vendorId) {
        setError(
          "Vendor session not found. Please login again."
        );

        return;
      }

      const res = await API.get(
        `/vendor/products/${vendorId}`
      );

      setProducts(
        Array.isArray(res.data)
          ? res.data
          : []
      );
    } catch (err) {
      console.error(
        "Inventory loading error:",
        err
      );

      setError(
        "Unable to load inventory."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  /* =========================================================
     INVENTORY ANALYTICS
  ========================================================= */

  const totalProducts =
    products.length;

  const totalStock =
    products.reduce(
      (sum, product) =>
        sum + Number(product.stock || 0),
      0
    );

  const lowStock =
    products.filter((product) => {
      const stock =
        Number(product.stock || 0);

      return stock > 0 && stock < 10;
    }).length;

  const outOfStock =
    products.filter(
      (product) =>
        Number(product.stock || 0) === 0
    ).length;

  const inventoryValue =
    products.reduce(
      (sum, product) =>
        sum +
        Number(product.price || 0) *
          Number(product.stock || 0),
      0
    );

  /* =========================================================
     FILTER INVENTORY
  ========================================================= */

  const filteredProducts =
    useMemo(() => {
      return products.filter(
        (product) => {
          const name =
            product.product_name || "";

          const category =
            product.category || "";

          const stock =
            Number(product.stock || 0);

          const searchValue =
            search
              .trim()
              .toLowerCase();

          const searchMatch =
            name
              .toLowerCase()
              .includes(searchValue) ||
            category
              .toLowerCase()
              .includes(searchValue);

          let statusMatch = true;

          if (status === "Available") {
            statusMatch =
              stock >= 10;
          }

          if (status === "Low Stock") {
            statusMatch =
              stock > 0 &&
              stock < 10;
          }

          if (status === "Out of Stock") {
            statusMatch =
              stock === 0;
          }

          return (
            searchMatch &&
            statusMatch
          );
        }
      );
    }, [products, search, status]);

  /* =========================================================
     STOCK STATUS
  ========================================================= */

  const getStockStatus = (stockValue) => {
    const stock =
      Number(stockValue || 0);

    if (stock === 0) {
      return {
        label: "Out of Stock",
        className: "out",
      };
    }

    if (stock < 10) {
      return {
        label: "Low Stock",
        className: "low",
      };
    }

    return {
      label: "Available",
      className: "available",
    };
  };

  /* =========================================================
     FORMAT NUMBER
  ========================================================= */

  const formatNumber = (number) =>
    Number(number || 0).toLocaleString(
      "en-IN"
    );

  const formatPrice = (number) =>
    Number(number || 0).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <DashboardLayout>

      <div className="inventory-page">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="inventory-header">

          <div>

            <div className="inventory-eyebrow">
              STORE MANAGEMENT
            </div>

            <h1>
              Inventory
            </h1>

            <p>
              Monitor stock levels, inventory
              value and products that need
              restocking.
            </p>

          </div>

          <button
            type="button"
            className="inventory-refresh-button"
            onClick={loadProducts}
            disabled={loading}
          >
            <RefreshCw
              size={17}
              className={
                loading
                  ? "inventory-spin"
                  : ""
              }
            />

            Refresh
          </button>

        </header>

        {/* =====================================================
            SUMMARY CARDS
        ===================================================== */}

        <section className="inventory-summary-grid">

          {/* TOTAL PRODUCTS */}

          <article className="inventory-summary-card">

            <div className="inventory-summary-icon violet">
              <Package size={21} />
            </div>

            <div>
              <span>
                Total Products
              </span>

              <strong>
                {formatNumber(
                  totalProducts
                )}
              </strong>

              <small>
                Products in catalog
              </small>
            </div>

          </article>

          {/* TOTAL STOCK */}

          <article className="inventory-summary-card">

            <div className="inventory-summary-icon green">
              <Boxes size={21} />
            </div>

            <div>
              <span>
                Total Stock
              </span>

              <strong>
                {formatNumber(
                  totalStock
                )}
              </strong>

              <small>
                Units in inventory
              </small>
            </div>

          </article>

          {/* LOW STOCK */}

          <article className="inventory-summary-card">

            <div className="inventory-summary-icon amber">
              <TriangleAlert size={21} />
            </div>

            <div>
              <span>
                Low Stock
              </span>

              <strong>
                {formatNumber(
                  lowStock
                )}
              </strong>

              <small>
                Below 10 units
              </small>
            </div>

          </article>

          {/* OUT OF STOCK */}

          <article className="inventory-summary-card">

            <div className="inventory-summary-icon red">
              <PackageX size={21} />
            </div>

            <div>
              <span>
                Out of Stock
              </span>

              <strong>
                {formatNumber(
                  outOfStock
                )}
              </strong>

              <small>
                Needs restocking
              </small>
            </div>

          </article>

        </section>

        {/* =====================================================
            INVENTORY VALUE
        ===================================================== */}

        <section className="inventory-value-card">

          <div className="inventory-value-left">

            <div className="inventory-value-icon">
              <IndianRupee size={23} />
            </div>

            <div>

              <span>
                TOTAL INVENTORY VALUE
              </span>

              <h2>
                ₹
                {formatPrice(
                  inventoryValue
                )}
              </h2>

              <p>
                Current value of all
                available inventory
              </p>

            </div>

          </div>

          <div className="inventory-value-decoration">
            <Warehouse size={50} />
          </div>

        </section>

        {/* =====================================================
            INVENTORY PANEL
        ===================================================== */}

        <section className="inventory-panel">

          {/* PANEL HEADER */}

          <div className="inventory-panel-header">

            <div>

              <h2>
                Inventory Overview
              </h2>

              <p>
                Track stock availability
                across your products.
              </p>

            </div>

            <span className="inventory-product-count">
              {filteredProducts.length} products
            </span>

          </div>

          {/* ===================================================
              SEARCH + FILTER
          =================================================== */}

          <div className="inventory-toolbar">

            <div className="inventory-search">

              <Search size={18} />

              <input
                type="text"
                placeholder="Search product or category..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="inventory-filter">

              <SlidersHorizontal
                size={17}
              />

              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value
                  )
                }
              >

                <option value="All">
                  All Stock Status
                </option>

                <option value="Available">
                  Available
                </option>

                <option value="Low Stock">
                  Low Stock
                </option>

                <option value="Out of Stock">
                  Out of Stock
                </option>

              </select>

            </div>

          </div>

          {/* ===================================================
              ERROR
          =================================================== */}

          {error && (

            <div className="inventory-error">

              <TriangleAlert
                size={18}
              />

              <span>
                {error}
              </span>

              <button
                type="button"
                onClick={loadProducts}
              >
                Try Again
              </button>

            </div>

          )}

          {/* ===================================================
              TABLE
          =================================================== */}

          {loading ? (

            <div className="inventory-loading">

              <RefreshCw
                size={24}
                className="inventory-spin"
              />

              Loading inventory...

            </div>

          ) : filteredProducts.length > 0 ? (

            <div className="inventory-table-wrapper">

              <table className="inventory-table">

                <thead>

                  <tr>

                    <th>
                      Product
                    </th>

                    <th>
                      Category
                    </th>

                    <th>
                      Price
                    </th>

                    <th>
                      Stock
                    </th>

                    <th>
                      Reorder Level
                    </th>

                    <th>
                      Inventory Value
                    </th>

                    <th>
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredProducts.map(
                    (product) => {

                      const stock =
                        Number(
                          product.stock || 0
                        );

                      const price =
                        Number(
                          product.price || 0
                        );

                      const productValue =
                        stock * price;

                      const stockStatus =
                        getStockStatus(
                          stock
                        );

                      return (

                        <tr
                          key={product.id}
                        >

                          {/* PRODUCT */}

                          <td>

                            <div className="inventory-product">

                              <div className="inventory-product-image">

                                {product.image ? (

                                  <img
                                    src={`http://127.0.0.1:8000/uploads/${product.image}`}
                                    alt={
                                      product.product_name
                                    }
                                    onError={(e) => {
                                      e.currentTarget.style.display =
                                        "none";
                                    }}
                                  />

                                ) : (

                                  <Package
                                    size={18}
                                  />

                                )}

                              </div>

                              <div>

                                <strong>
                                  {
                                    product.product_name
                                  }
                                </strong>

                                <span>
                                  Product #{product.id}
                                </span>

                              </div>

                            </div>

                          </td>

                          {/* CATEGORY */}

                          <td>

                            <span className="inventory-category">
                              {product.category ||
                                "Uncategorized"}
                            </span>

                          </td>

                          {/* PRICE */}

                          <td className="inventory-money">
                            ₹
                            {formatPrice(
                              price
                            )}
                          </td>

                          {/* STOCK */}

                          <td>

                            <strong className="inventory-stock-number">
                              {formatNumber(
                                stock
                              )}
                            </strong>

                          </td>

                          {/* REORDER */}

                          <td>

                            <span className="inventory-reorder">
                              10 units
                            </span>

                          </td>

                          {/* VALUE */}

                          <td className="inventory-money">
                            ₹
                            {formatPrice(
                              productValue
                            )}
                          </td>

                          {/* STATUS */}

                          <td>

                            <span
                              className={`inventory-status ${stockStatus.className}`}
                            >
                              <i />

                              {
                                stockStatus.label
                              }
                            </span>

                          </td>

                        </tr>

                      );
                    }
                  )}

                </tbody>

              </table>

            </div>

          ) : (

            <div className="inventory-empty">

              <div className="inventory-empty-icon">
                <Package size={28} />
              </div>

              <h3>
                No inventory found
              </h3>

              <p>
                {search ||
                status !== "All"
                  ? "Try changing your search or stock filter."
                  : "Products will appear here once they are added to your catalog."}
              </p>

            </div>

          )}

        </section>

      </div>

    </DashboardLayout>
  );
}

export default Inventory;