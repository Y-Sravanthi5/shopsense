import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CustomerNavbar from "./components/CustomerNavbar";
import ProductCard from "../../components/ProductCard";
import "../../styles/productDetails.css";

function ProductDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const customerId = localStorage.getItem("customer_id");

    const [product, setProduct] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadProduct();
        loadRecommendations();

    }, [id]);

    const loadProduct = () => {

        axios
            .get(`http://127.0.0.1:8000/products/${id}`)
            .then((res) => {

                setProduct(res.data);
                setLoading(false);

            })
            .catch((err) => {

                console.log(err);
                setLoading(false);

            });

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

        axios
            .post("http://127.0.0.1:8000/cart/add", {

                customer_id: customerId,
                product_id: product.id,
                quantity: 1

            })

            .then(() => {

                alert("Added to Cart");

            })

            .catch((err) => console.log(err));

    };

    const addWishlist = () => {

        axios
            .post("http://127.0.0.1:8000/wishlist/add", {

                customer_id: customerId,
                product_id: product.id

            })

            .then(() => {

                alert("Added to Wishlist");

            })

            .catch((err) => console.log(err));

    };

    const buyNow = async () => {

        try {

            await axios.post("http://127.0.0.1:8000/cart/add", {

                customer_id: customerId,
                product_id: product.id,
                quantity: 1

            });

            navigate("/customer/checkout");

        }

        catch (err) {

            console.log(err);

        }

    };

    if (loading) {

        return (

            <>
                <CustomerNavbar />

                <div className="product-loading">

                    <div className="loader-card">

                        <h2>Loading Product...</h2>

                    </div>

                </div>

            </>

        );

    }

    if (!product) {

        return (

            <>
                <CustomerNavbar />

                <div className="product-loading">

                    <div className="loader-card">

                        <h2>Product Not Found</h2>

                    </div>

                </div>

            </>

        );

    }

    return (
        <>
            <CustomerNavbar />

            <div className="product-details-page">

                <div className="product-container">

                    <div className="image-section">

                        <div className="image-card">

                            <img
                                src={`http://127.0.0.1:8000/uploads/${product.image}`}
                                alt={product.product_name}
                                className="product-image"
                            />

                            <div className="image-badge">

                                {product.discount}% OFF

                            </div>

                        </div>

                    </div>

                    <div className="details-section">

                        <span className="category-badge">

                            {product.category}

                        </span>

                        <h1 className="product-title">

                            {product.product_name}

                        </h1>

                        <div className="rating-row">

                            <span className="stars">

                                ★★★★☆

                            </span>

                            <span className="rating-text">

                                4.5 (2,143 Ratings)

                            </span>

                        </div>

                        <p className="description">

                            {product.description}

                        </p>

                        <div className="price-container">

                            <div className="current-price">

                                ₹{product.price}

                            </div>

                            <div className="price-info">

                                <span className="old-price">

                                    ₹{product.original_price}

                                </span>

                                <span className="discount-text">

                                    {product.discount}% OFF

                                </span>

                            </div>

                        </div>

                        <div className="stock-section">

                            {

                                product.stock > 0 ?

                                    <span className="stock available">

                                        ✔ In Stock ({product.stock} Available)

                                    </span>

                                    :

                                    <span className="stock unavailable">

                                        ✖ Out of Stock

                                    </span>

                            }

                        </div>
                                        <div className="button-group">

                    <button
                        className="cart-btn"
                        onClick={addToCart}
                    >
                        🛒 Add to Cart
                    </button>

                    <button
                        className="wishlist-btn"
                        onClick={addWishlist}
                    >
                        ❤ Wishlist
                    </button>

                    <button
                        className="buy-btn"
                        onClick={buyNow}
                    >
                        Buy Now
                    </button>

                </div>

                <div className="service-grid">

                    <div className="service-card">

                        <div className="service-icon">
                            🚚
                        </div>

                        <div>

                            <h5>Free Delivery</h5>

                            <p>
                                On eligible orders
                            </p>

                        </div>

                    </div>

                    <div className="service-card">

                        <div className="service-icon">
                            🔒
                        </div>

                        <div>

                            <h5>Secure Payment</h5>

                            <p>
                                100% protected checkout
                            </p>

                        </div>

                    </div>

                    <div className="service-card">

                        <div className="service-icon">
                            🔄
                        </div>

                        <div>

                            <h5>Easy Returns</h5>

                            <p>
                                Hassle-free return policy
                            </p>

                        </div>

                    </div>

                    <div className="service-card">

                        <div className="service-icon">
                            🤖
                        </div>

                        <div>

                            <h5>AI Recommended</h5>

                            <p>
                                Suggested based on shopping trends
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

        <div className="recommendation-section">

    <div className="section-header">

        <h2>Recommended Products</h2>

        <p>You may also like these products</p>

    </div>

    <div className="recommendation-grid">

        {
            recommendations.length === 0 ?

                <div className="no-products">

                    <h3>No Recommendations Available</h3>

                    <p>
                        We'll recommend products based on your shopping history.
                    </p>

                </div>

            :

                recommendations.map((item) => (

                    <ProductCard
                        key={item.id}
                        product={item}
                    />

                ))
        }

    </div>

</div>

</div>

</>

);

}

export default ProductDetails;
            