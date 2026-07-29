import { useEffect, useMemo, useState } from "react";
import { FiRefreshCw, FiSearch, FiEye } from "react-icons/fi";
import AdminLayout from "../../components/layout/AdminLayout";
import API from "../../services/api";
import "../../styles/rejectedVendors.css";

function RejectedVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadRejectedVendors();
  }, []);

  const loadRejectedVendors = async () => {
    try {
      setLoading(true);

      const res = await API.get("/admin/rejected-vendors");

      setVendors(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load rejected vendors");
    } finally {
      setLoading(false);
    }
  };

  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor) => {
      const value = search.toLowerCase();

      return (
        vendor.business_name?.toLowerCase().includes(value) ||
        vendor.owner_name?.toLowerCase().includes(value) ||
        vendor.email?.toLowerCase().includes(value)
      );
    });
  }, [vendors, search]);

  return (
    <AdminLayout>
      <div className="rejected-vendors-page">
        {/* Hero */}
        <div className="vendors-hero rejected-hero">
          <div>
            <h1>Rejected Vendors</h1>
            <p>
              View all vendor applications that were rejected by the
              administration.
            </p>
          </div>

          <button
            className="refresh-btn"
            onClick={loadRejectedVendors}
          >
            <FiRefreshCw />
            Refresh
          </button>
        </div>

        {/* Summary */}
        <div className="summary-card rejected-summary">
          <h3>{vendors.length}</h3>
          <span>Total Rejected Vendors</span>
        </div>

        {/* Search */}
        <div className="table-toolbar">
          <div className="search-box">
            <FiSearch />

            <input
              type="text"
              placeholder="Search by business, owner or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="vendors-card">
          {loading ? (
            <div className="loading-state">
              Loading rejected vendors...
            </div>
          ) : filteredVendors.length === 0 ? (
            <div className="empty-state">
              <h3>No Rejected Vendors</h3>
              <p>No rejected vendor records were found.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="vendors-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Business Name</th>
                    <th>Owner</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th align="center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredVendors.map((vendor) => (
                    <tr key={vendor.id}>
                      <td>#{vendor.id}</td>

                      <td>{vendor.business_name}</td>

                      <td>{vendor.owner_name}</td>

                      <td>{vendor.email}</td>

                      <td>{vendor.phone}</td>

                      <td>
                        <span className="status rejected">
                          Rejected
                        </span>
                      </td>

                      <td>
                        <button
                          className="view-btn"
                          title="View Vendor"
                          onClick={() =>
                            alert(
                              `Vendor Details\n\n${vendor.business_name}`
                            )
                          }
                        >
                          <FiEye />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default RejectedVendors;