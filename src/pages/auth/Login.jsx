import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";

function Login() {
  const navigate = useNavigate();

  const [vendor, setVendor] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setVendor({
      ...vendor,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/login", vendor);

      console.log("Login Response:", res.data);

      if (res.data.message === "Login Successful") {
        // Store logged-in vendor information
        localStorage.setItem(
          "vendor_id",
          res.data.vendor_id
        );

        localStorage.setItem(
          "business_name",
          res.data.business_name || "Vendor"
        );

        alert("Login Successful");

        navigate("/vendor/dashboard");
      } else {
        alert(res.data.message || "Login Failed");
      }
    } catch (err) {
      console.error("Login Error:", err);

      alert(
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #7657E8, #8B6FE8)",
      }}
    >
      <div className="row">

        {/* LEFT SIDE */}

        <div
          className="
            col-lg-6
            d-flex
            justify-content-center
            align-items-center
          "
          style={{
            color: "white",
            minHeight: "100vh",
          }}
        >
          <div
            style={{
              maxWidth: "500px",
              padding: "30px",
            }}
          >
            <h1
              className="fw-bold"
              style={{
                fontSize: "55px",
                color: "white",
              }}
            >
              Welcome Back 👋
            </h1>

            <p
              className="mt-4"
              style={{
                fontSize: "20px",
                lineHeight: "35px",
                color: "rgba(255,255,255,0.85)",
              }}
            >
              Login to manage your products,
              inventory and AI-powered business
              insights.
            </p>
          </div>
        </div>


        {/* RIGHT SIDE */}

        <div
          className="
            col-lg-6
            d-flex
            justify-content-center
            align-items-center
          "
          style={{
            minHeight: "100vh",
          }}
        >
          <div
            className="card border-0"
            style={{
              width: "450px",
              borderRadius: "22px",
              boxShadow:
                "0 20px 60px rgba(30, 20, 70, 0.18)",
            }}
          >
            <div className="card-body p-5">

              <div className="text-center mb-4">
                <h2
                  className="fw-bold"
                  style={{
                    color: "#171827",
                  }}
                >
                  Vendor Login
                </h2>

                <p
                  style={{
                    color: "#858596",
                    fontSize: "14px",
                  }}
                >
                  Sign in to your ShopSense account
                </p>
              </div>


              <form onSubmit={handleSubmit}>

                {/* EMAIL */}

                <div className="mb-3">

                  <label
                    className="form-label"
                    style={{
                      fontWeight: "600",
                      color: "#4F5063",
                    }}
                  >
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={vendor.email}
                    onChange={handleChange}
                    required
                    style={{
                      minHeight: "48px",
                      borderRadius: "10px",
                    }}
                  />

                </div>


                {/* PASSWORD */}

                <div className="mb-4">

                  <label
                    className="form-label"
                    style={{
                      fontWeight: "600",
                      color: "#4F5063",
                    }}
                  >
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={vendor.password}
                    onChange={handleChange}
                    required
                    style={{
                      minHeight: "48px",
                      borderRadius: "10px",
                    }}
                  />

                </div>


                {/* LOGIN BUTTON */}

                <button
                  type="submit"
                  className="btn w-100"
                  disabled={loading}
                  style={{
                    minHeight: "49px",
                    background:
                      "linear-gradient(135deg, #7657E8, #6847E8)",
                    color: "white",
                    borderRadius: "10px",
                    fontWeight: "600",
                    border: "none",
                  }}
                >
                  {loading
                    ? "Signing in..."
                    : "Login"}
                </button>

              </form>


              {/* REGISTER */}

              <p
                className="text-center mt-4"
                style={{
                  color: "#777889",
                  fontSize: "14px",
                }}
              >
                New Vendor?{" "}

                <Link
                  to="/register"
                  style={{
                    color: "#7657E8",
                    fontWeight: "600",
                    textDecoration: "none",
                  }}
                >
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