import os
import sys

from dotenv import load_dotenv

# Add backend folder to Python path
sys.path.insert(0, os.path.abspath("backend"))

# Use the separate test database
load_dotenv("tests/.env.test", override=True)

from fastapi.testclient import TestClient
from main import app


client = TestClient(app)


# ==========================================================
# BASIC API
# ==========================================================

def test_home():
    response = client.get("/")
    assert response.status_code == 200


# ==========================================================
# PRODUCT APIs
# ==========================================================

def test_get_products():
    response = client.get("/products")
    assert response.status_code == 200


def test_get_single_product():
    response = client.get("/products/1")
    assert response.status_code == 200


# ==========================================================
# VENDOR APIs
# ==========================================================

def test_vendor_products():
    response = client.get("/vendor/products/1")
    assert response.status_code == 200


def test_vendor_dashboard():
    response = client.get("/dashboard/1")
    assert response.status_code == 200


def test_vendor_transactions():
    response = client.get("/vendor/transactions/1")
    assert response.status_code == 200


def test_vendor_reports():
    response = client.get("/vendor/reports/1")
    assert response.status_code == 200


def test_vendor_product_performance():
    response = client.get("/vendor/product-performance/1")
    assert response.status_code == 200


def test_vendor_sales_chart():
    response = client.get("/vendor/sales-chart/1")
    assert response.status_code == 200


# ==========================================================
# ADMIN APIs
# ==========================================================

def test_pending_vendors():
    response = client.get("/admin/pending-vendors")
    assert response.status_code == 200


def test_approved_vendors():
    response = client.get("/admin/approved-vendors")
    assert response.status_code == 200


def test_rejected_vendors():
    response = client.get("/admin/rejected-vendors")
    assert response.status_code == 200


def test_admin_dashboard():
    response = client.get("/admin/dashboard")
    assert response.status_code == 200


def test_admin_dashboard_summary():
    response = client.get("/admin/dashboard-summary")
    assert response.status_code == 200


def test_admin_sales():
    response = client.get("/admin/sales")
    assert response.status_code == 200


def test_vendor_details():
    response = client.get("/admin/vendor/1")
    assert response.status_code == 200


def test_vendor_product_count():
    response = client.get("/admin/vendor-products/1")
    assert response.status_code == 200


# ==========================================================
# CUSTOMER ANALYTICS
# ==========================================================

def test_customer_analytics():
    response = client.get("/analytics/customers")
    assert response.status_code == 200


def test_admin_customer_analytics():
    response = client.get("/admin/customer-analytics")
    assert response.status_code == 200


def test_customer_segmentation():
    response = client.get("/admin/customer-segmentation")
    assert response.status_code == 200


# ==========================================================
# ORDER APIs
# ==========================================================

def test_customer_orders():
    response = client.get("/orders/1")
    assert response.status_code == 200


def test_order_details():
    response = client.get("/order/1")
    assert response.status_code == 200


# ==========================================================
# CART APIs
# ==========================================================

def test_customer_cart():
    response = client.get("/cart/1")
    assert response.status_code == 200


# ==========================================================
# WISHLIST APIs
# ==========================================================

def test_customer_wishlist():
    response = client.get("/wishlist/1")
    assert response.status_code == 200


# ==========================================================
# AI / ML APIs
# ==========================================================

def test_sales_forecast():
    response = client.get("/analytics/sales-forecast")
    assert response.status_code == 200


def test_vendor_sales_forecast():
    response = client.get("/vendor/sales-forecast/1")
    assert response.status_code == 200


def test_inventory_prediction():
    response = client.get("/vendor/inventory-prediction/1")
    assert response.status_code == 200


def test_ai_dashboard():
    response = client.get("/vendor/ai-dashboard/1")
    assert response.status_code == 200


def test_model_validation():
    response = client.get("/analytics/model-validation")
    assert response.status_code == 200


# ==========================================================
# ADVANCED ANALYTICS
# ==========================================================

def test_advanced_revenue():
    response = client.get("/vendor/advanced-revenue/1")
    assert response.status_code == 200


def test_marketplace_benchmark():
    response = client.get("/vendor/marketplace-benchmark/1")
    assert response.status_code == 200


# ==========================================================
# CUSTOMER DASHBOARD ANALYTICS
# ==========================================================

def test_customer_dashboard_analytics():
    response = client.get("/customer/analytics/1")
    assert response.status_code == 200