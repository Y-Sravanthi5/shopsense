import { useState } from "react";
import API from "../../services/api";

function AddProduct() {
  const vendorId = localStorage.getItem("vendor_id");

  const [product, setProduct] = useState({
  product_name: "",
  category: "",
  description: "",
  original_price: "",
  discount: "",
  stock: "",
  vendor_id: Number(vendorId),
  image: null
});

  const handleChange = (e) => {

    const { name, value, files } = e.target;

    if (name === "image") {

      setProduct({
        ...product,
        image: files[0]
      });

    } else {

      setProduct({
        ...product,
        [name]: value
      });

    }

  };

  // Auto Calculate Selling Price
  const sellingPrice =
    product.original_price
      ? (
          product.original_price -
          (product.original_price * product.discount) / 100
        ).toFixed(2)
      : "";

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("product_name", product.product_name);
    formData.append("category", product.category);
    formData.append("description", product.description);

    formData.append("original_price", product.original_price);
    formData.append("discount", product.discount);
    formData.append("price", sellingPrice);

    formData.append("stock", product.stock);
    formData.append("vendor_id", product.vendor_id);

    formData.append("image", product.image);

    try {
      console.log("LocalStorage Vendor ID:", vendorId);
      console.log("Vendor ID being sent:", product.vendor_id);

      await API.post("/products", formData, {

        headers: {
          "Content-Type": "multipart/form-data"
        }

      });

      alert("Product Added Successfully!");

      setProduct({

  product_name: "",
  category: "",
  description: "",
  original_price: "",
  discount: "",
  stock: "",
  vendor_id: Number(vendorId),
  image: null

});
    } catch (err) {

      console.log(err);

      alert("Failed to Add Product");

    }

  };

  return (

    <div className="container mt-5">

      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit}>

          {/* Product Name */}

          <div className="mb-3">

            <label className="form-label">
              Product Name
            </label>

            <input
              type="text"
              name="product_name"
              className="form-control"
              value={product.product_name}
              onChange={handleChange}
              required
            />

          </div>

          {/* Category */}

          <div className="mb-3">

            <label className="form-label">
              Category
            </label>

            <select
              name="category"
              className="form-select"
              value={product.category}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Category
              </option>

              <option value="Electronics">
                Electronics
              </option>

              <option value="Fashion">
                Fashion
              </option>

              <option value="Groceries">
                Groceries
              </option>

              <option value="Home & Kitchen">
                Home & Kitchen
              </option>

              <option value="Beauty">
                Beauty
              </option>

              <option value="Sports">
                Sports
              </option>

              <option value="Books">
                Books
              </option>

              <option value="Toys">
                Toys
              </option>

            </select>

          </div>

          {/* Description */}

          <div className="mb-3">

            <label className="form-label">
              Description
            </label>

            <textarea
              name="description"
              className="form-control"
              rows="4"
              value={product.description}
              onChange={handleChange}
              required
            />

          </div>

          {/* Original Price */}

          <div className="mb-3">

            <label className="form-label">
              Original Price (₹)
            </label>

            <input
              type="number"
              name="original_price"
              className="form-control"
              value={product.original_price}
              onChange={handleChange}
              required
            />

          </div>

          {/* Discount */}

          <div className="mb-3">

            <label className="form-label">
              Discount (%)
            </label>

            <input
              type="number"
              name="discount"
              className="form-control"
              value={product.discount}
              onChange={handleChange}
            />

          </div>

          {/* Selling Price */}

          <div className="mb-3">

            <label className="form-label">
              Selling Price (₹)
            </label>

            <input
              type="text"
              className="form-control"
              value={sellingPrice}
              readOnly
            />

          </div>

          {/* Stock */}

          <div className="mb-3">

            <label className="form-label">
              Stock
            </label>

            <input
              type="number"
              name="stock"
              className="form-control"
              value={product.stock}
              onChange={handleChange}
              required
            />

          </div>

          {/* Image */}

          <div className="mb-4">

            <label className="form-label">
              Product Image
            </label>

            <input
              type="file"
              name="image"
              className="form-control"
              accept="image/*"
              onChange={handleChange}
              required
            />

          </div>

          <button
            className="btn btn-primary w-100"
          >
            Add Product
          </button>

        </form>

      </div>

    </div>

  );

}

export default AddProduct;