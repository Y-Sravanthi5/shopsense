import { BrowserRouter, Routes, Route } from "react-router-dom";

// Common Pages
import Home from "./pages/common/Home";

// Authentication
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Vendor Pages
import VendorDashboard from "./pages/vendor/VendorDashboard";
import AddProduct from "./pages/vendor/AddProduct";
import ProductList from "./pages/vendor/ProductList";
import EditProduct from "./pages/vendor/EditProduct";
import Inventory from "./pages/vendor/Inventory";
import Reports from "./pages/vendor/Reports";
import Transactions from "./pages/vendor/Transactions";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PendingVendors from "./pages/admin/PendingVendors";
import ApprovedVendors from "./pages/admin/ApprovedVendors";
import RejectedVendors from "./pages/admin/RejectedVendors";
import VendorDetails from "./pages/admin/VendorDetails";

// Customer Pages
import CustomerRegister from "./pages/customer/CustomerRegister";
import CustomerLogin from "./pages/customer/CustomerLogin";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import CustomerProducts from "./pages/customer/CustomerProducts";

import ProductDetails from "./pages/customer/ProductDetails";

import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import CustomerOrders from "./pages/customer/CustomerOrders";
import OrderDetails from "./pages/customer/OrderDetails";
import SalesReport from "./pages/admin/SalesReport";
import InventoryAnalytics from "./pages/vendor/InventoryAnalytics";
import CustomerAnalytics from "./pages/admin/CustomerAnalytics";
import AdminSalesForecast from "./pages/admin/AdminSalesForecast";
import CustomerSegmentation from "./pages/admin/CustomerSegmentation";
import Analytics from "./pages/vendor/Analytics";
import SalesForecast from "./pages/vendor/SalesForecast";
import AIDashboard from "./pages/vendor/AIDashboard";
import Wishlist from "./pages/customer/Wishlist";

import AdvancedRevenueAnalytics
  from "./pages/vendor/AdvancedRevenueAnalytics";
import MarketplaceBenchmark
  from "./pages/vendor/MarketplaceBenchmark";

import CustomerSpendingAnalytics from "./pages/customer/cAnalytics";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Vendor */}
        <Route
          path="/vendor/dashboard"
          element={<VendorDashboard />}
        />

        <Route
          path="/vendor/add-product"
          element={<AddProduct />}
        />

        <Route
          path="/vendor/products"
          element={<ProductList />}
        />

        <Route
          path="/vendor/edit-product/:id"
          element={<EditProduct />}
        />

        <Route
          path="/vendor/inventory"
          element={<Inventory />}
        />

        <Route
    path="/vendor/reports"
    element={<Reports />}
/>

        <Route
          path="/vendor/transactions"
          element={<Transactions />}
        />

        {/* Admin */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/pending-vendors"
          element={<PendingVendors />}
        />

        <Route
          path="/admin/approved-vendors"
          element={<ApprovedVendors />}
        />

        <Route
          path="/admin/rejected-vendors"
          element={<RejectedVendors />}
        />

        <Route
          path="/admin/vendor/:id"
          element={<VendorDetails />}
        />

        {/* Customer */}

        <Route
          path="/customer/register"
          element={<CustomerRegister />}
        />

        <Route
          path="/customer/login"
          element={<CustomerLogin />}
        />

        <Route
          path="/customer/dashboard"
          element={<CustomerDashboard />}
        />

        <Route
          path="/customer/products"
          element={<CustomerProducts />}
        />
        <Route
    path="/customer/product/:id"
    element={<ProductDetails />}
/>
<Route
    path="/customer/cart"
    element={<Cart />}
/>
<Route
path="/customer/checkout"
element={<Checkout />}
/>
<Route
    path="/customer/orders"
    element={<CustomerOrders />}
/>
<Route
    path="/customer/order/:id"
    element={<OrderDetails />}
/>
<Route
    path="/admin/sales"
    element={<SalesReport />}
/>
<Route
    path="/vendor/inventory-analytics"
    element={<InventoryAnalytics />}
/>
<Route
    path="/admin/customer-analytics"
    element={<CustomerAnalytics />}
/>
<Route
    path="/admin/customer-segmentation"
    element={<CustomerSegmentation />}
/>
<Route
    path="/admin/sales-forecast"
    element={<AdminSalesForecast />}
/>
<Route
  path="/vendor/analytics"
  element={<Analytics />}
/>
<Route
    path="/vendor/sales-forecast"
    element={<SalesForecast />}
/>
<Route
  path="/vendor/ai-dashboard"
  element={<AIDashboard />}
/>
<Route path="/customer/wishlist" element={<Wishlist />} />
<Route
  path="/vendor/revenue-analytics"
  element={<AdvancedRevenueAnalytics />}
/>
<Route
  path="/vendor/marketplace-benchmark"
  element={<MarketplaceBenchmark />}
/>

<Route
    path="/customer/analytics"
    element={<CustomerSpendingAnalytics />}
/>


      </Routes>
    </BrowserRouter>
  );
}

export default App;