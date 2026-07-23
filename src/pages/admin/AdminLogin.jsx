import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

function AdminLogin() {

  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/admin/login", admin);

      if (res.data.message === "Admin Login Successful") {

        alert("Welcome Admin!");

        navigate("/admin/dashboard");

      } else {

        alert(res.data.message);

      }

    } catch (err) {

      console.log(err);

      alert("Login Failed");

    }

  };

  return (

    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#111827,#1F2937)"
      }}
    >

      <div className="row">

        <div
          className="col-lg-6 d-flex justify-content-center align-items-center"
          style={{
            minHeight: "100vh",
            color: "white"
          }}
        >

          <div>

            <h1 className="fw-bold display-4">
              ShopSense Admin
            </h1>

            <p className="lead mt-4">

              Login to manage vendors,
              approvals and marketplace.

            </p>

          </div>

        </div>

        <div
          className="col-lg-6 d-flex justify-content-center align-items-center"
          style={{
            minHeight: "100vh"
          }}
        >

          <div
            className="card shadow-lg border-0"
            style={{
              width: "420px",
              borderRadius: "20px"
            }}
          >

            <div className="card-body p-5">

              <h2 className="text-center mb-4">

                Admin Login

              </h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label>Username</label>

                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={admin.username}
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
                    value={admin.password}
                    onChange={handleChange}
                    required
                  />

                </div>

                <button
                  className="btn btn-dark w-100"
                >

                  Login

                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AdminLogin;