function Stats() {
  const stats = [
    {
      number: "1200+",
      title: "Products",
      color: "#5B3CC4"
    },
    {
      number: "350+",
      title: "Active Vendors",
      color: "#10B981"
    },
    {
      number: "₹12L+",
      title: "Revenue",
      color: "#F59E0B"
    },
    {
      number: "25+",
      title: "Categories",
      color: "#EF4444"
    }
  ];

  return (
    <section
      style={{
        background: "#ffffff",
        padding: "80px 0"
      }}
    >
      <div className="container">

        <div className="row text-center g-4">

          {stats.map((item, index) => (

            <div className="col-md-3" key={index}>

              <div
                className="p-4"
                style={{
                  background: "#F8FAFC",
                  borderRadius: "20px",
                  boxShadow: "0 10px 30px rgba(0,0,0,.05)",
                  transition: "0.3s"
                }}
              >
                <h1
                  className="fw-bold"
                  style={{
                    color: item.color
                  }}
                >
                  {item.number}
                </h1>

                <h5>{item.title}</h5>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Stats;