import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    FiShoppingBag,
    FiHeart,
    FiPackage,
    FiShoppingCart,
    FiLogOut
} from "react-icons/fi";

import "../../../styles/customerNavbar.css";

function CustomerNavbar() {

    const location = useLocation();
    const navigate = useNavigate();

    const customerName =
        (localStorage.getItem("customer_name") || "Customer").split(" ")[0];

    const isActive = (path) => location.pathname.startsWith(path);

    const handleLogout = () => {

        localStorage.removeItem("customer_id");
        localStorage.removeItem("customer_name");

        navigate("/");

    };

    return (

        <nav className="customer-navbar">

            <div className="customer-nav-container">

                {/* Logo */}

                <Link
                    to="/customer/products"
                    className="customer-logo"
                >
                    <FiShoppingBag />
                    <span>ShopSense</span>
                </Link>

                {/* Navigation */}

                <div className="customer-nav-links">

                    <Link
                        to="/customer/products"
                        className={isActive("/customer/products") ? "nav-btn active" : "nav-btn"}
                    >
                        <FiShoppingBag />
                        <span>Products</span>
                    </Link>

                    <Link
                        to="/customer/wishlist"
                        className={isActive("/customer/wishlist") ? "nav-btn active" : "nav-btn"}
                    >
                        <FiHeart />
                        <span>Wishlist</span>
                    </Link>

                    <Link
                        to="/customer/orders"
                        className={isActive("/customer/orders") ? "nav-btn active" : "nav-btn"}
                    >
                        <FiPackage />
                        <span>Orders</span>
                    </Link>

                    <Link
                        to="/customer/cart"
                        className={isActive("/customer/cart") ? "nav-btn active" : "nav-btn"}
                    >
                        <FiShoppingCart />
                        <span>Cart</span>
                    </Link>

                    {/* Greeting */}

                    <div className="customer-user">
                        👋 Hi, <strong>{customerName}</strong>
                    </div>

                    {/* Logout */}

                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        <FiLogOut />
                        <span>Logout</span>
                    </button>

                </div>

            </div>

        </nav>

    );

}

export default CustomerNavbar;