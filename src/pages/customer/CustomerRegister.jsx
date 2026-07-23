import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";

function CustomerRegister() {

  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    full_name: "",
    email: "",
    phone: "",
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

      await API.post("/customer/register", customer);

      alert("Registration Successful!");

      navigate("/customer/login");

    } catch (err) {

      console.log(err);

      alert("Registration Failed");

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
              Customer Registration
            </h1>

            <p className="lead mt-3">
              Create your ShopSense customer account.
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

                Register

              </h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label>Full Name</label>

                  <input
                    type="text"
                    className="form-control"
                    name="full_name"
                    value={customer.full_name}
                    onChange={handleChange}
                    required
                  />

                </div>

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

                <div className="mb-3">

                  <label>Phone</label>

                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={customer.phone}
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

                <button className="btn btn-primary w-100">

                  Register

                </button>

              </form>

              <p className="text-center mt-3">

                Already have an account?{" "}

                <Link to="/customer/login">

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

export default CustomerRegister;