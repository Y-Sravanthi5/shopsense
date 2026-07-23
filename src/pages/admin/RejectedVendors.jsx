import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import API from "../../services/api";

function RejectedVendors() {

  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    loadRejectedVendors();
  }, []);

  const loadRejectedVendors = async () => {

    try {

      const res = await API.get("/admin/rejected-vendors");

      setVendors(res.data);

    } catch (err) {

      console.log(err);

      alert("Failed to load rejected vendors");

    }

  };

  return (

    <AdminLayout>

      <h2 className="mb-4">
        Rejected Vendors
      </h2>

      <div className="card shadow">

        <div className="card-body">

          <table className="table table-bordered">

            <thead className="table-danger">

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

                  <td
                    colSpan="5"
                    className="text-center"
                  >

                    No Rejected Vendors

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

export default RejectedVendors;