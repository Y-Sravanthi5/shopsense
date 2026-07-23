import CustomerNavbar from "./components/CustomerNavbar";

function Home() {

    return (

        <>
            <CustomerNavbar />

            <div className="container mt-5 text-center">

                <h1>Welcome to ShopSense</h1>

                <p className="lead">
                    Discover the best products at the best prices.
                </p>

            </div>

        </>

    );

}

export default Home;