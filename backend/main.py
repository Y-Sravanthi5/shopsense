from fastapi import FastAPI, Depends, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from sqlalchemy.orm import Session

import os
import shutil

import models
import schemas
import crud

from database import SessionLocal, engine

# --------------------------------------------------
# Create Database Tables
# --------------------------------------------------
models.Base.metadata.create_all(bind=engine)

# --------------------------------------------------
# FastAPI App
# --------------------------------------------------
app = FastAPI(title="ShopSense API")

# --------------------------------------------------
# Upload Folder
# --------------------------------------------------
os.makedirs("uploads", exist_ok=True)

app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)

# --------------------------------------------------
# CORS
# --------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
# Database Dependency
# --------------------------------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# --------------------------------------------------
# Home
# --------------------------------------------------
@app.get("/")
def home():
    return {
        "message": "Welcome to ShopSense Backend 🚀"
    }
# ==========================================================
# VENDOR APIs
# ==========================================================

# ------------------------------
# Vendor Registration
# ------------------------------
@app.post("/register")
def register_vendor(
    business_name: str = Form(...),
    owner_name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    business_type: str = Form(...),
    address: str = Form(...),
    description: str = Form(...),
    password: str = Form(...),
    shop_logo: UploadFile = File(None),
    db: Session = Depends(get_db)
):

    logo_filename = None

    if shop_logo:

        logo_filename = shop_logo.filename
        file_path = os.path.join("uploads", logo_filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(shop_logo.file, buffer)

    vendor = models.Vendor(
        business_name=business_name,
        owner_name=owner_name,
        email=email,
        phone=phone,
        business_type=business_type,
        address=address,
        description=description,
        password=password,
        shop_logo=logo_filename,
        status="Pending"
    )

    db.add(vendor)
    db.commit()
    db.refresh(vendor)

    return {
        "message": "Vendor Registered Successfully",
        "vendor": vendor
    }


# ------------------------------
# Vendor Login
# ------------------------------
@app.post("/login")
def login_vendor(
    vendor: schemas.VendorLogin,
    db: Session = Depends(get_db)
):

    user = crud.login_vendor(db, vendor)

    if not user:
        return {
            "message": "Invalid Email or Password"
        }

    if user.status == "Pending":
        return {
            "message": "Your account is waiting for admin approval."
        }

    if user.status == "Rejected":
        return {
            "message": "Your registration has been rejected."
        }

    return {
        "message": "Login Successful",
        "vendor_id": user.id,
        "business_name": user.business_name
    }


# ------------------------------
# Vendor Products
# ------------------------------
@app.get("/vendor/products/{vendor_id}")
def vendor_products(
    vendor_id: int,
    db: Session = Depends(get_db)
):
    return crud.get_vendor_products(db, vendor_id)


# ------------------------------
# Vendor Dashboard
# ------------------------------
@app.get("/dashboard/{vendor_id}")
def vendor_dashboard(
    vendor_id: int,
    db: Session = Depends(get_db)
):
    return crud.dashboard_stats(db, vendor_id)
# ==========================================================
# ADMIN APIs
# ==========================================================

# ------------------------------
# Admin Login
# ------------------------------
@app.post("/admin/login")
def admin_login(
    admin: schemas.AdminLogin,
    db: Session = Depends(get_db)
):

    user = crud.admin_login(db, admin)

    if not user:
        return {
            "message": "Invalid Username or Password"
        }

    return {
        "message": "Admin Login Successful",
        "admin_id": user.id,
        "username": user.username
    }


# ------------------------------
# Pending Vendors
# ------------------------------
@app.get("/admin/pending-vendors")
def pending_vendors(
    db: Session = Depends(get_db)
):
    return crud.get_pending_vendors(db)


# ------------------------------
# Approved Vendors
# ------------------------------
@app.get("/admin/approved-vendors")
def approved_vendors(
    db: Session = Depends(get_db)
):
    return crud.get_approved_vendors(db)


# ------------------------------
# Rejected Vendors
# ------------------------------
@app.get("/admin/rejected-vendors")
def rejected_vendors(
    db: Session = Depends(get_db)
):
    return crud.get_rejected_vendors(db)


# ------------------------------
# Approve Vendor
# ------------------------------
@app.put("/admin/approve/{vendor_id}")
def approve_vendor(
    vendor_id: int,
    db: Session = Depends(get_db)
):
    return crud.approve_vendor(db, vendor_id)


# ------------------------------
# Reject Vendor
# ------------------------------
@app.put("/admin/reject/{vendor_id}")
def reject_vendor(
    vendor_id: int,
    db: Session = Depends(get_db)
):
    return crud.reject_vendor(db, vendor_id)


# ------------------------------
# Vendor Details
# ------------------------------
@app.get("/admin/vendor/{vendor_id}")
def vendor_details(
    vendor_id: int,
    db: Session = Depends(get_db)
):
    return crud.get_vendor_by_id(db, vendor_id)


# ------------------------------
# Vendor Product Count
# ------------------------------
@app.get("/admin/vendor-products/{vendor_id}")
def vendor_product_count(
    vendor_id: int,
    db: Session = Depends(get_db)
):
    return {
        "count": crud.vendor_product_count(db, vendor_id)
    }


# ------------------------------
# Admin Dashboard
# ------------------------------
@app.get("/admin/dashboard")
def admin_dashboard(
    db: Session = Depends(get_db)
):
    return crud.admin_dashboard(db)


# ------------------------------
# Dashboard Summary
# ------------------------------
@app.get("/admin/dashboard-summary")
def dashboard_summary(
    db: Session = Depends(get_db)
):
    return crud.admin_dashboard_summary(db)


# ------------------------------
# Sales Report
# ------------------------------
@app.get("/admin/sales")
def sales_report(
    db: Session = Depends(get_db)
):
    return crud.get_sales_report(db)
# ==========================================================
# PRODUCT APIs
# ==========================================================

# ------------------------------
# Add Product
# ------------------------------
@app.post("/products")
def add_product(
    product_name: str = Form(...),
    category: str = Form(...),
    description: str = Form(...),
    original_price: float = Form(...),
    discount: float = Form(...),
    price: float = Form(...),
    stock: int = Form(...),
    vendor_id: int = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    image_path = os.path.join("uploads", image.filename)

    with open(image_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    db_product = models.Product(
        product_name=product_name,
        category=category,
        description=description,
        original_price=original_price,
        discount=discount,
        price=price,
        stock=stock,
        vendor_id=vendor_id,
        image=image.filename
    )

    db.add(db_product)
    db.commit()
    db.refresh(db_product)

    return {
        "message": "Product Added Successfully",
        "product": db_product
    }


# ------------------------------
# Get All Products
# ------------------------------
@app.get("/products")
def get_products(
    db: Session = Depends(get_db)
):
    return crud.get_products(db)


# ------------------------------
# Get Single Product
# ------------------------------
@app.get("/products/{product_id}")
def get_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    return crud.get_product(db, product_id)


# ------------------------------
# Update Product
# ------------------------------
@app.put("/products/{product_id}")
def edit_product(
    product_id: int,
    product: schemas.ProductCreate,
    db: Session = Depends(get_db)
):
    return crud.edit_product(db, product_id, product)


# ------------------------------
# Delete Product
# ------------------------------
@app.delete("/products/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    return crud.delete_product(db, product_id)
# ==========================================================
# CUSTOMER APIs
# ==========================================================

# ------------------------------
# Customer Registration
# ------------------------------
@app.post("/customer/register")
def register_customer(
    customer: schemas.CustomerCreate,
    db: Session = Depends(get_db)
):
    return crud.create_customer(db, customer)


# ------------------------------
# Customer Login
# ------------------------------
@app.post("/customer/login")
def login_customer(
    customer: schemas.CustomerLogin,
    db: Session = Depends(get_db)
):

    user = crud.login_customer(db, customer)

    if not user:
        return {
            "message": "Invalid Email or Password"
        }

    return {
        "message": "Customer Login Successful",
        "customer_id": user.id,
        "full_name": user.full_name
    }


# ------------------------------
# Customer Analytics
# ------------------------------
@app.get("/analytics/customers")
def analytics_customers(
    db: Session = Depends(get_db)
):
    return crud.customer_analytics(db)


# ------------------------------
# Admin Customer Analytics
# ------------------------------
@app.get("/admin/customer-analytics")
def get_customer_analytics(
    db: Session = Depends(get_db)
):
    return crud.customer_analytics(db)


# ------------------------------
# Customer Segmentation
# ------------------------------
@app.get("/admin/customer-segmentation")
def get_customer_segmentation(
    db: Session = Depends(get_db)
):
    return crud.customer_segmentation(db)
# ==========================================================
# ORDER APIs
# ==========================================================

# ------------------------------
# Place Order
# ------------------------------
@app.post("/orders")
def place_order(
    order: schemas.OrderCreate,
    db: Session = Depends(get_db)
):
    return crud.create_order(db, order)


# ------------------------------
# Customer Orders
# ------------------------------
@app.get("/orders/{customer_id}")
def customer_orders(
    customer_id: int,
    db: Session = Depends(get_db)
):
    return crud.get_customer_orders(db, customer_id)


# ------------------------------
# Order Details
# ------------------------------
@app.get("/order/{order_id}")
def order_details(
    order_id: int,
    db: Session = Depends(get_db)
):
    return crud.get_order_details(db, order_id)
# ==========================================================
# CART APIs
# ==========================================================

# ------------------------------
# Add to Cart
# ------------------------------
@app.post("/cart/add")
def add_to_cart(
    cart: schemas.CartCreate,
    db: Session = Depends(get_db)
):
    return crud.add_to_cart(db, cart)


# ------------------------------
# Get Customer Cart
# ------------------------------
@app.get("/cart/{customer_id}")
def get_cart(
    customer_id: int,
    db: Session = Depends(get_db)
):
    return crud.get_cart(db, customer_id)


# ------------------------------
# Update Cart Quantity
# ------------------------------
@app.put("/cart/{cart_id}")
def update_cart(
    cart_id: int,
    cart: schemas.CartUpdate,
    db: Session = Depends(get_db)
):
    return crud.update_cart(
        db,
        cart_id,
        cart.quantity
    )


# ------------------------------
# Delete Cart Item
# ------------------------------
@app.delete("/cart/{cart_id}")
def delete_cart(
    cart_id: int,
    db: Session = Depends(get_db)
):
    return crud.delete_cart(db, cart_id)


# ------------------------------
# Clear Customer Cart
# ------------------------------
@app.delete("/cart/clear/{customer_id}")
def clear_cart(
    customer_id: int,
    db: Session = Depends(get_db)
):
    return crud.clear_cart(db, customer_id)
# ==========================================================
# WISHLIST APIs
# ==========================================================

# ------------------------------
# Add to Wishlist
# ------------------------------
@app.post("/wishlist/add")
def add_to_wishlist(
    wishlist: schemas.WishlistCreate,
    db: Session = Depends(get_db)
):
    return crud.add_to_wishlist(db, wishlist)


# ------------------------------
# Get Customer Wishlist
# ------------------------------
@app.get("/wishlist/{customer_id}")
def get_wishlist(
    customer_id: int,
    db: Session = Depends(get_db)
):
    return crud.get_wishlist(db, customer_id)


# ------------------------------
# Remove Wishlist Item
# ------------------------------
@app.delete("/wishlist/{wishlist_id}")
def remove_wishlist(
    wishlist_id: int,
    db: Session = Depends(get_db)
):
    return crud.remove_wishlist(db, wishlist_id)


# ------------------------------
# Clear Wishlist
# ------------------------------
@app.delete("/wishlist/clear/{customer_id}")
def clear_wishlist(
    customer_id: int,
    db: Session = Depends(get_db)
):
    return crud.clear_wishlist(db, customer_id)
# ==========================================================
# TRANSACTION APIs
# ==========================================================

# ------------------------------
# Create Transaction
# ------------------------------
@app.post("/transactions")
def create_transaction(
    transaction: schemas.TransactionCreate,
    db: Session = Depends(get_db)
):
    return crud.create_transaction(db, transaction)


# ------------------------------
# Vendor Transactions
# ------------------------------
@app.get("/vendor/transactions/{vendor_id}")
def vendor_transactions(
    vendor_id: int,
    db: Session = Depends(get_db)
):
    return crud.get_vendor_transactions(db, vendor_id)
# ==========================================================
# REPORTS & ANALYTICS APIs
# ==========================================================

# ------------------------------
# Vendor Reports
# ------------------------------
@app.get("/vendor/reports/{vendor_id}")
def vendor_reports(
    vendor_id: int,
    db: Session = Depends(get_db)
):
    return crud.vendor_report(db, vendor_id)


# ------------------------------
# Product Performance
# ------------------------------
@app.get("/vendor/product-performance/{vendor_id}")
def vendor_product_performance(
    vendor_id: int,
    db: Session = Depends(get_db)
):
    return crud.vendor_product_performance(db, vendor_id)


# ------------------------------
# Sales Chart
# ------------------------------
@app.get("/vendor/sales-chart/{vendor_id}")
def vendor_sales_chart(
    vendor_id: int,
    db: Session = Depends(get_db)
):
    return crud.vendor_sales_chart(db, vendor_id)


# ==========================================================
# AI / ML APIs
# ==========================================================

# ------------------------------
# Sales Forecast
# ------------------------------
@app.get("/analytics/sales-forecast")
def get_sales_forecast(
    db: Session = Depends(get_db)
):
    return crud.sales_forecast(db)


# ------------------------------
# Vendor ML Sales Forecast
# ------------------------------
@app.get("/vendor/sales-forecast/{vendor_id}")
def vendor_sales_forecast(
    vendor_id: int,
    db: Session = Depends(get_db)
):
    return crud.ml_sales_forecast(db, vendor_id)


# ------------------------------
# Inventory Prediction
# ------------------------------
@app.get("/vendor/inventory-prediction/{vendor_id}")
def inventory_prediction(
    vendor_id: int,
    db: Session = Depends(get_db)
):
    return crud.inventory_prediction(db, vendor_id)


# ------------------------------
# AI Dashboard
# ------------------------------
@app.get("/vendor/ai-dashboard/{vendor_id}")
def vendor_ai_dashboard(
    vendor_id: int,
    db: Session = Depends(get_db)
):
    return crud.ai_dashboard(db, vendor_id)


# ------------------------------
# Product Recommendations
# ------------------------------
@app.get("/products/{product_id}/recommendations")
def recommended_products(
    product_id: int,
    db: Session = Depends(get_db)
):
    return crud.get_recommended_products(product_id, db)
@app.get("/admin/customer-analytics")
def customer_analytics(
    db: Session = Depends(get_db)
):
    return crud.customer_analytics(db)
@app.get("/analytics/model-validation")
def model_validation(
    db: Session = Depends(get_db)
):
    return crud.model_validation(db)
@app.get("/vendor/advanced-revenue/{vendor_id}")
def get_advanced_revenue(
    vendor_id: int,
    db: Session = Depends(get_db)
):
    return crud.advanced_revenue_analytics(
        db,
        vendor_id
    )
@app.get("/vendor/marketplace-benchmark/{vendor_id}")
def get_marketplace_benchmark(
    vendor_id: int,
    db: Session = Depends(get_db)
):
    return crud.marketplace_benchmark(
        db,
        vendor_id
    )

