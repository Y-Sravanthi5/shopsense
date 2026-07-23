import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../services/api";

function ProductList() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {

    const vendorId = localStorage.getItem("vendor_id");

    API.get(`/vendor/products/${vendorId}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  };

  const deleteProduct = async (id) => {

    if (!window.confirm("Delete this product?")) return;

    try {

      await API.delete(`/products/${id}`);

      alert("Product Deleted Successfully!");

      loadProducts();

    } catch (err) {

      console.log(err);
      alert("Delete Failed");

    }

  };

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category))
  ];

  const filteredProducts = products.filter((product) => {

    const searchMatch = product.product_name
      .toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatch =
      category === "All" || product.category === category;

    let statusMatch = true;

    if (status === "In Stock")
      statusMatch = product.stock >= 10;

    else if (status === "Low Stock")
      statusMatch = product.stock > 0 && product.stock < 10;

    else if (status === "Out of Stock")
      statusMatch = product.stock === 0;

    return searchMatch && categoryMatch && statusMatch;

  });

  return (

    <DashboardLayout>

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2
          className="fw-bold"
          style={{ color: "#5B3CC4" }}
        >
          📦 Product Management
        </h2>

        <button
          className="btn"
          style={{
            background: "#5B3CC4",
            color: "white",
            borderRadius: "10px"
          }}
          onClick={() => navigate("/vendor/add-product")}
        >
          ➕ Add Product
        </button>

      </div>

      {/* Search & Filters */}

      <div className="row mb-4">

        <div className="col-md-4">

          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search Product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="col-md-4">

          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >

            {categories.map((cat) => (

              <option key={cat} value={cat}>
                {cat}
              </option>

            ))}

          </select>

        </div>

        <div className="col-md-4">

          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >

            <option>All</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>

          </select>

        </div>

      </div>

      {/* Product Cards */}

      <div className="row">

        {filteredProducts.length > 0 ? (

          filteredProducts.map((product) => (

            <div
              className="col-lg-4 col-md-6 mb-4"
              key={product.id}
            >

              <div
                className="card border-0 h-100"
                style={{
                  borderRadius: "20px",
                  boxShadow: "0 10px 30px rgba(0,0,0,.08)"
                }}
              >

                <img
                  src={`http://127.0.0.1:8000/uploads/${product.image}`}
                  alt={product.product_name}
                  className="card-img-top"
                  style={{
                    height: "220px",
                    objectFit: "cover",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px"
                  }}
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/600x350?text=No+Image";
                  }}
                />

                <div className="card-body">

                  <span className="badge bg-primary mb-2">
                    {product.category}
                  </span>

                  <h4 className="fw-bold">
                    {product.product_name}
                  </h4>

                  <p className="text-muted">
                    {product.description}
                  </p>

                  <h3 style={{ color: "#5B3CC4" }}>
                    ₹ {product.price}
                  </h3>

                  {product.stock === 0 ? (

                    <span className="badge bg-dark">
                      Out of Stock
                    </span>

                  ) : product.stock < 10 ? (

                    <span className="badge bg-danger">
                      Low Stock ({product.stock})
                    </span>

                  ) : (

                    <span className="badge bg-success">
                      In Stock ({product.stock})
                    </span>

                  )}

                </div>

                <div className="card-footer bg-white border-0">

                  <div className="d-flex justify-content-between">

                    <button
                      className="btn btn-outline-primary"
                      onClick={() =>
                        navigate(`/vendor/edit-product/${product.id}`)
                      }
                    >
                      ✏ Edit
                    </button>

                    <button
                      className="btn btn-outline-danger"
                      onClick={() =>
                        deleteProduct(product.id)
                      }
                    >
                      🗑 Delete
                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))

        ) : (

          <div className="col-12">

            <div className="alert alert-info text-center">

              <h5>No Products Found</h5>

            </div>

          </div>

        )}

      </div>

    </DashboardLayout>

  );

}

export default ProductList;