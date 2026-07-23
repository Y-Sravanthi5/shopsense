import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import API from "../../services/api";

function PendingVendors() {

  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPendingVendors();
  }, []);

  const fetchPendingVendors = async () => {

    try {

      setLoading(true);

      const res = await API.get("/admin/pending-vendors");

      setVendors(res.data);

    } catch (error) {

      console.log(error);

      alert("Failed to load pending vendors.");

    } finally {

      setLoading(false);

    }

  };

  const approveVendor = async (id) => {

    try {

      await API.put(`/admin/approve/${id}`);

      alert("Vendor Approved Successfully");

      fetchPendingVendors();

    } catch (error) {

      console.log(error);

      alert("Approval Failed");

    }

  };

  const rejectVendor = async (id) => {

    try {

      await API.put(`/admin/reject/${id}`);

      alert("Vendor Rejected Successfully");

      fetchPendingVendors();

    } catch (error) {

      console.log(error);

      alert("Reject Failed");

    }

  };

  return (

    <AdminLayout>

      <div className="container-fluid mt-4">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>

            <h2 className="fw-bold">
              Pending Vendor Approvals
            </h2>

            <p className="text-muted">
              Total Pending Vendors : <b>{vendors.length}</b>
            </p>

          </div>

          <button
            className="btn btn-primary"
            onClick={fetchPendingVendors}
          >
            Refresh
          </button>

        </div>

        <div className="card shadow border-0">

          <div className="card-body">

            {loading ? (

              <div className="text-center p-5">

                <div
                  className="spinner-border text-primary"
                  role="status"
                ></div>

              </div>

            ) : (

              <table className="table table-hover table-bordered align-middle">

                <thead className="table-dark">

                  <tr>

                    <th>ID</th>

                    <th>Business Name</th>

                    <th>Owner</th>

                    <th>Email</th>

                    <th>Phone</th>

                    <th>Status</th>

                    <th width="260">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {vendors.length === 0 ? (

                    <tr>

                      <td
                        colSpan="7"
                        className="text-center"
                      >
                        No Pending Vendors Found
                      </td>

                    </tr>

                  ) : (

                    vendors.map((vendor) => (

                      <tr key={vendor.id}>

                        <td>{vendor.id}</td>

                        <td>{vendor.business_name}</td>

                        <td>{vendor.owner_name}</td>

                        <td>{vendor.email}</td>

                        <td>{vendor.phone}</td>

                        <td>

                          <span className="badge bg-warning text-dark">

                            {vendor.status}

                          </span>

                        </td>

                        <td>

                          <button
                            className="btn btn-info btn-sm me-2"
                            onClick={() =>
                              navigate(`/admin/vendor/${vendor.id}`)
                            }
                          >
                            View
                          </button>

                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() =>
                              approveVendor(vendor.id)
                            }
                          >
                            Approve
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              rejectVendor(vendor.id)
                            }
                          >
                            Reject
                          </button>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            )}

          </div>

        </div>

      </div>

    </AdminLayout>

  );

}

export default PendingVendors;