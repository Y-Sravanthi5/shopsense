import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiRefreshCw,
  FiClock,
  FiEye,
  FiCheck,
  FiX
} from "react-icons/fi";

import AdminLayout from "../../components/layout/AdminLayout";
import API from "../../services/api";
import "../../styles/pendingVendors.css";

function PendingVendors() {

    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetchPendingVendors();
    }, []);

    const fetchPendingVendors = async () => {

        try {

            setLoading(true);

            const res = await API.get("/admin/pending-vendors");

            setVendors(res.data);

        }
        catch (error) {

            console.log(error);

            alert("Failed to load pending vendors.");

        }
        finally {

            setLoading(false);

        }

    };

    const approveVendor = async (id) => {

        try {

            await API.put(`/admin/approve/${id}`);

            alert("Vendor Approved Successfully");

            fetchPendingVendors();

        }
        catch (error) {

            console.log(error);

            alert("Approval Failed");

        }

    };

    const rejectVendor = async (id) => {

        try {

            await API.put(`/admin/reject/${id}`);

            alert("Vendor Rejected Successfully");

            fetchPendingVendors();

        }
        catch (error) {

            console.log(error);

            alert("Reject Failed");

        }

    };

    const filteredVendors = useMemo(() => {

        return vendors.filter(v =>

            v.business_name.toLowerCase().includes(search.toLowerCase()) ||

            v.owner_name.toLowerCase().includes(search.toLowerCase()) ||

            v.email.toLowerCase().includes(search.toLowerCase())

        );

    }, [vendors, search]);

    return (

        <AdminLayout>

            <div className="pending-page">

                {/* Hero */}

                <div className="pending-hero">

                    <div>

                        <h1>🕒 Pending Vendor Requests</h1>

                        <p>

                            Review vendor applications and approve or reject
                            them before they join the ShopSense marketplace.

                        </p>

                    </div>

                </div>

                {/* Summary */}

                <div className="pending-summary">

                    <div className="summary-card">

                        <div className="summary-icon">

                            <FiClock />

                        </div>

                        <div>

                            <span>Pending Vendors</span>

                            <h2>{vendors.length}</h2>

                        </div>

                    </div>

                </div>

                {/* Toolbar */}

                <div className="pending-toolbar">

                    <div className="search-box">

                        <FiSearch />

                        <input

                            type="text"

                            placeholder="Search vendor..."

                            value={search}

                            onChange={(e) => setSearch(e.target.value)}

                        />

                    </div>

                    <button

                        className="refresh-btn"

                        onClick={fetchPendingVendors}

                    >

                        <FiRefreshCw />

                        Refresh

                    </button>

                </div>

                {/* Table */}

                <div className="pending-table-card">

                    {loading ? (

                        <div className="loading-area">

                            <div
                                className="spinner-border text-primary"
                                role="status"
                            ></div>

                            <p>

                                Loading pending vendors...

                            </p>

                        </div>

                    ) : filteredVendors.length === 0 ? (

                        <div className="empty-state">

                            <h2>🎉</h2>

                            <h4>No Pending Vendor Requests</h4>

                            <p>

                                All vendor applications have been reviewed.

                            </p>

                        </div>

                    ) : (

                        <table className="pending-table">

                            <thead>

                                <tr>

                                    <th>ID</th>

                                    <th>Business</th>

                                    <th>Owner</th>

                                    <th>Email</th>

                                    <th>Phone</th>

                                    <th>Status</th>

                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredVendors.map((vendor) => (

                                    <tr key={vendor.id}>

                                        <td>{vendor.id}</td>

                                        <td>

                                            <strong>

                                                {vendor.business_name}

                                            </strong>

                                        </td>

                                        <td>{vendor.owner_name}</td>

                                        <td>{vendor.email}</td>

                                        <td>{vendor.phone}</td>

                                        <td>

                                            <span className="status pending">

                                                {vendor.status}

                                            </span>

                                        </td>

                                        <td>

                                            <div className="action-buttons">

                                                <button

                                                    className="view-btn"

                                                    onClick={() =>
                                                        navigate(`/admin/vendor/${vendor.id}`)
                                                    }

                                                >

                                                    <FiEye />

                                                </button>

                                                <button

                                                    className="approve-btn"

                                                    onClick={() =>
                                                        approveVendor(vendor.id)
                                                    }

                                                >

                                                    <FiCheck />

                                                </button>

                                                <button

                                                    className="reject-btn"

                                                    onClick={() =>
                                                        rejectVendor(vendor.id)
                                                    }

                                                >

                                                    <FiX />

                                                </button>

                                            </div>

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

export default PendingVendors;