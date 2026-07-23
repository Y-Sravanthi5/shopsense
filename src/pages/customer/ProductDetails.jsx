import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CustomerNavbar from "./components/CustomerNavbar";

function ProductDetails() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [recommendations, setRecommendations] = useState([]);

    const customerId = localStorage.getItem("customer_id");

    useEffect(() => {

        loadProduct();
        loadRecommendations();

    }, [id]);

    const loadProduct = () => {

        axios
            .get(`http://127.0.0.1:8000/products/${id}`)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => console.log(err));

    };

    const loadRecommendations = () => {

        axios
            .get(`http://127.0.0.1:8000/products/${id}/recommendations`)
            .then((res) => {
                setRecommendations(res.data);
            })
            .catch((err) => console.log(err));

    };

    const addToCart = () => {

        axios.post("http://127.0.0.1:8000/cart/add", {

            customer_id: customerId,

            product_id: product.id,

            quantity: 1

        })

        .then(() => alert("Added to Cart"))

        .catch((err) => console.log(err));

    };

    const addWishlist = () => {

        axios.post("http://127.0.0.1:8000/wishlist/add", {

            customer_id: customerId,

            product_id: product.id

        })

        .then(() => alert("Added to Wishlist"))

        .catch((err) => console.log(err));

    };

    if (!product) {

        return (

            <>
                <CustomerNavbar />

                <div className="container mt-5">

                    <h2>Loading...</h2>

                </div>

            </>

        );

    }

    return (

        <>

            <CustomerNavbar />

            <div className="container mt-5">

                <div className="row">

                    <div className="col-md-5">

                        <img
                            src={`http://127.0.0.1:8000/uploads/${product.image}`}
                            alt={product.product_name}
                            className="img-fluid rounded shadow"
                        />

                    </div>

                    <div className="col-md-7">

                        <h2>{product.product_name}</h2>

                        <span className="badge bg-secondary">
                            {product.category}
                        </span>

                        <div className="mt-3">

                            ⭐⭐⭐⭐☆
                            <span className="ms-2">(4.5)</span>

                        </div>

                        <p className="mt-3">

                            {product.description}

                        </p>

                        <h5>

                            <span className="text-decoration-line-through text-secondary">

                                ₹{product.original_price}

                            </span>

                            <span className="badge bg-danger ms-3">

                                {product.discount}% OFF

                            </span>

                        </h5>

                        <h2 className="text-success">

                            ₹{product.price}

                        </h2>

                        <h5>

                            Stock : {product.stock}

                        </h5>

                        <div className="mt-4">

                            <button
                                className="btn btn-success me-3"
                                onClick={addToCart}
                            >
                                🛒 Add to Cart
                            </button>

                            <button
                                className="btn btn-outline-danger me-3"
                                onClick={addWishlist}
                            >
                                ❤ Wishlist
                            </button>

                            <button
                                className="btn btn-warning"
                            >
                                Buy Now
                            </button>

                        </div>

                    </div>

                </div>

                <hr className="my-5" />

                <h3 className="mb-4">

                    Recommended Products

                </h3>

                <div className="row">

                    {

                        recommendations.length === 0 ?

                        <h5>No recommendations available.</h5>

                        :

                        recommendations.map((item) => (

                            <div
                                className="col-md-3 mb-4"
                                key={item.id}
                            >

                                <div className="card h-100 shadow">

                                    <img
                                        src={`http://127.0.0.1:8000/uploads/${item.image}`}
                                        alt={item.product_name}
                                        className="card-img-top"
                                        style={{
                                            height: "220px",
                                            objectFit: "cover"
                                        }}
                                    />

                                    <div className="card-body text-center">

                                        <h5>

                                            {item.product_name}

                                        </h5>

                                        <p className="text-success">

                                            ₹{item.price}

                                        </p>

                                        <span className="badge bg-secondary">

                                            {item.category}

                                        </span>

                                    </div>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

        </>

    );

}

export default ProductDetails;