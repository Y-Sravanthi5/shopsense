import { useEffect, useState } from "react";
import axios from "axios";
import CustomerNavbar from "./components/CustomerNavbar";

function Wishlist() {
    const [wishlist, setWishlist] = useState([]);

    const customerId = localStorage.getItem("customer_id");

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            const res = await axios.get(
                `http://127.0.0.1:8000/wishlist/${customerId}`
            );
            setWishlist(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <CustomerNavbar />

            <div className="container mt-5">
                <h2>My Wishlist</h2>
                <hr />

                {wishlist.length === 0 ? (
                    <h5>No products in wishlist.</h5>
                ) : (
                    <div className="row">
                        {wishlist.map((item) => (
                            <div className="col-md-4 mb-4" key={item.wishlist_id}>
                                <div className="card h-100">
                                    <img
                                        src={`http://127.0.0.1:8000/uploads/${item.image}`}
                                        className="card-img-top"
                                        alt={item.product_name}
                                        style={{ height: "220px", objectFit: "cover" }}
                                    />

                                    <div className="card-body">
                                        <h5>{item.product_name}</h5>
                                        <p>{item.category}</p>
                                        <h4>₹{item.price}</h4>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Wishlist;