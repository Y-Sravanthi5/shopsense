import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../services/api";

function Inventory() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    const vendorId = localStorage.getItem("vendor_id");

    API.get(`/vendor/products/${vendorId}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  // Inventory Analytics

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (sum, product) => sum + Number(product.stock),
    0
  );

  const lowStock = products.filter(
    (product) => product.stock > 0 && product.stock < 10
  ).length;

  const outOfStock = products.filter(
    (product) => product.stock === 0
  ).length;

  const inventoryValue = products.reduce(
    (sum, product) =>
      sum + Number(product.price) * Number(product.stock),
    0
  );

  return (

    <DashboardLayout>

      <div className="container-fluid">

        <h2 className="mb-4 fw-bold">
          📦 Inventory Management
        </h2>

        {/* Analytics Cards */}

        <div className="row g-4 mb-4">

          <div className="col-lg-3 col-md-6">

            <div className="card shadow border-0 text-center p-4">

              <h6>Total Products</h6>

              <h2 className="text-primary">
                {totalProducts}
              </h2>

            </div>

          </div>

          <div className="col-lg-3 col-md-6">

            <div className="card shadow border-0 text-center p-4">

              <h6>Total Stock</h6>

              <h2 className="text-success">
                {totalStock}
              </h2>

            </div>

          </div>

          <div className="col-lg-3 col-md-6">

            <div className="card shadow border-0 text-center p-4">

              <h6>Low Stock</h6>

              <h2 className="text-warning">
                {lowStock}
              </h2>

            </div>

          </div>

          <div className="col-lg-3 col-md-6">

            <div className="card shadow border-0 text-center p-4">

              <h6>Out of Stock</h6>

              <h2 className="text-danger">
                {outOfStock}
              </h2>

            </div>

          </div>

        </div>

        <div className="row mb-4">

          <div className="col-12">

            <div className="card shadow border-0 p-4 text-center">

              <h5>Total Inventory Value</h5>

              <h2 className="text-success">

                ₹ {inventoryValue.toFixed(2)}

              </h2>

            </div>

          </div>

        </div>

        {/* Inventory Table */}

        <div className="card shadow border-0">

          <div className="card-body">

            <table className="table table-bordered table-hover align-middle">

              <thead className="table-primary">

                <tr>

                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Reorder Level</th>
                  <th>Inventory Value</th>
                  <th>Status</th>

                </tr>

              </thead>

              <tbody>

                {products.length > 0 ? (

                  products.map((product) => (

                    <tr key={product.id}>

                      <td>{product.product_name}</td>

                      <td>{product.category}</td>

                      <td>₹ {product.price}</td>

                      <td>{product.stock}</td>

                      <td>10</td>

                      <td>

                        ₹ {(product.price * product.stock).toFixed(2)}

                      </td>

                      <td>

                        {product.stock === 0 ? (

                          <span className="badge bg-danger">
                            Out of Stock
                          </span>

                        ) : product.stock < 10 ? (

                          <span className="badge bg-warning text-dark">
                            Low Stock
                          </span>

                        ) : (

                          <span className="badge bg-success">
                            Available
                          </span>

                        )}

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td colSpan="7" className="text-center">

                      No Products Found

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

export default Inventory;