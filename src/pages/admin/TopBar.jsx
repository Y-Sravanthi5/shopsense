import { FaBell, FaUserCircle, FaSearch } from "react-icons/fa";

function Topbar() {

  return (

    <div
      className="d-flex justify-content-between align-items-center bg-white shadow-sm px-4 py-3 mb-4"
      style={{
        borderRadius: "15px"
      }}
    >

      {/* Left */}

      <div
        className="d-flex align-items-center"
      >

        <h3
          className="fw-bold mb-0"
        >
          Admin Dashboard
        </h3>

      </div>

      {/* Search */}

      <div
        className="d-flex align-items-center"
        style={{
          width: "350px"
        }}
      >

        <div
          className="input-group"
        >

          <span className="input-group-text bg-white">

            <FaSearch />

          </span>

          <input
            type="text"
            className="form-control"
            placeholder="Search..."
          />

        </div>

      </div>

      {/* Right */}

      <div
        className="d-flex align-items-center"
      >

        <button
          className="btn btn-light position-relative me-3"
        >

          <FaBell />

          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          >

            3

          </span>

        </button>

        <FaUserCircle
          size={40}
          color="#4F46E5"
        />

        <div className="ms-3">

          <div
            className="fw-bold"
          >
            Administrator
          </div>

          <small
            className="text-muted"
          >
            admin@shopsense.com
          </small>

        </div>

      </div>

    </div>

  );

}

export default Topbar;