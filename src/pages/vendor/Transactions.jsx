import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../services/api";

function Transactions() {

  const vendorId = localStorage.getItem("vendor_id");

  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [sale, setSale] = useState({
    vendor_id: Number(vendorId),
    product_id: "",
    quantity: ""
  });

  useEffect(() => {
    loadProducts();
    loadTransactions();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await API.get(`/vendor/products/${vendorId}`);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadTransactions = async () => {
    try {
      const res = await API.get(`/vendor/transactions/${vendorId}`);
      setTransactions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setSale({
      ...sale,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/transactions", sale);

      alert("Sale Recorded Successfully!");

      setSale({
        vendor_id: Number(vendorId),
        product_id: "",
        quantity: ""
      });

      loadTransactions();
      loadProducts();

    } catch (err) {

      console.log(err);

      alert("Transaction Failed");

    }

  };

  return (

    <DashboardLayout>

      <h2 className="fw-bold mb-4">
        💳 Sales Transactions
      </h2>

      {/* Create Sale */}

      <div className="card shadow border-0 mb-5">

        <div className="card-body">

          <h4 className="mb-4">
            Create Sale
          </h4>

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-5">

                <select
                  className="form-select"
                  name="product_id"
                  value={sale.product_id}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Product
                  </option>

                  {products.map((p) => (

                    <option
                      key={p.id}
                      value={p.id}
                    >
                      {p.product_name}
                    </option>

                  ))}

                </select>

              </div>

              <div className="col-md-3">

                <input
                  type="number"
                  className="form-control"
                  placeholder="Quantity"
                  name="quantity"
                  value={sale.quantity}
                  onChange={handleChange}
                  min="1"
                  required
                />

              </div>

              <div className="col-md-4">

                <button
                  className="btn btn-success w-100"
                  type="submit"
                >
                  Sell Product
                </button>

              </div>

            </div>

          </form>

        </div>

      </div>

      {/* Transaction History */}

      <div className="card shadow border-0">

        <div className="card-body">

          <h4 className="mb-4">
            Transaction History
          </h4>

          <table className="table table-hover">

            <thead>

              <tr>

                <th>ID</th>
                <th>Product ID</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
                <th>Date</th>

              </tr>

            </thead>

            <tbody>

              {transactions.length > 0 ? (

                transactions.map((t) => (

                  <tr key={t.id}>

                    <td>{t.id}</td>

                    <td>{t.product_id}</td>

                    <td>{t.quantity}</td>

                    <td>₹ {t.unit_price}</td>

                    <td>₹ {t.total_amount}</td>

                    <td>
                      {new Date(
                        t.transaction_date
                      ).toLocaleString()}
                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td colSpan="6" className="text-center">
                    No transactions found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </DashboardLayout>

  );

}

export default Transactions;