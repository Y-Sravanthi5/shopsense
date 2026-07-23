function Reports() {
  return (
    <div className="container mt-5">

      <h2 className="mb-4">
        Sales Analytics Dashboard
      </h2>

      <div className="row">

        <div className="col-md-3">
          <div className="card shadow text-center p-3">
            <h3>₹1,25,000</h3>
            <p>Total Revenue</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center p-3">
            <h3>250</h3>
            <p>Total Orders</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center p-3">
            <h3>150</h3>
            <p>Products Sold</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center p-3">
            <h3>25</h3>
            <p>Active Vendors</p>
          </div>
        </div>

      </div>

      <div className="card shadow mt-5 p-4">

        <h4>Sales Summary</h4>

        <table className="table mt-3">

          <thead className="table-dark">

            <tr>
              <th>Month</th>
              <th>Revenue</th>
              <th>Orders</th>
            </tr>

          </thead>

          <tbody>

            <tr>
              <td>January</td>
              <td>₹30,000</td>
              <td>45</td>
            </tr>

            <tr>
              <td>February</td>
              <td>₹42,000</td>
              <td>61</td>
            </tr>

            <tr>
              <td>March</td>
              <td>₹53,000</td>
              <td>82</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Reports;