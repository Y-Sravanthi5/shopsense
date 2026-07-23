import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";

function EditProduct() {

  const { id } = useParams();
  const navigate = useNavigate();

  const vendorId = localStorage.getItem("vendor_id");

const [product, setProduct] = useState({
  product_name: "",
  category: "",
  description: "",
  original_price: "",
  discount: "",
  price: "",
  stock: "",
  vendor_id: Number(vendorId)
});

  useEffect(() => {

    API.get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [id]);

  const handleChange = (e) => {

  const { name, value } = e.target;

  const updatedProduct = {
    ...product,
    [name]: value
  };

  if (
    name === "original_price" ||
    name === "discount"
  ) {

    const original =
      parseFloat(updatedProduct.original_price) || 0;

    const discount =
      parseFloat(updatedProduct.discount) || 0;

    updatedProduct.price =
      (original - (original * discount) / 100).toFixed(2);

  }

  setProduct(updatedProduct);

};
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.put(`/products/${id}`, product);
      alert("Product Updated Successfully!");

      navigate("/vendor/products");

    } catch (err) {

      console.log(err);
      alert("Update Failed");

    }

  };

  return (

    <div className="container mt-5">

      <div className="card shadow p-4">

        <h2 className="mb-4">Edit Product</h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label>Product Name</label>
            <input
              type="text"
              name="product_name"
              className="form-control"
              value={product.product_name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Category</label>
            <input
              type="text"
              name="category"
              className="form-control"
              value={product.category}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Description</label>
            <textarea
              name="description"
              className="form-control"
              value={product.description}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Price</label>
            <input
              type="number"
              name="price"
              className="form-control"
              value={product.price}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
  <label>Selling Price</label>
  <input
    type="number"
    className="form-control"
    value={product.price}
    readOnly
  />
</div>

          <div className="mb-3">
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              className="form-control"
              value={product.stock}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
  <label>Original Price</label>
  <input
    type="number"
    name="original_price"
    className="form-control"
    value={product.original_price}
    onChange={handleChange}
  />
</div>

<div className="mb-3">
  <label>Discount (%)</label>
  <input
    type="number"
    name="discount"
    className="form-control"
    value={product.discount}
    onChange={handleChange}
  />
</div>

          <button className="btn btn-success w-100">
            Update Product
          </button>

        </form>

      </div>

    </div>

  );
}

export default EditProduct;