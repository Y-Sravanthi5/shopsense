import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";

function Login() {

  const navigate = useNavigate();

  const [vendor, setVendor] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setVendor({
      ...vendor,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    console.log("Login button clicked");
    console.log(vendor);

    try {

      const res = await API.post("/login", vendor);

      console.log("Response:", res.data);

      if (res.data.message === "Login Successful") {

        localStorage.setItem("vendor_id", res.data.vendor_id);

        localStorage.setItem(
          "business_name",
          res.data.business_name
        );

        alert("Login Successful");

        navigate("/vendor/dashboard");

      } else {

        alert(res.data.message);

      }

    } catch (err) {

      console.log("Error:", err);

      alert("Login Failed");

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
                fontSize: "55px"
              }}
            >
              Welcome Back 👋
            </h1>

            <p
              className="mt-4"
              style={{
                fontSize: "20px",
                lineHeight: "35px"
              }}
            >
              Login to manage your products,
              inventory and AI-powered business insights.
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
            className="card border-0 shadow-lg"
            style={{
              width: "450px",
              borderRadius: "25px"
            }}
          >

            <div className="card-body p-5">

              <h2
                className="text-center fw-bold mb-4"
              >
                Vendor Login
              </h2>

              <form onSubmit={handleSubmit}>

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
                    padding: "12px"
                  }}
                >
                  Login
                </button>

              </form>

              <p
                className="text-center mt-4"
              >
                New Vendor?{" "}
                <Link to="/register">
                  Register
                </Link>
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Login;