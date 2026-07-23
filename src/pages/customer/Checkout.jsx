import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomerNavbar from "./components/CustomerNavbar";

function Checkout() {

    const navigate = useNavigate();

    const customerId = localStorage.getItem("customer_id");

    const [checkout, setCheckout] = useState({

        address: "",

        payment_method: "Cash on Delivery"

    });

    const handleChange = (e) => {

        setCheckout({

            ...checkout,

            [e.target.name]: e.target.value

        });

    };

    const placeOrder = () => {

        axios.post("http://127.0.0.1:8000/orders", {

            customer_id: Number(customerId),

            address: checkout.address,

            payment_method: checkout.payment_method

        })

        .then(() => {

            alert("Order Placed Successfully");

            navigate("/customer/orders");

        })

        .catch((err) => {

            console.log(err);

            alert("Unable to place order");

        });

    };

    return (

        <>

            <CustomerNavbar />

            <div className="container mt-5">

                <div className="row justify-content-center">

                    <div className="col-md-8">

                        <div className="card shadow">

                            <div className="card-header bg-success text-white">

                                <h3>Checkout</h3>

                            </div>

                            <div className="card-body">

                                <div className="mb-3">

                                    <label className="form-label">

                                        Delivery Address

                                    </label>

                                    <textarea

                                        className="form-control"

                                        rows="4"

                                        name="address"

                                        value={checkout.address}

                                        onChange={handleChange}

                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="form-label">

                                        Payment Method

                                    </label>

                                    <select

                                        className="form-select"

                                        name="payment_method"

                                        value={checkout.payment_method}

                                        onChange={handleChange}

                                    >

                                        <option>

                                            Cash on Delivery

                                        </option>

                                        <option>

                                            UPI

                                        </option>

                                        <option>

                                            Credit Card

                                        </option>

                                        <option>

                                            Debit Card

                                        </option>

                                    </select>

                                </div>

                                <button

                                    className="btn btn-success w-100"

                                    onClick={placeOrder}

                                >

                                    Place Order

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Checkout;