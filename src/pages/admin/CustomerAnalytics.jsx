import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import API from "../../services/api";

function CustomerAnalytics() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {

        loadCustomers();

    }, []);

    const loadCustomers = async () => {

        try {

            const res = await API.get("/analytics/customers");

            setCustomers(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <AdminLayout>

            <h2 className="mb-4">

                Customer Analytics

            </h2>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                        <th>Customer ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Total Orders</th>
                        <th>Total Spending</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        customers.map((customer) => (

                            <tr key={customer.customer_id}>

                                <td>{customer.customer_id}</td>

                                <td>{customer.name}</td>

                                <td>{customer.email}</td>

                                <td>{customer.total_orders}</td>

                                <td>₹{customer.total_spending}</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </AdminLayout>

    );

}

export default CustomerAnalytics;