function Features() {

  const features = [
    {
      icon: "🤖",
      title: "AI Analytics",
      description:
        "Get intelligent insights about sales, inventory and business growth."
    },
    {
      icon: "📦",
      title: "Inventory Management",
      description:
        "Track stock levels and receive low-stock alerts instantly."
    },
    {
      icon: "🏪",
      title: "Marketplace Management",
      description:
        "Manage vendors and products from one centralized dashboard."
    },
    {
      icon: "📊",
      title: "Reports",
      description:
        "Generate revenue reports and analyze product performance."
    },
    {
      icon: "🔒",
      title: "Secure Platform",
      description:
        "Vendor authentication and secure data management."
    },
    {
      icon: "⚡",
      title: "Fast Performance",
      description:
        "Optimized architecture with React, FastAPI and MySQL."
    }
  ];

  return (

    <section
      id="features"
      className="py-5"
      style={{
        background: "#F8FAFC"
      }}
    >

      <div className="container">

        <div className="text-center mb-5">

          <h2
            className="fw-bold"
            style={{
              color: "#1E293B"
            }}
          >
            Why Choose ShopSense?
          </h2>

          <p
            className="text-muted"
            style={{
              maxWidth: "700px",
              margin: "auto"
            }}
          >
            Everything you need to manage your marketplace efficiently,
            powered by modern technologies and AI-driven insights.
          </p>

        </div>

        <div className="row g-4">

          {features.map((feature, index) => (

            <div className="col-md-6 col-lg-4" key={index}>

              <div
                className="h-100 p-4"
                style={{
                  background: "white",
                  borderRadius: "20px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                  transition: "0.3s"
                }}
              >

                <div
                  style={{
                    fontSize: "40px"
                  }}
                >
                  {feature.icon}
                </div>

                <h4 className="mt-3 fw-bold">
                  {feature.title}
                </h4>

                <p className="text-muted mt-3">
                  {feature.description}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );
}

export default Features;