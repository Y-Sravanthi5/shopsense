import { useEffect, useState } from "react";
import axios from "axios";
import CustomerNavbar from "./components/CustomerNavbar";

function CustomerOrders() {

    const customerId = localStorage.getItem("customer_id");

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = () => {

        axios
            .get(`http://127.0.0.1:8000/orders/${customerId}`)
            .then((res) => {
                setOrders(res.data);
            })
            .catch((err) => console.log(err));

    };

    return (

        <>
            <CustomerNavbar />

            <div className="container mt-4">

                <h2 className="mb-4">
                    My Orders
                </h2>

                {
                    orders.length === 0 ?

                        <div className="alert alert-info">

                            No Orders Found

                        </div>

                    :

                    orders.map((order) => (

                        <div
                            className="card mb-3 shadow"
                            key={order.id}
                        >

                            <div className="card-body">

                                <h5>

                                    Order ID :
                                    {" "}
                                    {order.id}

                                </h5>

                                <h6>

                                    Total :
                                    {" "}
                                    ₹{order.total_amount}

                                </h6>

                                <p>

                                    Payment :
                                    {" "}
                                    {order.payment_method}

                                </p>

                                <p>

    Status :
    {" "}
    {order.order_status}

</p>

<button
    className="btn btn-primary"
    onClick={() => window.location.href = `/customer/order/${order.id}`}
>
    View Details
</button>
                                <p>

                                    Date :
                                    {" "}
                                    {new Date(order.created_at).toLocaleString()}

                                </p>

                            </div>

                        </div>

                    ))

                }

            </div>

        </>

    );

}

export default CustomerOrders;