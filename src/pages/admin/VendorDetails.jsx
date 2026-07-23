import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import API from "../../services/api";

function VendorDetails() {

    const { id } = useParams();

    const [vendor, setVendor] = useState(null);
    const [productCount, setProductCount] = useState(0);

    useEffect(() => {

        loadVendor();

    }, []);

    const loadVendor = async () => {

        try {

            const vendorRes = await API.get(
                `/admin/vendor/${id}`
            );

            setVendor(vendorRes.data);

            const productRes = await API.get(
                `/admin/vendor-products/${id}`
            );

            setProductCount(productRes.data.count);

        }

        catch (err) {

            console.log(err);

        }

    };

    if (!vendor) {

        return (

            <AdminLayout>

                <h3>Loading...</h3>

            </AdminLayout>

        );

    }

    return (

        <AdminLayout>

            <div className="container mt-4">

                <div className="card shadow">

                    <div className="card-body">

                        <h2 className="mb-4">

                            Vendor Details

                        </h2>

                        <div className="row">

                            <div className="col-md-4 text-center">

                                <img

                                    src={`http://127.0.0.1:8000/uploads/${vendor.shop_logo}`}

                                    alt="Shop Logo"

                                    className="img-fluid rounded shadow"

                                    style={{
                                        width: "180px",
                                        height: "180px",
                                        objectFit: "cover"
                                    }}

                                />

                            </div>

                            <div className="col-md-8">

                                <table className="table">

                                    <tbody>

                                        <tr>

                                            <th>Business Name</th>

                                            <td>{vendor.business_name}</td>

                                        </tr>

                                        <tr>

                                            <th>Owner</th>

                                            <td>{vendor.owner_name}</td>

                                        </tr>

                                        <tr>

                                            <th>Email</th>

                                            <td>{vendor.email}</td>

                                        </tr>

                                        <tr>

                                            <th>Phone</th>

                                            <td>{vendor.phone}</td>

                                        </tr>

                                        <tr>

                                            <th>Business Type</th>

                                            <td>{vendor.business_type}</td>

                                        </tr>

                                        <tr>

                                            <th>Address</th>

                                            <td>{vendor.address}</td>

                                        </tr>

                                        <tr>

                                            <th>Description</th>

                                            <td>{vendor.description}</td>

                                        </tr>

                                        <tr>

                                            <th>Status</th>

                                            <td>{vendor.status}</td>

                                        </tr>

                                        <tr>

                                            <th>Products Uploaded</th>

                                            <td>{productCount}</td>

                                        </tr>

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </AdminLayout>

    );

}

export default VendorDetails;