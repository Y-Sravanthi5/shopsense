import { useEffect, useState } from "react";
import VendorLayout from "../../components/layout/VendorLayout";
import API from "../../services/api";

function InventoryAnalytics() {

    const [data, setData] = useState([]);

    useEffect(() => {

        loadAnalytics();

    }, []);

    const loadAnalytics = async () => {

        try {

            const res = await API.get("/analytics/inventory");

            setData(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <VendorLayout>

            <h2 className="mb-4">

                Inventory Analytics

            </h2>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                        <th>Product</th>
                        <th>Stock</th>
                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        data.map((item) => (

                            <tr key={item.product_id}>

                                <td>{item.product_name}</td>

                                <td>{item.stock}</td>

                                <td>

                                    {

                                        item.stock < 10 ?

                                        <span className="badge bg-danger">

                                            Low Stock

                                        </span>

                                        :

                                        <span className="badge bg-success">

                                            In Stock

                                        </span>

                                    }

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </VendorLayout>

    );

}

export default InventoryAnalytics;