function HowItWorks() {

  const steps = [
    {
      number: "01",
      title: "Register",
      description: "Create your vendor account in a few simple steps."
    },
    {
      number: "02",
      title: "Login",
      description: "Access your secure ShopSense dashboard."
    },
    {
      number: "03",
      title: "Add Products",
      description: "Upload and manage your products easily."
    },
    {
      number: "04",
      title: "Manage Inventory",
      description: "Track stock levels and receive smart alerts."
    },
    {
      number: "05",
      title: "View Analytics",
      description: "Monitor sales and business performance."
    }
  ];

  return (

    <section
      id="about"
      className="py-5 bg-white"
    >

      <div className="container">

        <div className="text-center mb-5">

          <h2 className="fw-bold">
            How ShopSense Works
          </h2>

          <p className="text-muted">
            Start managing your business in just five simple steps.
          </p>

        </div>

        <div className="row g-4">

          {steps.map((step) => (

            <div
              className="col-md-6 col-lg-4"
              key={step.number}
            >

              <div
                className="p-4 h-100"
                style={{
                  borderRadius: "20px",
                  background: "#F8FAFC",
                  boxShadow: "0 10px 30px rgba(0,0,0,.05)"
                }}
              >

                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "#5B3CC4",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                    fontSize: "22px"
                  }}
                >
                  {step.number}
                </div>

                <h4 className="mt-4">
                  {step.title}
                </h4>

                <p className="text-muted mt-3">
                  {step.description}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}

export default HowItWorks;