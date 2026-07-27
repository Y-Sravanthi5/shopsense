import { useEffect, useMemo, useState } from "react";

import {
  CreditCard,
  ShoppingCart,
  Package,
  Boxes,
  IndianRupee,
  ReceiptText,
  Search,
  RefreshCw,
  CalendarDays,
  CircleCheck,
  TriangleAlert,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../services/api";

function Transactions() {
  const vendorId = localStorage.getItem("vendor_id");

  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [sale, setSale] = useState({
    vendor_id: Number(vendorId),
    product_id: "",
    quantity: "",
  });

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  /* =========================================================
     LOAD DATA
  ========================================================= */

  const loadProducts = async () => {
    try {
      const res = await API.get(
        `/vendor/products/${vendorId}`
      );

      setProducts(
        Array.isArray(res.data) ? res.data : []
      );
    } catch (err) {
      console.error("Product loading error:", err);
    }
  };

  const loadTransactions = async () => {
    try {
      const res = await API.get(
        `/vendor/transactions/${vendorId}`
      );

      setTransactions(
        Array.isArray(res.data) ? res.data : []
      );
    } catch (err) {
      console.error("Transaction loading error:", err);

      setError("Unable to load transactions.");
    }
  };

  const loadPageData = async () => {
    if (!vendorId) {
      setError("Vendor session not found.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      await Promise.all([
        loadProducts(),
        loadTransactions(),
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPageData();
  }, []);

  /* =========================================================
     SELECTED PRODUCT
  ========================================================= */

  const selectedProduct = useMemo(() => {
    return products.find(
      (product) =>
        String(product.id) ===
        String(sale.product_id)
    );
  }, [products, sale.product_id]);

  const selectedPrice =
    Number(selectedProduct?.price || 0);

  const selectedStock =
    Number(selectedProduct?.stock || 0);

  const selectedQuantity =
    Number(sale.quantity || 0);

  const calculatedTotal =
    selectedPrice * selectedQuantity;

  /* =========================================================
     HANDLE FORM
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSale((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =========================================================
     RECORD SALE
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sale.product_id) {
      alert("Please select a product.");
      return;
    }

    if (
      !sale.quantity ||
      Number(sale.quantity) <= 0
    ) {
      alert("Please enter a valid quantity.");
      return;
    }

    if (
      Number(sale.quantity) >
      selectedStock
    ) {
      alert(
        `Only ${selectedStock} units are available in stock.`
      );
      return;
    }

    try {
      setSubmitting(true);

      await API.post("/transactions", {
        vendor_id: Number(vendorId),
        product_id: Number(sale.product_id),
        quantity: Number(sale.quantity),
      });

      alert("Sale Recorded Successfully!");

      setSale({
        vendor_id: Number(vendorId),
        product_id: "",
        quantity: "",
      });

      await Promise.all([
        loadTransactions(),
        loadProducts(),
      ]);
    } catch (err) {
      console.error(
        "Transaction error:",
        err
      );

      alert(
        err.response?.data?.detail ||
          "Transaction Failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* =========================================================
     ANALYTICS
  ========================================================= */

  const totalTransactions =
    transactions.length;

  const totalUnitsSold =
    transactions.reduce(
      (sum, transaction) =>
        sum +
        Number(transaction.quantity || 0),
      0
    );

  const totalRevenue =
    transactions.reduce(
      (sum, transaction) =>
        sum +
        Number(
          transaction.total_amount || 0
        ),
      0
    );

  const averageTransaction =
    totalTransactions > 0
      ? totalRevenue / totalTransactions
      : 0;

  /* =========================================================
     PRODUCT NAME
  ========================================================= */

  const getProductName = (productId) => {
    const product = products.find(
      (item) =>
        String(item.id) ===
        String(productId)
    );

    return product
      ? product.product_name
      : `Product #${productId}`;
  };

  /* =========================================================
     SEARCH
  ========================================================= */

  const filteredTransactions =
    useMemo(() => {
      const value =
        search.trim().toLowerCase();

      if (!value) {
        return transactions;
      }

      return transactions.filter(
        (transaction) => {
          const productName =
            getProductName(
              transaction.product_id
            ).toLowerCase();

          return (
            productName.includes(value) ||
            String(transaction.id).includes(
              value
            ) ||
            String(
              transaction.product_id
            ).includes(value)
          );
        }
      );
    }, [transactions, products, search]);

  /* =========================================================
     FORMATTERS
  ========================================================= */

  const formatCurrency = (value) =>
    Number(value || 0).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );

  const formatNumber = (value) =>
    Number(value || 0).toLocaleString(
      "en-IN"
    );

  const formatDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }

    return parsedDate.toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  return (
    <DashboardLayout>

      <div className="transactions-page">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="transactions-header">

          <div>

            <div className="transactions-eyebrow">
              STORE MANAGEMENT
            </div>

            <h1>Transactions</h1>

            <p>
              Record sales and track your
              transaction history.
            </p>

          </div>

          <button
            type="button"
            className="transactions-refresh"
            onClick={loadPageData}
            disabled={loading}
          >
            <RefreshCw
              size={17}
              className={
                loading
                  ? "transactions-spin"
                  : ""
              }
            />

            Refresh
          </button>

        </header>

        {/* =====================================================
            SUMMARY CARDS
        ===================================================== */}

        <section className="transactions-summary-grid">

          <article className="transactions-summary-card">

            <div className="transactions-summary-icon violet">
              <ReceiptText size={21} />
            </div>

            <div>
              <span>Total Transactions</span>

              <strong>
                {formatNumber(
                  totalTransactions
                )}
              </strong>

              <small>
                Recorded sales
              </small>
            </div>

          </article>

          <article className="transactions-summary-card">

            <div className="transactions-summary-icon blue">
              <ShoppingCart size={21} />
            </div>

            <div>
              <span>Units Sold</span>

              <strong>
                {formatNumber(
                  totalUnitsSold
                )}
              </strong>

              <small>
                Total units sold
              </small>
            </div>

          </article>

          <article className="transactions-summary-card">

            <div className="transactions-summary-icon green">
              <IndianRupee size={21} />
            </div>

            <div>
              <span>Total Revenue</span>

              <strong>
                ₹{formatCurrency(totalRevenue)}
              </strong>

              <small>
                Revenue from sales
              </small>
            </div>

          </article>

          <article className="transactions-summary-card">

            <div className="transactions-summary-icon amber">
              <CreditCard size={21} />
            </div>

            <div>
              <span>Average Sale</span>

              <strong>
                ₹
                {formatCurrency(
                  averageTransaction
                )}
              </strong>

              <small>
                Per transaction
              </small>
            </div>

          </article>

        </section>

        {/* =====================================================
            CREATE SALE
        ===================================================== */}

        <section className="transactions-sale-panel">

          <div className="transactions-panel-header">

            <div className="transactions-panel-heading">

              <div className="transactions-panel-icon">
                <ShoppingCart size={20} />
              </div>

              <div>
                <h2>Record a Sale</h2>

                <p>
                  Select a product and enter the
                  quantity sold.
                </p>
              </div>

            </div>

          </div>

          <form
            onSubmit={handleSubmit}
            className="transactions-sale-form"
          >

            {/* PRODUCT */}

            <div className="transactions-field">

              <label htmlFor="transaction-product">
                Product
              </label>

              <div className="transactions-input">

                <Package size={17} />

                <select
                  id="transaction-product"
                  name="product_id"
                  value={sale.product_id}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select a product
                  </option>

                  {products.map((product) => (

                    <option
                      key={product.id}
                      value={product.id}
                      disabled={
                        Number(product.stock) === 0
                      }
                    >
                      {product.product_name}
                      {" — "}
                      {product.stock} in stock
                    </option>

                  ))}

                </select>

              </div>

            </div>

            {/* QUANTITY */}

            <div className="transactions-field">

              <label htmlFor="transaction-quantity">
                Quantity
              </label>

              <div className="transactions-input">

                <Boxes size={17} />

                <input
                  id="transaction-quantity"
                  type="number"
                  name="quantity"
                  min="1"
                  max={
                    selectedProduct
                      ? selectedStock
                      : undefined
                  }
                  placeholder="Enter quantity"
                  value={sale.quantity}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* SALE BUTTON */}

            <button
              type="submit"
              className="transactions-sell-button"
              disabled={
                submitting ||
                !selectedProduct ||
                selectedStock === 0
              }
            >

              {submitting ? (
                <>
                  <RefreshCw
                    size={17}
                    className="transactions-spin"
                  />

                  Recording...
                </>
              ) : (
                <>
                  <CircleCheck size={17} />

                  Record Sale
                </>
              )}

            </button>

          </form>

          {/* SELECTED PRODUCT PREVIEW */}

          {selectedProduct && (

            <div className="transactions-sale-preview">

              <div>

                <span>Available Stock</span>

                <strong>
                  {formatNumber(
                    selectedStock
                  )}{" "}
                  units
                </strong>

              </div>

              <div>

                <span>Unit Price</span>

                <strong>
                  ₹
                  {formatCurrency(
                    selectedPrice
                  )}
                </strong>

              </div>

              <div>

                <span>Quantity</span>

                <strong>
                  {selectedQuantity || 0}
                </strong>

              </div>

              <div className="transactions-sale-total">

                <span>Sale Total</span>

                <strong>
                  ₹
                  {formatCurrency(
                    calculatedTotal
                  )}
                </strong>

              </div>

            </div>

          )}

        </section>

        {/* =====================================================
            HISTORY
        ===================================================== */}

        <section className="transactions-history">

          <div className="transactions-history-header">

            <div>

              <h2>
                Transaction History
              </h2>

              <p>
                Review all recorded sales.
              </p>

            </div>

            <span className="transactions-count">
              {filteredTransactions.length}{" "}
              transactions
            </span>

          </div>

          {/* SEARCH */}

          <div className="transactions-toolbar">

            <div className="transactions-search">

              <Search size={18} />

              <input
                type="text"
                placeholder="Search transaction or product..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

          </div>

          {/* ERROR */}

          {error && (

            <div className="transactions-error">

              <TriangleAlert size={18} />

              <span>{error}</span>

              <button
                type="button"
                onClick={loadPageData}
              >
                Try Again
              </button>

            </div>

          )}

          {/* TABLE */}

          {loading ? (

            <div className="transactions-loading">

              <RefreshCw
                size={24}
                className="transactions-spin"
              />

              Loading transactions...

            </div>

          ) : filteredTransactions.length > 0 ? (

            <div className="transactions-table-wrapper">

              <table className="transactions-table">

                <thead>

                  <tr>
                    <th>Transaction</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total Amount</th>
                    <th>Date & Time</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredTransactions.map(
                    (transaction) => (

                      <tr key={transaction.id}>

                        <td>

                          <div className="transaction-id">

                            <div>
                              <ReceiptText
                                size={15}
                              />
                            </div>

                            <span>
                              #
                              {transaction.id}
                            </span>

                          </div>

                        </td>

                        <td>

                          <div className="transaction-product-name">

                            <strong>
                              {getProductName(
                                transaction.product_id
                              )}
                            </strong>

                            <span>
                              Product #
                              {
                                transaction.product_id
                              }
                            </span>

                          </div>

                        </td>

                        <td>

                          <span className="transaction-quantity">
                            {formatNumber(
                              transaction.quantity
                            )}{" "}
                            units
                          </span>

                        </td>

                        <td className="transaction-money">

                          ₹
                          {formatCurrency(
                            transaction.unit_price
                          )}

                        </td>

                        <td>

                          <strong className="transaction-total">

                            ₹
                            {formatCurrency(
                              transaction.total_amount
                            )}

                          </strong>

                        </td>

                        <td>

                          <div className="transaction-date">

                            <CalendarDays
                              size={14}
                            />

                            {formatDate(
                              transaction.transaction_date
                            )}

                          </div>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          ) : (

            <div className="transactions-empty">

              <div className="transactions-empty-icon">
                <ReceiptText size={29} />
              </div>

              <h3>
                No transactions found
              </h3>

              <p>
                {search
                  ? "Try changing your search."
                  : "Recorded sales will appear here."}
              </p>

            </div>

          )}

        </section>

      </div>

    </DashboardLayout>
  );
}

export default Transactions;