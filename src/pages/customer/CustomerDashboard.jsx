import { Link } from "react-router-dom";
import { BarChart3 } from "lucide-react";
import {
  Store,
  ShoppingBag,
  Heart,
  ShoppingCart,
  PackageCheck,
  Laptop,
  Shirt,
  House,
  Dumbbell,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  BadgePercent,
} from "lucide-react";

import "../../styles/customerDashboard.css";
import { GrOrderedList } from "react-icons/gr";
import { CgProductHunt } from "react-icons/cg";

function CustomerDashboard() {
  const customerName =
    localStorage.getItem("customer_name") || "Customer";

  const categories = [
    {
      name: "Electronics",
      icon: Laptop,
      description: "Devices & accessories",
    },
    {
      name: "Fashion",
      icon: Shirt,
      description: "Trending styles",
    },
    {
      name: "Home & Kitchen",
      icon: House,
      description: "Everything for your home",
    },
    {
      name: "Sports",
      icon: Dumbbell,
      description: "Fitness & sports gear",
    },
  ];

  const quickLinks = [
    {
      title: "Browse Products",
      description: "Explore products from our marketplace.",
      icon: ShoppingBag,
      path: "/customer/products",
    },
    {
      title: "Wishlist",
      description: "View products you've saved for later.",
      icon: Heart,
      path: "/customer/wishlist",
    },
    {
      title: "My Cart",
      description: "Review products waiting in your cart.",
      icon: ShoppingCart,
      path: "/customer/cart",
    },
    {
      title: "My Orders",
      description: "View and track your previous orders.",
      icon: PackageCheck,
      path: "/customer/orders",
    },
  ];

  return (
    <div className="customer-home">

      {/* ================= NAVBAR ================= */}

      <header className="customer-navbar">

        <Link
          to="/customer/dashboard"
          className="customer-brand"
        >
          <div className="customer-brand-icon">
            <Store size={21} />
          </div>

          <div>
            <strong>ShopSense</strong>
            <span>Marketplace</span>
          </div>
        </Link>

        <nav className="customer-nav-links">

          <Link to="/customer/products">
          <Store size={18}/>
            Products
          </Link>

          <Link to="/customer/wishlist">
            <Heart size={18} />
            Wishlist
          </Link>

          <Link to="/customer/cart">
            <ShoppingCart size={18} />
            Cart
          </Link>

          <Link to="/customer/orders">
          <ShoppingBag size={18}/>
            Orders
          </Link>
          <Link to="/customer/analytics" className="nav-link">
    <BarChart3 size={18} />
    <span>Analytics</span>
</Link>

        </nav>

      </header>


      {/* ================= HERO ================= */}

      <section className="customer-hero">

        <div className="customer-hero-content">

          <div className="customer-welcome-badge">
            <Sparkles size={15} />
            Welcome back, {customerName}
          </div>

          <h1>
            Discover products
            <span> you'll love.</span>
          </h1>

          <p>
            Shop smarter with ShopSense. Explore products
            from trusted sellers and discover great deals
            across your favourite categories.
          </p>

          <div className="customer-hero-actions">

            <Link
              to="/customer/products"
              className="customer-primary-btn"
            >
              Start Shopping
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/customer/orders"
              className="customer-secondary-btn"
            >
              View Orders
            </Link>

          </div>

        </div>


        {/* HERO RIGHT SIDE */}

        <div className="customer-hero-visual">

          <div className="customer-shopping-icon">
            <ShoppingBag size={55} />
          </div>

          <div className="customer-hero-stat stat-one">
            <BadgePercent size={19} />

            <div>
              <strong>Great Deals</strong>
              <span>Save more every day</span>
            </div>
          </div>

          <div className="customer-hero-stat stat-two">
            <ShieldCheck size={19} />

            <div>
              <strong>Trusted Shopping</strong>
              <span>Shop with confidence</span>
            </div>
          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section className="customer-features">

        <div className="customer-feature">

          <div className="customer-feature-icon">
            <Truck size={20} />
          </div>

          <div>
            <strong>Easy Shopping</strong>
            <span>Simple and convenient experience</span>
          </div>

        </div>

        <div className="customer-feature">

          <div className="customer-feature-icon">
            <ShieldCheck size={20} />
          </div>

          <div>
            <strong>Trusted Sellers</strong>
            <span>Products from marketplace vendors</span>
          </div>

        </div>

        <div className="customer-feature">

          <div className="customer-feature-icon">
            <BadgePercent size={20} />
          </div>

          <div>
            <strong>Best Value</strong>
            <span>Discover competitive prices</span>
          </div>

        </div>

      </section>


      <main className="customer-main">

        {/* ================= CATEGORIES ================= */}

        <section className="customer-section">

          <div className="customer-section-heading">

            <div>
              <span className="customer-section-label">
                CATEGORIES
              </span>

              <h2>Shop by Category</h2>

              <p>
                Find what you're looking for faster.
              </p>
            </div>

            <Link
              to="/customer/products"
              className="customer-view-all"
            >
              View all
              <ArrowRight size={15} />
            </Link>

          </div>


          <div className="customer-category-grid">

            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  to="/customer/products"
                  className="customer-category-card"
                  key={category.name}
                >

                  <div className="customer-category-icon">
                    <Icon size={27} />
                  </div>

                  <h3>{category.name}</h3>

                  <p>{category.description}</p>

                  <span className="customer-category-arrow">
                    <ArrowRight size={16} />
                  </span>

                </Link>
              );
            })}

          </div>

        </section>


        {/* ================= QUICK ACCESS ================= */}

        <section className="customer-section">

          <div className="customer-section-heading">

            <div>
              <span className="customer-section-label">
                YOUR SHOPPING
              </span>

              <h2>Quick Access</h2>

              <p>
                Everything you need in one place.
              </p>
            </div>

          </div>


          <div className="customer-quick-grid">

            {quickLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  to={item.path}
                  className="customer-quick-card"
                  key={item.title}
                >

                  <div className="customer-quick-icon">
                    <Icon size={23} />
                  </div>

                  <div className="customer-quick-content">

                    <h3>{item.title}</h3>

                    <p>
                      {item.description}
                    </p>

                  </div>

                  <ArrowRight
                    size={18}
                    className="customer-quick-arrow"
                  />

                </Link>
              );
            })}

          </div>

        </section>


        {/* ================= PROMO ================= */}

        <section className="customer-promo">

          <div className="customer-promo-icon">
            <BadgePercent size={29} />
          </div>

          <div className="customer-promo-content">

            <span>LIMITED TIME DEALS</span>

            <h2>
              Discover today's best offers
            </h2>

            <p>
              Explore products and find great prices across
              the ShopSense marketplace.
            </p>

          </div>

          <Link
            to="/customer/products"
            className="customer-promo-button"
          >
            Explore Deals
            <ArrowRight size={16} />
          </Link>

        </section>

      </main>


      {/* ================= FOOTER ================= */}

      <footer className="customer-footer">

        <div className="customer-footer-brand">
          <Store size={18} />

          <strong>ShopSense</strong>
        </div>

        <p>
          Smart shopping. Better choices.
        </p>

      </footer>

    </div>
  );
}

export default CustomerDashboard;