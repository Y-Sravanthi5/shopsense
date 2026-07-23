import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CustomerNavbar from "./components/CustomerNavbar";

function OrderDetails() {

    const { id } = useParams();

    const [items, setItems] = useState([]);

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = () => {

        axios
            .get(`http://127.0.0.1:8000/order/${id}`)
            .then((res) => {
                setItems(res.data);
            })
            .catch((err) => console.log(err));

    };

    return (

        <>
            <CustomerNavbar />

            <div className="container mt-4">

                <h2 className="mb-4">
                    Order Details
                </h2>

                <table className="table table-bordered table-hover">

                    <thead className="table-dark">

                        <tr>

                            <th>Product ID</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            items.map((item) => (

                                <tr key={item.id}>

                                    <td>{item.product_id}</td>

                                    <td>{item.quantity}</td>

                                    <td>₹{item.price}</td>

                                    <td>₹{item.quantity * item.price}</td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

        </>

    );

}

export default OrderDetails;