function Footer() {
  return (
    <footer
  id="contact"
      id="contact"
      style={{
        background: "#111827",
        color: "white",
        padding: "70px 0 30px"
      }}
    >
      <div className="container">

        <div className="row">

          <div className="col-lg-4">

            <h2
              className="fw-bold"
              style={{ color: "#A78BFA" }}
            >
              🛍 ShopSense
            </h2>

            <p className="mt-3 text-light">
              AI Powered Commerce Platform for
              intelligent marketplace management,
              inventory tracking and business analytics.
            </p>

          </div>

          <div className="col-lg-2">

            <h5>Platform</h5>

            <p>Home</p>
            <p>Features</p>
            <p>Dashboard</p>
            <p>Reports</p>

          </div>

          <div className="col-lg-3">

            <h5>Technologies</h5>

            <p>React.js</p>
            <p>FastAPI</p>
            <p>MySQL</p>
            <p>AI Analytics</p>

          </div>

          <div className="col-lg-3">

            <h5>Contact</h5>

            <p>📧 support@shopsense.com</p>

            <p>📞 +91 98765 43210</p>

            <p>📍 Hyderabad, India</p>

          </div>

        </div>

        <hr
          style={{
            margin: "40px 0",
            borderColor: "#374151"
          }}
        />

        <div className="text-center">

          © 2026 ShopSense • AI Powered Commerce Platform

        </div>

      </div>
    </footer>
  );
}

export default Footer;