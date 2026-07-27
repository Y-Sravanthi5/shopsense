import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Plus,
  Search,
  SlidersHorizontal,
  Package,
  Pencil,
  Trash2,
  Boxes,
  TriangleAlert,
  PackageX,
  RefreshCw,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../services/api";

function ProductList() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================================================
     LOAD PRODUCTS
  ========================================================= */

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const vendorId = localStorage.getItem("vendor_id");

      if (!vendorId) {
        setError("Vendor session not found.");
        return;
      }

      const res = await API.get(
        `/vendor/products/${vendorId}`
      );

      setProducts(
        Array.isArray(res.data) ? res.data : []
      );
    } catch (err) {
      console.error("Product load error:", err);

      setError(
        "Unable to load products. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  /* =========================================================
     DELETE PRODUCT
  ========================================================= */

  const deleteProduct = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      await API.delete(`/products/${id}`);

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product.id !== id
        )
      );
    } catch (err) {
      console.error("Delete product error:", err);

      alert("Unable to delete product.");
    }
  };

  /* =========================================================
     CATEGORIES
  ========================================================= */

  const categories = useMemo(() => {
    const productCategories = products
      .map((product) => product.category)
      .filter(Boolean);

    return [
      "All",
      ...new Set(productCategories),
    ];
  }, [products]);

  /* =========================================================
     FILTER PRODUCTS
  ========================================================= */

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const productName =
        product.product_name || "";

      const productCategory =
        product.category || "";

      const productStock =
        Number(product.stock) || 0;

      const searchMatch = productName
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const categoryMatch =
        category === "All" ||
        productCategory === category;

      let statusMatch = true;

      if (status === "In Stock") {
        statusMatch = productStock >= 10;
      } else if (status === "Low Stock") {
        statusMatch =
          productStock > 0 &&
          productStock < 10;
      } else if (status === "Out of Stock") {
        statusMatch = productStock === 0;
      }

      return (
        searchMatch &&
        categoryMatch &&
        statusMatch
      );
    });
  }, [products, search, category, status]);

  /* =========================================================
     PRODUCT COUNTS
  ========================================================= */

  const totalProducts = products.length;

  const inStockProducts = products.filter(
    (product) => Number(product.stock) >= 10
  ).length;

  const lowStockProducts = products.filter(
    (product) =>
      Number(product.stock) > 0 &&
      Number(product.stock) < 10
  ).length;

  const outOfStockProducts = products.filter(
    (product) => Number(product.stock) === 0
  ).length;

  /* =========================================================
     PRICE FORMATTER
  ========================================================= */

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString(
      "en-IN",
      {
        maximumFractionDigits: 2,
      }
    );
  };

  /* =========================================================
     STOCK STATUS
  ========================================================= */

  const getStockStatus = (stock) => {
    const quantity = Number(stock) || 0;

    if (quantity === 0) {
      return {
        label: "Out of Stock",
        className: "out",
      };
    }

    if (quantity < 10) {
      return {
        label: `Low Stock · ${quantity}`,
        className: "low",
      };
    }

    return {
      label: `In Stock · ${quantity}`,
      className: "available",
    };
  };

  return (
    <DashboardLayout>

      <div className="products-page">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <header className="products-page-header">

          <div>
            <div className="products-eyebrow">
              STORE MANAGEMENT
            </div>

            <h1>Products</h1>

            <p>
              Manage your product catalog, pricing
              and inventory from one place.
            </p>
          </div>

          <button
            type="button"
            className="products-add-button"
            onClick={() =>
              navigate("/vendor/add-product")
            }
          >
            <Plus size={18} />

            <span>Add Product</span>
          </button>

        </header>

        {/* =====================================================
            SUMMARY CARDS
        ===================================================== */}

        <section className="products-summary-grid">

          <div className="products-summary-card">

            <div className="products-summary-icon violet">
              <Package size={20} />
            </div>

            <div>
              <span>Total Products</span>
              <strong>{totalProducts}</strong>
            </div>

          </div>

          <div className="products-summary-card">

            <div className="products-summary-icon green">
              <Boxes size={20} />
            </div>

            <div>
              <span>In Stock</span>
              <strong>{inStockProducts}</strong>
            </div>

          </div>

          <div className="products-summary-card">

            <div className="products-summary-icon amber">
              <TriangleAlert size={20} />
            </div>

            <div>
              <span>Low Stock</span>
              <strong>{lowStockProducts}</strong>
            </div>

          </div>

          <div className="products-summary-card">

            <div className="products-summary-icon red">
              <PackageX size={20} />
            </div>

            <div>
              <span>Out of Stock</span>
              <strong>{outOfStockProducts}</strong>
            </div>

          </div>

        </section>

        {/* =====================================================
            SEARCH / FILTER BAR
        ===================================================== */}

        <section className="products-toolbar">

          <div className="products-search">

            <Search size={18} />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <div className="products-filter">

            <SlidersHorizontal size={17} />

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              {categories.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                >
                  {cat === "All"
                    ? "All Categories"
                    : cat}
                </option>
              ))}
            </select>

          </div>

          <div className="products-filter">

            <Boxes size={17} />

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >
              <option value="All">
                All Status
              </option>

              <option value="In Stock">
                In Stock
              </option>

              <option value="Low Stock">
                Low Stock
              </option>

              <option value="Out of Stock">
                Out of Stock
              </option>

            </select>

          </div>

          <button
            type="button"
            className="products-refresh"
            onClick={loadProducts}
            title="Refresh products"
          >
            <RefreshCw size={18} />
          </button>

        </section>

        {/* =====================================================
            RESULTS INFORMATION
        ===================================================== */}

        {!loading && !error && (

          <div className="products-results-row">

            <p>
              Showing{" "}
              <strong>
                {filteredProducts.length}
              </strong>{" "}
              of{" "}
              <strong>
                {products.length}
              </strong>{" "}
              products
            </p>

          </div>

        )}

        {/* =====================================================
            ERROR
        ===================================================== */}

        {error && (

          <div className="products-error">

            <TriangleAlert size={18} />

            <span>{error}</span>

            <button
              type="button"
              onClick={loadProducts}
            >
              Try again
            </button>

          </div>

        )}

        {/* =====================================================
            LOADING
        ===================================================== */}

        {loading ? (

          <div className="products-loading">

            <RefreshCw
              size={25}
              className="products-loading-icon"
            />

            <span>Loading products...</span>

          </div>

        ) : filteredProducts.length > 0 ? (

          /* ===================================================
             PRODUCT GRID
          =================================================== */

          <section className="products-grid">

            {filteredProducts.map((product) => {

              const stockStatus =
                getStockStatus(product.stock);

              return (

                <article
                  className="product-card"
                  key={product.id}
                >

                  {/* IMAGE */}

                  <div className="product-image-wrapper">

                    <img
                      src={`http://127.0.0.1:8000/uploads/${product.image}`}
                      alt={product.product_name}
                      className="product-image"
                      onError={(e) => {
                        e.currentTarget.style.display =
                          "none";

                        e.currentTarget
                          .nextElementSibling
                          ?.classList.add("show");
                      }}
                    />

                    <div className="product-image-fallback">
                      <Package size={40} />

                      <span>
                        No image available
                      </span>
                    </div>

                    <span className="product-category">
                      {product.category ||
                        "Uncategorized"}
                    </span>

                  </div>

                  {/* CONTENT */}

                  <div className="product-card-content">

                    <div className="product-card-heading">

                      <div>

                        <h3>
                          {product.product_name}
                        </h3>

                        <span
                          className={`product-stock-status ${stockStatus.className}`}
                        >
                          {stockStatus.label}
                        </span>

                      </div>

                      <strong className="product-price">
                        ₹{formatPrice(product.price)}
                      </strong>

                    </div>

                    <p className="product-description">
                      {product.description ||
                        "No description available for this product."}
                    </p>

                  </div>

                  {/* ACTIONS */}

                  <div className="product-card-actions">

                    <button
                      type="button"
                      className="product-edit-button"
                      onClick={() =>
                        navigate(
                          `/vendor/edit-product/${product.id}`
                        )
                      }
                    >
                      <Pencil size={16} />
                      Edit
                    </button>

                    <button
                      type="button"
                      className="product-delete-button"
                      onClick={() =>
                        deleteProduct(product.id)
                      }
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>

                  </div>

                </article>

              );
            })}

          </section>

        ) : (

          /* ===================================================
             EMPTY STATE
          =================================================== */

          <div className="products-empty">

            <div className="products-empty-icon">
              <Package size={30} />
            </div>

            <h3>No products found</h3>

            <p>
              {search ||
              category !== "All" ||
              status !== "All"
                ? "Try changing your search or filters."
                : "Add your first product to start building your catalog."}
            </p>

            {!search &&
              category === "All" &&
              status === "All" && (

                <button
                  type="button"
                  className="products-add-button"
                  onClick={() =>
                    navigate(
                      "/vendor/add-product"
                    )
                  }
                >
                  <Plus size={17} />

                  Add Product
                </button>

              )}

          </div>

        )}

      </div>

    </DashboardLayout>
  );
}

export default ProductList;