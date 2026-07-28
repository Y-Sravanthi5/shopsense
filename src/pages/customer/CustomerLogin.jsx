import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";

function CustomerLogin() {

  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await API.post("/customer/login", customer);

      console.log(res.data);

      if (res.data.message === "Customer Login Successful") {

        localStorage.setItem("customer_id", res.data.customer_id);

        localStorage.setItem(
          "customer_name",
          res.data.full_name
        );

        alert("Login Successful");

        navigate("/customer/dashboard");

      } else {

        alert(res.data.message);

      }

    } catch (err) {

      console.error(err);

      alert("Login Failed");

    }
  };

  return (

    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#3B82F6,#2563EB)"
      }}
    >

      <div className="row">

        <div
          className="col-lg-6 d-flex justify-content-center align-items-center"
          style={{
            color: "white",
            minHeight: "100vh"
          }}
        >

          <div>

            <h1 className="display-4 fw-bold">
              Welcome Back 👋
            </h1>

            <p className="lead mt-3">
              Login to explore products and manage your orders.
            </p>

          </div>

        </div>

        <div
          className="col-lg-6 d-flex justify-content-center align-items-center"
        >

          <div
            className="card shadow border-0"
            style={{
              width: "450px",
              borderRadius: "20px"
            }}
          >

            <div className="card-body p-5">

              <h2 className="text-center mb-4">
                Customer Login
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label>Email</label>

                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={customer.email}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-4">

                  <label>Password</label>

                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={customer.password}
                    onChange={handleChange}
                    required
                  />

                </div>

                <button
                  className="btn btn-primary w-100"
                >
                  Login
                </button>

              </form>

              <p className="text-center mt-3">

                New Customer?{" "}

                <Link to="/customer/register">
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

export default CustomerLogin;