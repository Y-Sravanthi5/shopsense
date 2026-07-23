import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import API from "../../services/api";

function CustomerSegmentation() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {

        loadSegmentation();

    }, []);

    const loadSegmentation = async () => {

        try {

            const res = await API.get("/admin/customer-segmentation");

            setCustomers(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <AdminLayout>

            <h2 className="mb-4">

                Customer Segmentation

            </h2>

            <div className="card shadow">

                <div className="card-body">

                    <table className="table table-bordered table-hover text-center align-middle">

                        <thead className="table-dark">

                            <tr>

                                <th>ID</th>

                                <th>Customer Name</th>

                                <th>Orders</th>

                                <th>Total Spent</th>

                                <th>Last Purchase (Days)</th>

                                <th>Segment</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                customers.length === 0 ?

                                    (

                                        <tr>

                                            <td colSpan="6">

                                                No Customer Data Found

                                            </td>

                                        </tr>

                                    )

                                    :

                                    customers.map((customer) => (

                                        <tr key={customer.customer_id}>

                                            <td>

                                                {customer.customer_id}

                                            </td>

                                            <td>

                                                {customer.customer_name}

                                            </td>

                                            <td>

                                                {customer.frequency}

                                            </td>

                                            <td>

                                                ₹ {customer.monetary}

                                            </td>

                                            <td>

                                                {

                                                    customer.recency_days === null

                                                        ?

                                                        "-"

                                                        :

                                                        customer.recency_days

                                                }

                                            </td>

                                            <td>

                                                {

                                                    customer.segment === "Premium"

                                                        ?

                                                        <span className="badge bg-success">

                                                            Premium

                                                        </span>

                                                        :

                                                        customer.segment === "Regular"

                                                            ?

                                                            <span className="badge bg-primary">

                                                                Regular

                                                            </span>

                                                            :

                                                            customer.segment === "Occasional"

                                                                ?

                                                                <span className="badge bg-warning text-dark">

                                                                    Occasional

                                                                </span>

                                                                :

                                                                <span className="badge bg-secondary">

                                                                    New

                                                                </span>

                                                }

                                            </td>

                                        </tr>

                                    ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </AdminLayout>

    );

}

export default CustomerSegmentation;