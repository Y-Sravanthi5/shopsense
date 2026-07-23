import { useEffect, useState } from "react";
import axios from "axios";


function SalesReport() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadSales();
    }, []);

    const loadSales = () => {

        axios
            .get("http://127.0.0.1:8000/admin/sales")
            .then((res) => {
                setOrders(res.data);
            })
            .catch((err) => console.log(err));

    };

    const totalRevenue = orders.reduce(
        (sum, order) => sum + order.total_amount,
        0
    );

    return (

        <>

            <div className="container mt-4">

                <h2 className="mb-4">
                    Sales Report
                </h2>

                <div className="alert alert-success">

                    <h4>
                        Total Revenue :
                        ₹{totalRevenue.toFixed(2)}
                    </h4>

                </div>

                <table className="table table-bordered table-hover">

                    <thead className="table-dark">

                        <tr>

                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Date</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            orders.map((order) => (

                                <tr key={order.id}>

                                    <td>{order.id}</td>

                                    <td>{order.customer_id}</td>

                                    <td>₹{order.total_amount}</td>

                                    <td>{order.order_status}</td>

                                    <td>

                                        {new Date(order.created_at).toLocaleString()}

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </>

    );

}

export default SalesReport;