import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FiArrowLeft,
  FiUser,
  FiMail,
  FiPhone,
  FiHome,
  FiTag,
  FiBox,
  FiCheckCircle,
  FiFileText,
} from "react-icons/fi";

import AdminLayout from "../../components/layout/AdminLayout";
import API from "../../services/api";

import "../../styles/vendorDetails.css";

function VendorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vendor, setVendor] = useState(null);
  const [productCount, setProductCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVendor();
  }, []);

  const loadVendor = async () => {
    try {
      setLoading(true);

      const vendorRes = await API.get(`/admin/vendor/${id}`);
      setVendor(vendorRes.data);

      const productRes = await API.get(`/admin/vendor-products/${id}`);
      setProductCount(productRes.data.count);
    } catch (err) {
      console.log(err);
      alert("Failed to load vendor details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="vendor-loading">
          <div className="spinner-border text-primary"></div>
          <p>Loading Vendor Details...</p>
        </div>
      </AdminLayout>
    );
  }

  if (!vendor) {
    return (
      <AdminLayout>
        <div className="vendor-loading">
          <h3>Vendor not found.</h3>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="vendor-page">

        {/* Hero */}

        <div className="vendor-hero">

          <button
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            <FiArrowLeft />
            Back
          </button>

          <h1>🏪 Vendor Details</h1>

          <p>
            Complete profile and business information of the selected vendor.
          </p>

        </div>

        {/* Top Section */}

        <div className="vendor-top">

          {/* Profile */}

          <div className="profile-card">

            <img
              src={`http://127.0.0.1:8000/uploads/${vendor.shop_logo}`}
              alt="Shop Logo"
            />

            <h3>{vendor.business_name}</h3>

            <p>{vendor.owner_name}</p>

            <span
              className={`status-badge ${
                vendor.status === "Approved"
                  ? "approved"
                  : "pending"
              }`}
            >
              {vendor.status}
            </span>

          </div>

          {/* Stats */}

          <div className="stats-card">

            <h4>Marketplace Statistics</h4>

            <div className="stat-box">

              <FiBox />

              <div>

                <span>Total Products</span>

                <h2>{productCount}</h2>

              </div>

            </div>

          </div>

        </div>

        {/* Details */}

        <div className="details-card">

          <h3>Business Information</h3>

          <div className="details-grid">

            <div className="detail-item">
              <FiUser />
              <div>
                <span>Owner Name</span>
                <strong>{vendor.owner_name}</strong>
              </div>
            </div>

            <div className="detail-item">
              <FiMail />
              <div>
                <span>Email</span>
                <strong>{vendor.email}</strong>
              </div>
            </div>

            <div className="detail-item">
              <FiPhone />
              <div>
                <span>Phone</span>
                <strong>{vendor.phone}</strong>
              </div>
            </div>

            <div className="detail-item">
              <FiTag />
              <div>
                <span>Business Type</span>
                <strong>{vendor.business_type}</strong>
              </div>
            </div>

            <div className="detail-item full">
              <FiHome />
              <div>
                <span>Address</span>
                <strong>{vendor.address}</strong>
              </div>
            </div>

            <div className="detail-item full">
              <FiFileText />
              <div>
                <span>Description</span>
                <strong>{vendor.description}</strong>
              </div>
            </div>

            <div className="detail-item">
              <FiCheckCircle />
              <div>
                <span>Status</span>

                <strong>

                  <span
                    className={`status-badge ${
                      vendor.status === "Approved"
                        ? "approved"
                        : "pending"
                    }`}
                  >
                    {vendor.status}
                  </span>

                </strong>

              </div>

            </div>

          </div>

        </div>

      </div>

    </AdminLayout>
  );
}

export default VendorDetails;