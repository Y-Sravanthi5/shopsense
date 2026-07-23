import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CustomerNavbar from "./components/CustomerNavbar";

function Cart() {

    const customerId = localStorage.getItem("customer_id");

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const DELIVERY_CHARGE = 50;

   useEffect(() => {

    if (!customerId) {
        alert("Please login first");
        return;
    }

    loadCart();

}, []);

    const loadCart = () => {

        setLoading(true);

        axios
            .get(`http://127.0.0.1:8000/cart/${customerId}`)
            .then((res) => {

                setCartItems(res.data);

                setLoading(false);

            })
            .catch((err) => {

                console.log(err);

                setLoading(false);

            });

    };

    const increaseQty = (item) => {

        if (item.quantity >= item.stock) {
            alert("Maximum stock reached");
            return;
        }

        axios.put(`http://127.0.0.1:8000/cart/${item.id}`, {

            quantity: item.quantity + 1

        })

        .then(() => loadCart())

        .catch((err) => console.log(err));

    };

    const decreaseQty = (item) => {

        if (item.quantity <= 1) {

            removeItem(item.id);

            return;

        }

        axios.put(`http://127.0.0.1:8000/cart/${item.id}`, {

            quantity: item.quantity - 1

        })

        .then(() => loadCart())

        .catch((err) => console.log(err));

    };

    const removeItem = (id) => {

        if (!window.confirm("Remove this product?"))
            return;

        axios
            .delete(`http://127.0.0.1:8000/cart/${id}`)

            .then(() => loadCart())

            .catch((err) => console.log(err));

    };

    const subtotal = cartItems.reduce((sum, item) => {

        return sum + item.price * item.quantity;

    }, 0);

    const discount = subtotal > 5000 ? subtotal * 0.10 : 0;

    const delivery = cartItems.length === 0 ? 0 : DELIVERY_CHARGE;

    const grandTotal = subtotal - discount + delivery;

    if (loading) {

        return (

            <>
                <CustomerNavbar />

                <div className="container mt-5 text-center">

                    <div
                        className="spinner-border text-primary"
                    ></div>

                    <h5 className="mt-3">
                        Loading Cart...
                    </h5>

                </div>

            </>

        );

    }

    if (cartItems.length === 0) {

        return (

            <>
                <CustomerNavbar />

                <div className="container text-center mt-5">

                    <img
                        src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                        alt=""
                        width="170"
                    />

                    <h2 className="mt-4">
                        Your Cart is Empty
                    </h2>

                    <p className="text-muted">

                        Looks like you haven't added anything yet.

                    </p>

                    <Link
                        to="/customer/products"
                        className="btn btn-primary"
                    >

                        Continue Shopping

                    </Link>

                </div>

            </>

        );

    }

    return (

        <>
            <CustomerNavbar />

            <div className="container mt-4">

                <h2 className="fw-bold mb-4">

                    Shopping Cart

                </h2>

                <div className="row">

                    <div className="col-lg-8">

                        {
                            cartItems.map((item) => (

                                <div
                                    className="card mb-3 shadow-sm"
                                    key={item.id}
                                >

                                    <div className="row g-0">

                                        <div className="col-md-3">

                                            <img
                                                src={`http://127.0.0.1:8000/uploads/${item.image}`}
                                                alt={item.product_name}
                                                className="img-fluid rounded-start"
                                                style={{
                                                    height: "180px",
                                                    objectFit: "cover"
                                                }}
                                            />

                                        </div>

                                        <div className="col-md-9">

                                            <div className="card-body">

                                                <h5>

                                                    {item.product_name}

                                                </h5>

                                                <h4 className="text-success">

                                                    ₹{item.price}

                                                </h4>

                                                <p>

                                                    Stock Available :

                                                    <strong>

                                                        {" "}

                                                        {item.stock}

                                                    </strong>

                                                </p>

                                                <div className="d-flex align-items-center mb-3">

                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        onClick={() => decreaseQty(item)}
                                                    >

                                                        -

                                                    </button>

                                                    <span
                                                        className="mx-3 fs-5"
                                                    >

                                                        {item.quantity}

                                                    </span>

                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        onClick={() => increaseQty(item)}
                                                    >

                                                        +

                                                    </button>

                                                </div>

                                                <h5>

                                                    Subtotal :

                                                    ₹{item.price * item.quantity}

                                                </h5>

                                                <button
                                                    className="btn btn-danger mt-2"
                                                    onClick={() => removeItem(item.id)}
                                                >

                                                    Remove

                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            ))
                        }

                    </div>
                                        {/* Order Summary */}

                    <div className="col-lg-4">

                        <div className="card shadow">

                            <div className="card-header bg-primary text-white">

                                <h4 className="mb-0">
                                    Order Summary
                                </h4>

                            </div>

                            <div className="card-body">

                                <div className="d-flex justify-content-between mb-3">

                                    <span>
                                        Items
                                    </span>

                                    <strong>
                                        {cartItems.length}
                                    </strong>

                                </div>

                                <div className="d-flex justify-content-between mb-3">

                                    <span>
                                        Subtotal
                                    </span>

                                    <strong>
                                        ₹{subtotal.toFixed(2)}
                                    </strong>

                                </div>

                                <div className="d-flex justify-content-between mb-3">

                                    <span>
                                        Discount
                                    </span>

                                    <span className="text-success">

                                        - ₹{discount.toFixed(2)}

                                    </span>

                                </div>

                                <div className="d-flex justify-content-between mb-3">

                                    <span>
                                        Delivery Charges
                                    </span>

                                    <strong>
                                        ₹{delivery.toFixed(2)}
                                    </strong>

                                </div>

                                <hr />

                                <div className="d-flex justify-content-between">

                                    <h4>Total</h4>

                                    <h4 className="text-success">

                                        ₹{grandTotal.toFixed(2)}

                                    </h4>

                                </div>

                                <hr />

                                <Link
                                    to="/customer/checkout"
                                    className="btn btn-success w-100 btn-lg mb-2"
                                >

                                    Proceed to Checkout

                                </Link>

                                <Link
                                    to="/customer/products"
                                    className="btn btn-outline-primary w-100"
                                >

                                    Continue Shopping

                                </Link>

                            </div>

                        </div>

                        <div className="card mt-4 shadow-sm">

                            <div className="card-body">

                                <h5 className="mb-3">
                                    Why Shop With Us?
                                </h5>

                                <ul className="list-unstyled">

                                    <li className="mb-2">
                                        🚚 Fast Delivery
                                    </li>

                                    <li className="mb-2">
                                        🔒 Secure Payments
                                    </li>

                                    <li className="mb-2">
                                        🔄 Easy Returns
                                    </li>

                                    <li className="mb-2">
                                        💯 Genuine Products
                                    </li>

                                </ul>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Cart;