import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import API from "../../services/api";

function SalesForecast() {

    const [forecast, setForecast] = useState([]);

    useEffect(() => {
        loadForecast();
    }, []);

    const loadForecast = async () => {

        try {
            const res = await API.get("/analytics/sales-forecast");
            setForecast(res.data);
        }
        catch (err) {
            console.log(err);
        }

    };

    return (

        <AdminLayout>

            <h2 className="mb-4">
                AI Sales Forecast
            </h2>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>
                        <th>Product</th>
                        <th>Current Stock</th>
                        <th>Historical Sales</th>
                        <th>Predicted Sales</th>
                        <th>Suggested Restock</th>
                    </tr>

                </thead>

                <tbody>

                    {forecast.map((item) => (

                        <tr key={item.product_id}>

                            <td>{item.product_name}</td>

                            <td>{item.current_stock}</td>

                            <td>{item.historical_sales}</td>

                            <td>{item.predicted_sales}</td>

                            <td>{item.suggested_restock}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </AdminLayout>

    );

}

export default SalesForecast;