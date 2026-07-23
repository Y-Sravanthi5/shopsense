function Hero() {
  return (
    <section
  id="home"
      style={{
        background: "linear-gradient(135deg,#EEF2FF,#F8FAFC)",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center"
      }}
    >
      <div className="container">

        <div className="row align-items-center">

          {/* Left */}

          <div className="col-lg-6">

            <span
              className="badge"
              style={{
                background: "#E9D5FF",
                color: "#5B3CC4",
                padding: "10px 18px",
                borderRadius: "30px",
                fontSize: "15px"
              }}
            >
              🤖 AI Powered Commerce Platform
            </span>

            <h1
              className="fw-bold mt-4"
              style={{
                fontSize: "4rem",
                color: "#1E293B",
                lineHeight: "1.2"
              }}
            >
              Smart Marketplace
              <br />
              for Modern
              <span style={{ color: "#5B3CC4" }}>
                {" "}Businesses
              </span>
            </h1>

            <p
              className="mt-4"
              style={{
                color: "#64748B",
                fontSize: "18px",
                lineHeight: "32px"
              }}
            >
              Manage products, inventory, vendors and analytics
              using AI-powered insights in one intelligent
              marketplace platform.
            </p>

            <div className="mt-5">

              <button
                className="btn me-3"
                style={{
                  background: "#5B3CC4",
                  color: "white",
                  padding: "14px 28px",
                  borderRadius: "12px"
                }}
              >
                Get Started
              </button>

              <button
                className="btn btn-outline-dark"
                style={{
                  padding: "14px 28px",
                  borderRadius: "12px"
                }}
              >
                Learn More
              </button>

            </div>

          </div>

          {/* Right */}

          <div className="col-lg-6">

            <div
              style={{
                background: "white",
                borderRadius: "25px",
                padding: "35px",
                boxShadow: "0 20px 50px rgba(0,0,0,.08)"
              }}
            >

              <h4 className="fw-bold mb-4">
                📊 Marketplace Overview
              </h4>

              <div className="row text-center">

                <div className="col-6 mb-4">
                  <h2 style={{ color: "#5B3CC4" }}>1200+</h2>
                  <p>Products</p>
                </div>

                <div className="col-6 mb-4">
                  <h2 style={{ color: "#10B981" }}>350+</h2>
                  <p>Vendors</p>
                </div>

                <div className="col-6">
                  <h2 style={{ color: "#F59E0B" }}>₹12L+</h2>
                  <p>Revenue</p>
                </div>

                <div className="col-6">
                  <h2 style={{ color: "#EF4444" }}>98%</h2>
                  <p>Accuracy</p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;