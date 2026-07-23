import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import API from "../../services/api";

function ApprovedVendors() {

  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    loadApprovedVendors();
  }, []);

  const loadApprovedVendors = async () => {
    try {
      const res = await API.get("/admin/approved-vendors");
      setVendors(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load approved vendors");
    }
  };

  return (
    <AdminLayout>

      <h2 className="mb-4">Approved Vendors</h2>

      <div className="card shadow">
        <div className="card-body">

          <table className="table table-bordered">

            <thead className="table-success">

              <tr>
                <th>ID</th>
                <th>Business Name</th>
                <th>Owner</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>

            </thead>

            <tbody>

              {vendors.length === 0 ? (

                <tr>
                  <td colSpan="5" className="text-center">
                    No Approved Vendors
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
                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>
      </div>

    </AdminLayout>
  );
}

export default ApprovedVendors;