import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";

function Register() {

  const navigate = useNavigate();

  const [vendor, setVendor] = useState({

    business_name: "",
    owner_name: "",
    email: "",
    phone: "",
    business_type: "",
    address: "",
    description: "",
    password: "",
    shop_logo: null

  });

  const handleChange = (e) => {

    const { name, value, files } = e.target;

    if (name === "shop_logo") {

      setVendor({

        ...vendor,

        shop_logo: files[0]

      });

    }

    else {

      setVendor({

        ...vendor,

        [name]: value

      });

    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("business_name", vendor.business_name);
    formData.append("owner_name", vendor.owner_name);
    formData.append("email", vendor.email);
    formData.append("phone", vendor.phone);
    formData.append("business_type", vendor.business_type);
    formData.append("address", vendor.address);
    formData.append("description", vendor.description);
    formData.append("password", vendor.password);
    formData.append("shop_logo", vendor.shop_logo);

    try {

      await API.post(
        "/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert(
        "Registration Successful! Waiting for Admin Approval."
      );

      navigate("/login");

    }

    catch (err) {

      console.log(err);

      alert("Registration Failed");

    }

  };

  return (

    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#5B3CC4,#7C3AED)"
      }}
    >

      <div className="row">

        {/* Left Side */}

        <div
          className="col-lg-6 d-flex justify-content-center align-items-center"
          style={{
            color: "white",
            minHeight: "100vh"
          }}
        >

          <div style={{ maxWidth: "500px" }}>

            <h1
              className="fw-bold"
              style={{
                fontSize: "50px"
              }}
            >
              Join ShopSense 🚀
            </h1>

            <p
              className="mt-4"
              style={{
                fontSize: "20px",
                lineHeight: "35px"
              }}
            >
              Register your business to start selling
              products on ShopSense Marketplace.
            </p>

          </div>

        </div>

        {/* Right Side */}

        <div
          className="col-lg-6 d-flex justify-content-center align-items-center"
          style={{
            minHeight: "100vh"
          }}
        >

          <div
            className="card shadow-lg border-0"
            style={{
              width: "550px",
              borderRadius: "20px"
            }}
          >

            <div className="card-body p-5">

              <h2 className="text-center fw-bold mb-4">
                Vendor Registration
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label>Business Name</label>

                  <input
                    type="text"
                    name="business_name"
                    className="form-control"
                    value={vendor.business_name}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-3">

                  <label>Owner Name</label>

                  <input
                    type="text"
                    name="owner_name"
                    className="form-control"
                    value={vendor.owner_name}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-3">

                  <label>Email</label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={vendor.email}
                    onChange={handleChange}
                    required
                  />

                </div>
                                <div className="mb-3">

                  <label>Phone</label>

                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={vendor.phone}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-3">

                  <label>Business Type</label>

                  <select
                    name="business_type"
                    className="form-select"
                    value={vendor.business_type}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select Business Type
                    </option>

                    <option value="Electronics">
                      Electronics
                    </option>

                    <option value="Fashion">
                      Fashion
                    </option>

                    <option value="Grocery">
                      Grocery
                    </option>

                    <option value="Furniture">
                      Furniture
                    </option>

                    <option value="Books">
                      Books
                    </option>

                    <option value="Sports">
                      Sports
                    </option>

                    <option value="Beauty">
                      Beauty
                    </option>

                    <option value="Others">
                      Others
                    </option>

                  </select>

                </div>

                <div className="mb-3">

                  <label>Business Address</label>

                  <textarea
                    rows="2"
                    name="address"
                    className="form-control"
                    value={vendor.address}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-3">

                  <label>Business Description</label>

                  <textarea
                    rows="3"
                    name="description"
                    className="form-control"
                    value={vendor.description}
                    placeholder="Describe your business..."
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-3">

                  <label>Shop Logo</label>

                  <input
                    type="file"
                    name="shop_logo"
                    className="form-control"
                    accept="image/*"
                    onChange={handleChange}
                  />

                </div>

                <div className="mb-4">

                  <label>Password</label>

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={vendor.password}
                    onChange={handleChange}
                    required
                  />

                </div>

                <button
                  type="submit"
                  className="btn w-100"
                  style={{
                    background: "#5B3CC4",
                    color: "white",
                    padding: "12px",
                    borderRadius: "10px"
                  }}
                >
                  Register
                </button>

              </form>

              <p className="text-center mt-4">

                Already have an account?{" "}

                <Link to="/login">
                  Login
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Register;