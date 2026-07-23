import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../services/api";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Reports() {

  const [report, setReport] = useState({});
  const [performance, setPerformance] = useState([]);

  useEffect(() => {

    const vendorId = localStorage.getItem("vendor_id");

    API.get(`/vendor/reports/${vendorId}`)
      .then((res) => {
        setReport(res.data);
      })
      .catch((err) => console.log(err));

    API.get(`/vendor/product-performance/${vendorId}`)
      .then((res) => {
        setPerformance(res.data);
      })
      .catch((err) => console.log(err));

  }, []);

  // =========================
  // Export PDF
  // =========================

  const exportPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Vendor Product Performance Report", 14, 20);

    autoTable(doc, {
      head: [["Product", "Units Sold", "Revenue"]],
      body: performance.map((item) => [
        item.product_name,
        item.units_sold,
        `₹ ${item.revenue}`
      ])
    });

    doc.save("Vendor_Report.pdf");

  };

  // =========================
  // Export Excel
  // =========================

  const exportExcel = () => {

    const worksheet = XLSX.utils.json_to_sheet(performance);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Report"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });

    const file = new Blob(
      [excelBuffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }
    );

    saveAs(file, "Vendor_Report.xlsx");

  };

  return (

    <DashboardLayout>

      <h2 className="fw-bold mb-4">
        📊 Vendor Reports
      </h2>

      {/* KPI Cards */}

      <div className="row g-4">

        <div className="col-lg-3">

          <div className="card shadow border-0 p-4">

            <h6>Total Revenue</h6>

            <h2 className="text-success">

              ₹ {report.total_revenue || 0}

            </h2>

          </div>

        </div>

        <div className="col-lg-3">

          <div className="card shadow border-0 p-4">

            <h6>Total Orders</h6>

            <h2 className="text-primary">

              {report.total_orders || 0}

            </h2>

          </div>

        </div>

        <div className="col-lg-3">

          <div className="card shadow border-0 p-4">

            <h6>Total Products</h6>

            <h2 className="text-warning">

              {report.total_products || 0}

            </h2>

          </div>

        </div>

        <div className="col-lg-3">

          <div className="card shadow border-0 p-4">

            <h6>Average Order</h6>

            <h2 className="text-danger">

              ₹ {report.average_order_value || 0}

            </h2>

          </div>

        </div>

      </div>

      {/* Export Buttons */}

      <div className="mt-4 mb-3">

        <button
          className="btn btn-danger me-2"
          onClick={exportPDF}
        >
          📄 Export PDF
        </button>

        <button
          className="btn btn-success"
          onClick={exportExcel}
        >
          📊 Export Excel
        </button>

      </div>

      {/* Product Performance */}

      <div className="card shadow border-0">

        <div className="card-body">

          <h4 className="mb-4">

            🏆 Product Performance

          </h4>

          <table className="table table-bordered table-hover">

            <thead className="table-primary">

              <tr>

                <th>Product</th>
                <th>Units Sold</th>
                <th>Revenue</th>

              </tr>

            </thead>

            <tbody>

              {performance.length > 0 ? (

                performance.map((item, index) => (

                  <tr key={index}>

                    <td>{item.product_name}</td>

                    <td>{item.units_sold}</td>

                    <td>₹ {item.revenue}</td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="3"
                    className="text-center"
                  >

                    No Data Available

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </DashboardLayout>

  );

}

export default Reports;