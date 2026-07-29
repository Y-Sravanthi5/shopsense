import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import API from "../../services/api";

import {
  FiCheckCircle,
  FiRefreshCw,
  FiSearch,
  FiEye,
} from "react-icons/fi";

import "../../styles/approvedVendors.css";

function ApprovedVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadApprovedVendors();
  }, []);

  const loadApprovedVendors = async () => {
    try {
      setLoading(true);

      const res = await API.get("/admin/approved-vendors");

      setVendors(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load approved vendors");
    } finally {
      setLoading(false);
    }
  };

  const filteredVendors = useMemo(() => {
    return vendors.filter(
      (vendor) =>
        vendor.business_name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        vendor.owner_name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        vendor.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [vendors, search]);

  const viewVendor = (vendor) => {
    alert(
      `Business: ${vendor.business_name}
Owner: ${vendor.owner_name}
Email: ${vendor.email}
Phone: ${vendor.phone}`
    );
  };

  return (
    <AdminLayout>
      <div className="approved-page">
        {/* Hero */}

        <div className="approved-hero">
          <div>
            <h1>✅ Approved Vendors</h1>

            <p>
              View all vendors who are approved and currently selling products
              on the ShopSense marketplace.
            </p>
          </div>
        </div>

        {/* Summary */}

        <div className="approved-summary">
          <div className="summary-card">
            <div className="summary-icon">
              <FiCheckCircle />
            </div>

            <div>
              <span>Total Approved Vendors</span>

              <h2>{vendors.length}</h2>
            </div>
          </div>
        </div>

        {/* Toolbar */}

        <div className="approved-toolbar">
          <div className="search-box">
            <FiSearch />

            <input
              type="text"
              placeholder="Search vendor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="refresh-btn" onClick={loadApprovedVendors}>
            <FiRefreshCw />
            Refresh
          </button>
        </div>

        {/* Table */}

        <div className="approved-table-card">
          {loading ? (
            <div className="loading-area">
              <div
                className="spinner-border text-success"
                role="status"
              ></div>

              <p>Loading approved vendors...</p>
            </div>
          ) : filteredVendors.length === 0 ? (
            <div className="empty-state">
              <h2>🎉</h2>

              <h4>No Approved Vendors</h4>

              <p>
                Approved vendors will appear here once applications are
                accepted.
              </p>
            </div>
          ) : (
            <table className="approved-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Business Name</th>
                  <th>Owner</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>View</th>
                </tr>
              </thead>

              <tbody>
                {filteredVendors.map((vendor) => (
                  <tr key={vendor.id}>
                    <td>{vendor.id}</td>

                    <td>
                      <strong>{vendor.business_name}</strong>
                    </td>

                    <td>{vendor.owner_name}</td>

                    <td>{vendor.email}</td>

                    <td>{vendor.phone}</td>

                    <td>
                      <span className="status approved">Approved</span>
                    </td>

                    <td>
                      <button
                        className="view-btn"
                        onClick={() => viewVendor(vendor)}
                      >
                        <FiEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default ApprovedVendors;