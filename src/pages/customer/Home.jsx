import CustomerNavbar from "./components/CustomerNavbar";
import { Link } from "react-router-dom";
import "../../styles/home.css";

function Home() {
  return (
    <>
      <CustomerNavbar />

      <div className="home-page">

        <section className="hero-section">
          <div className="hero-content">

            <span className="hero-badge">
              🛍️ AI Powered Marketplace
            </span>

            <h1>
              Welcome to <span>ShopSense</span>
            </h1>

            <p>
              Discover trending products from trusted vendors, enjoy
              personalized recommendations, and shop smarter with AI.
            </p>

            <div className="hero-buttons">
              <Link to="/products" className="shop-btn">
                Shop Now
              </Link>

              <Link to="/customer/dashboard" className="explore-btn">
                Explore Dashboard
              </Link>
            </div>

          </div>

          <div className="hero-image">
            🛒
          </div>
        </section>

        <section className="features-section">

          <div className="feature-card">
            <div className="icon">⚡</div>
            <h4>Fast Delivery</h4>
            <p>Quick and secure deliveries from trusted vendors.</p>
          </div>

          <div className="feature-card">
            <div className="icon">🤖</div>
            <h4>AI Recommendations</h4>
            <p>Get personalized product suggestions based on your interests.</p>
          </div>

          <div className="feature-card">
            <div className="icon">💳</div>
            <h4>Secure Payments</h4>
            <p>Safe checkout experience with reliable payment options.</p>
          </div>

        </section>

      </div>
    </>
  );
}

export default Home;