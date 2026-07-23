import { useEffect, useState } from "react";
import axios from "axios";

import CustomerNavbar from "./components/CustomerNavbar";
import ProductCard from "./components/ProductCard";

function CustomerProducts() {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, search, category, sort]);

  const loadProducts = () => {
    axios
      .get("http://127.0.0.1:8000/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  const filterProducts = () => {

    let temp = [...products];

    if (search !== "") {
      temp = temp.filter((p) =>
        p.product_name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      temp = temp.filter((p) => p.category === category);
    }

    if (sort === "low") {
      temp.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      temp.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(temp);
  };

  const categories = [
    "All",
    ...new Set(products.map((p) => p.category))
  ];

  return (
    <>
      <CustomerNavbar />

      <div className="container mt-4">

        <h2 className="mb-4 text-center">
          Explore Products
        </h2>

        <div className="row mb-4">

          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search Products..."
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
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="low">Price Low → High</option>
              <option value="high">Price High → Low</option>
            </select>
          </div>

        </div>

        <div className="row">

          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))
          ) : (
            <h4 className="text-center">
              No Products Found
            </h4>
          )}

        </div>

      </div>
    </>
  );
}

export default CustomerProducts;