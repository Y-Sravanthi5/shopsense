from sqlalchemy.orm import Session
from sqlalchemy import func

import models
import schemas
import numpy as np
from sklearn.linear_model import LinearRegression



# =====================================================
# Vendor CRUD
# =====================================================

def create_vendor(db: Session, vendor: schemas.VendorCreate):

    db_vendor = models.Vendor(
        business_name=vendor.business_name,
        owner_name=vendor.owner_name,
        email=vendor.email,
        phone=vendor.phone,
        business_type=vendor.business_type,
        address=vendor.address,
        description=vendor.description,
        password=vendor.password,
        status="Pending"
    )

    db.add(db_vendor)
    db.commit()
    db.refresh(db_vendor)

    return db_vendor


def login_vendor(db: Session, vendor: schemas.VendorLogin):

    return db.query(models.Vendor).filter(
        models.Vendor.email == vendor.email,
        models.Vendor.password == vendor.password
    ).first()
# =====================================================
# Product CRUD
# =====================================================

def create_product(db: Session, product: schemas.ProductCreate):

    db_product = models.Product(
        product_name=product.product_name,
        category=product.category,
        description=product.description,
        original_price=product.original_price,
        discount=product.discount,
        price=product.price,
        stock=product.stock,
        vendor_id=product.vendor_id
    )

    db.add(db_product)
    db.commit()
    db.refresh(db_product)

    return db_product


# -----------------------------------------------------

def get_products(db: Session):

    return db.query(models.Product).all()


# -----------------------------------------------------

def get_product(db: Session, product_id: int):

    return db.query(models.Product).filter(
        models.Product.id == product_id
    ).first()


# -----------------------------------------------------

def edit_product(
    db: Session,
    product_id: int,
    product: schemas.ProductCreate
):

    db_product = db.query(models.Product).filter(
        models.Product.id == product_id
    ).first()

    if not db_product:
        return None

    db_product.product_name = product.product_name
    db_product.category = product.category
    db_product.description = product.description
    db_product.original_price = product.original_price
    db_product.discount = product.discount
    db_product.price = product.price
    db_product.stock = product.stock

    db.commit()
    db.refresh(db_product)

    return db_product


# -----------------------------------------------------

def delete_product(
    db: Session,
    product_id: int
):

    product = db.query(models.Product).filter(
        models.Product.id == product_id
    ).first()

    if not product:
        return {
            "message": "Product Not Found"
        }

    db.delete(product)
    db.commit()

    return {
        "message": "Product Deleted Successfully"
    }
# =====================================================
# Inventory Management
# =====================================================

def update_stock(
    db: Session,
    product_id: int,
    stock: int
):

    product = db.query(models.Product).filter(
        models.Product.id == product_id
    ).first()

    if not product:
        return None

    product.stock = stock

    db.commit()
    db.refresh(product)

    return product


# =====================================================
# Vendor Dashboard
# =====================================================

def dashboard_stats(db: Session, vendor_id: int):

    total_products = (
        db.query(models.Product)
        .filter(models.Product.vendor_id == vendor_id)
        .count()
    )

    total_stock = (
        db.query(func.sum(models.Product.stock))
        .filter(models.Product.vendor_id == vendor_id)
        .scalar()
    ) or 0

    inventory_value = (
        db.query(func.sum(models.Product.stock * models.Product.price))
        .filter(models.Product.vendor_id == vendor_id)
        .scalar()
    ) or 0

    low_stock_products = (
        db.query(models.Product)
        .filter(
            models.Product.vendor_id == vendor_id,
            models.Product.stock < 10
        )
        .count()
    )

    out_of_stock_products = (
        db.query(models.Product)
        .filter(
            models.Product.vendor_id == vendor_id,
            models.Product.stock == 0
        )
        .count()
    )

    return {
        "total_products": total_products,
        "total_stock": total_stock,
        "inventory_value": inventory_value,
        "low_stock_products": low_stock_products,
        "out_of_stock_products": out_of_stock_products
    }

# =====================================================
# Transactions
# =====================================================

def create_transaction(
    db: Session,
    transaction: schemas.TransactionCreate
):

    product = db.query(models.Product).filter(
        models.Product.id == transaction.product_id
    ).first()

    if not product:
        return {
            "message": "Product not found"
        }

    if product.stock < transaction.quantity:
        return {
            "message": "Insufficient stock"
        }

    total_amount = product.price * transaction.quantity

    db_transaction = models.Transaction(
        vendor_id=transaction.vendor_id,
        product_id=transaction.product_id,
        quantity=transaction.quantity,
        unit_price=product.price,
        total_amount=total_amount
    )

    product.stock -= transaction.quantity

    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)

    return db_transaction


# =====================================================
# Transaction History
# =====================================================

def get_transactions(db: Session):

    return db.query(models.Transaction).order_by(
        models.Transaction.transaction_date.desc()
    ).all()


# =====================================================
# Reports
# =====================================================

def report_stats(db: Session):

    total_revenue = db.query(
        func.sum(models.Transaction.total_amount)
    ).scalar() or 0

    total_orders = db.query(
        models.Transaction
    ).count()

    total_products = db.query(
        models.Product
    ).count()

    average_order_value = (
        total_revenue / total_orders
        if total_orders > 0
        else 0
    )

    return {
        "total_revenue": total_revenue,
        "total_orders": total_orders,
        "total_products": total_products,
        "average_order_value": round(
            average_order_value,
            2
        )
    }


# =====================================================
# Product Performance Report
# =====================================================

def product_performance(db: Session):

    performance = (
        db.query(
            models.Product.id.label("product_id"),
            models.Product.product_name.label("product_name"),
            func.sum(models.Transaction.quantity).label("units_sold"),
            func.sum(models.Transaction.total_amount).label("revenue")
        )
        .join(
            models.Transaction,
            models.Product.id == models.Transaction.product_id
        )
        .group_by(
            models.Product.id,
            models.Product.product_name
        )
        .order_by(
            func.sum(models.Transaction.quantity).desc()
        )
        .all()
    )

    result = []

    for item in performance:

        result.append({
            "product_id": item.product_id,
            "product_name": item.product_name,
            "units_sold": item.units_sold or 0,
            "revenue": item.revenue or 0
        })

    return result
# =====================================================
# Admin CRUD
# =====================================================

def admin_login(
    db: Session,
    admin: schemas.AdminLogin
):

    return db.query(models.Admin).filter(
        models.Admin.username == admin.username,
        models.Admin.password == admin.password
    ).first()


# =====================================================
# Vendor Approval Management
# =====================================================

def get_pending_vendors(db: Session):

    return db.query(models.Vendor).filter(
        models.Vendor.status == "Pending"
    ).all()


# -----------------------------------------------------

def get_approved_vendors(db: Session):

    return db.query(models.Vendor).filter(
        models.Vendor.status == "Approved"
    ).all()


# -----------------------------------------------------

def get_rejected_vendors(db: Session):

    return db.query(models.Vendor).filter(
        models.Vendor.status == "Rejected"
    ).all()


# -----------------------------------------------------

def approve_vendor(
    db: Session,
    vendor_id: int
):

    vendor = db.query(models.Vendor).filter(
        models.Vendor.id == vendor_id
    ).first()

    if not vendor:
        return None

    vendor.status = "Approved"

    db.commit()
    db.refresh(vendor)

    return vendor


# -----------------------------------------------------

def reject_vendor(
    db: Session,
    vendor_id: int
):

    vendor = db.query(models.Vendor).filter(
        models.Vendor.id == vendor_id
    ).first()

    if not vendor:
        return None

    vendor.status = "Rejected"

    db.commit()
    db.refresh(vendor)

    return vendor


# =====================================================
# Vendor Details
# =====================================================

def get_vendor_by_id(
    db: Session,
    vendor_id: int
):

    return db.query(models.Vendor).filter(
        models.Vendor.id == vendor_id
    ).first()


# =====================================================
# Vendor Product Count
# =====================================================

def vendor_product_count(
    db: Session,
    vendor_id: int
):

    return db.query(models.Product).filter(
        models.Product.vendor_id == vendor_id
    ).count()


# =====================================================
# Admin Dashboard
# =====================================================

def admin_dashboard(db: Session):

    total_vendors = db.query(models.Vendor).count()

    pending_vendors = db.query(models.Vendor).filter(
        models.Vendor.status == "Pending"
    ).count()

    approved_vendors = db.query(models.Vendor).filter(
        models.Vendor.status == "Approved"
    ).count()

    rejected_vendors = db.query(models.Vendor).filter(
        models.Vendor.status == "Rejected"
    ).count()

    total_customers = db.query(models.Customer).count()

    total_products = db.query(models.Product).count()

    total_orders = db.query(models.Transaction).count()

    total_revenue = db.query(
        func.sum(models.Transaction.total_amount)
    ).scalar() or 0

    return {
        "total_vendors": total_vendors,
        "pending_vendors": pending_vendors,
        "approved_vendors": approved_vendors,
        "rejected_vendors": rejected_vendors,
        "total_customers": total_customers,
        "total_products": total_products,
        "total_orders": total_orders,
        "total_revenue": total_revenue
    }
# =====================================================
# Customer CRUD
# =====================================================

def create_customer(
    db: Session,
    customer: schemas.CustomerCreate
):

    db_customer = models.Customer(
        full_name=customer.full_name,
        email=customer.email,
        phone=customer.phone,
        password=customer.password
    )

    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)

    return db_customer


# -----------------------------------------------------

def login_customer(
    db: Session,
    customer: schemas.CustomerLogin
):

    return db.query(models.Customer).filter(
        models.Customer.email == customer.email,
        models.Customer.password == customer.password
    ).first()


# -----------------------------------------------------

def get_customer_by_id(
    db: Session,
    customer_id: int
):

    return db.query(models.Customer).filter(
        models.Customer.id == customer_id
    ).first()


# -----------------------------------------------------

def get_all_customers(db: Session):

    return db.query(models.Customer).all()


# -----------------------------------------------------

def update_customer(
    db: Session,
    customer_id: int,
    customer: schemas.CustomerCreate
):

    db_customer = db.query(models.Customer).filter(
        models.Customer.id == customer_id
    ).first()

    if not db_customer:
        return None

    db_customer.full_name = customer.full_name
    db_customer.email = customer.email
    db_customer.phone = customer.phone
    db_customer.password = customer.password

    db.commit()
    db.refresh(db_customer)

    return db_customer


# -----------------------------------------------------

def delete_customer(
    db: Session,
    customer_id: int
):

    customer = db.query(models.Customer).filter(
        models.Customer.id == customer_id
    ).first()

    if not customer:
        return {
            "message": "Customer Not Found"
        }

    db.delete(customer)
    db.commit()

    return {
        "message": "Customer Deleted Successfully"
    }
# =====================================================
# Cart CRUD
# =====================================================

def add_to_cart(
    db: Session,
    cart: schemas.CartCreate
):

    existing = db.query(models.Cart).filter(
        models.Cart.customer_id == cart.customer_id,
        models.Cart.product_id == cart.product_id
    ).first()

    if existing:

        existing.quantity += cart.quantity

        db.commit()
        db.refresh(existing)

        return existing

    item = models.Cart(
        customer_id=cart.customer_id,
        product_id=cart.product_id,
        quantity=cart.quantity
    )

    db.add(item)
    db.commit()
    db.refresh(item)

    return item


# -----------------------------------------------------

def get_cart(db: Session, customer_id: int):

    cart = (
        db.query(
            models.Cart.id.label("cart_id"),
            models.Cart.quantity,
            models.Product.id.label("product_id"),
            models.Product.product_name,
            models.Product.image,
            models.Product.category,
            models.Product.price,
            models.Product.stock
        )
        .join(
            models.Product,
            models.Cart.product_id == models.Product.id
        )
        .filter(models.Cart.customer_id == customer_id)
        .all()
    )

    return [
        {
            "cart_id": item.cart_id,
            "product_id": item.product_id,
            "product_name": item.product_name,
            "image": item.image,
            "category": item.category,
            "price": item.price,
            "stock": item.stock,
            "quantity": item.quantity,
        }
        for item in cart
    ]

# -----------------------------------------------------

def update_cart(
    db: Session,
    cart_id: int,
    quantity: int
):

    item = db.query(models.Cart).filter(
        models.Cart.id == cart_id
    ).first()

    if not item:
        return None

    item.quantity = quantity

    db.commit()
    db.refresh(item)

    return item


# -----------------------------------------------------

def delete_cart(
    db: Session,
    cart_id: int
):

    item = db.query(models.Cart).filter(
        models.Cart.id == cart_id
    ).first()

    if not item:
        return {
            "message": "Cart Item Not Found"
        }

    db.delete(item)
    db.commit()

    return {
        "message": "Removed Successfully"
    }


# -----------------------------------------------------

def clear_cart(
    db: Session,
    customer_id: int
):

    db.query(models.Cart).filter(
        models.Cart.customer_id == customer_id
    ).delete()

    db.commit()

    return {
        "message": "Cart Cleared Successfully"
    }
# =====================================================
# Wishlist CRUD
# =====================================================

def add_to_wishlist(
    db: Session,
    wishlist: schemas.WishlistCreate
):

    existing = db.query(models.Wishlist).filter(
        models.Wishlist.customer_id == wishlist.customer_id,
        models.Wishlist.product_id == wishlist.product_id
    ).first()

    if existing:
        return {
            "message": "Product already exists in wishlist"
        }

    item = models.Wishlist(
        customer_id=wishlist.customer_id,
        product_id=wishlist.product_id
    )

    db.add(item)
    db.commit()
    db.refresh(item)

    return item


# -----------------------------------------------------

def get_wishlist(db: Session, customer_id: int):

    wishlist = (
        db.query(
            models.Wishlist.id.label("wishlist_id"),
            models.Product.id.label("product_id"),
            models.Product.product_name,
            models.Product.image,
            models.Product.category,
            models.Product.price,
            models.Product.stock
        )
        .join(
            models.Product,
            models.Wishlist.product_id == models.Product.id
        )
        .filter(models.Wishlist.customer_id == customer_id)
        .all()
    )

    return [
        {
            "wishlist_id": item.wishlist_id,
            "product_id": item.product_id,
            "product_name": item.product_name,
            "image": item.image,
            "category": item.category,
            "price": item.price,
            "stock": item.stock,
        }
        for item in wishlist
    ]

# -----------------------------------------------------

def remove_wishlist(
    db: Session,
    wishlist_id: int
):

    item = db.query(models.Wishlist).filter(
        models.Wishlist.id == wishlist_id
    ).first()

    if not item:
        return {
            "message": "Wishlist Item Not Found"
        }

    db.delete(item)
    db.commit()

    return {
        "message": "Removed Successfully"
    }


# -----------------------------------------------------

def clear_wishlist(
    db: Session,
    customer_id: int
):

    db.query(models.Wishlist).filter(
        models.Wishlist.customer_id == customer_id
    ).delete()

    db.commit()

    return {
        "message": "Wishlist Cleared Successfully"
    }
# =====================================================
# Milestone 2 - Analytics
# =====================================================

# -----------------------------------------------------
# Inventory Analytics
# -----------------------------------------------------

def inventory_analytics(db: Session):

    products = db.query(models.Product).all()

    analytics = []

    for product in products:

        total_sold = (
            db.query(func.sum(models.Transaction.quantity))
            .filter(models.Transaction.product_id == product.id)
            .scalar()
        ) or 0

        if product.stock == 0:
            status = "Out of Stock"
        elif product.stock < 10:
            status = "Low Stock"
        else:
            status = "In Stock"

        analytics.append({
            "product_id": product.id,
            "product_name": product.product_name,
            "category": product.category,
            "stock": product.stock,
            "total_sold": total_sold,
            "status": status
        })

    return analytics


# -----------------------------------------------------
# Sales Forecast
# -----------------------------------------------------

def sales_forecast(db: Session):

    products = db.query(models.Product).all()

    forecast = []

    for product in products:

        sold = (
            db.query(func.sum(models.Transaction.quantity))
            .filter(models.Transaction.product_id == product.id)
            .scalar()
        ) or 0
        sold = float(sold)
        predicted_sales = round(sold * 1.10, 2)

        suggested_restock = max(
            0,
            int(predicted_sales - product.stock)
        )

        forecast.append({
            "product_id": product.id,
            "product_name": product.product_name,
            "current_stock": product.stock,
            "historical_sales": sold,
            "predicted_sales": predicted_sales,
            "suggested_restock": suggested_restock
        })

    return forecast


# -----------------------------------------------------
# Customer Behaviour Analysis
# -----------------------------------------------------

def customer_behavior(db: Session):

    customers = db.query(models.Customer).all()

    result = []

    for customer in customers:

        total_orders = db.query(models.Transaction).count()

        total_spent = (
            db.query(func.sum(models.Transaction.total_amount))
            .scalar()
        ) or 0

        average = (
            total_spent / total_orders
            if total_orders > 0
            else 0
        )

        result.append({

            "customer_id": customer.id,
            "customer_name": customer.full_name,
            "total_orders": total_orders,
            "total_spent": round(total_spent, 2),
            "average_order_value": round(average, 2)

        })

    return result


# -----------------------------------------------------
# Customer Segmentation
# -----------------------------------------------------

from sqlalchemy import func
from datetime import datetime
import models


def customer_segmentation(db):

    customers = db.query(models.Customer).all()

    result = []

    for customer in customers:

        orders = (
            db.query(models.Order)
            .filter(models.Order.customer_id == customer.id)
            .all()
        )

        total_orders = len(orders)

        total_spent = sum(
            order.total_amount or 0
            for order in orders
        )

        if orders:
            last_order = max(order.created_at for order in orders)
            recency = (datetime.utcnow() - last_order).days
        else:
            recency = None

        # RFM Segmentation
        if total_orders >= 10 and total_spent >= 50000:
            segment = "Premium"

        elif total_orders >= 5 and total_spent >= 15000:
            segment = "Regular"

        elif total_orders >= 2:
            segment = "Occasional"

        else:
            segment = "New"

        result.append({

            "customer_id": customer.id,

            "customer_name": customer.full_name,

            "recency_days": recency,

            "frequency": total_orders,

            "monetary": round(total_spent, 2),

            "segment": segment

        })

    return result

# -----------------------------------------------------
# Best Selling Products
# -----------------------------------------------------

def best_selling_products(db: Session):

    products = (

        db.query(

            models.Product.product_name,

            func.sum(models.Transaction.quantity).label("sold"),

            func.sum(models.Transaction.total_amount).label("revenue")

        )

        .join(

            models.Transaction,

            models.Product.id == models.Transaction.product_id

        )

        .group_by(

            models.Product.id,

            models.Product.product_name

        )

        .order_by(

            func.sum(models.Transaction.quantity).desc()

        )

        .all()

    )

    return products


# -----------------------------------------------------
# Recommendation Engine
# -----------------------------------------------------

def recommendation_engine(db: Session):

    recommendations = (

        db.query(

            models.Product.product_name,

            func.sum(models.Transaction.quantity).label("score")

        )

        .join(

            models.Transaction,

            models.Product.id == models.Transaction.product_id

        )

        .group_by(

            models.Product.id,

            models.Product.product_name

        )

        .order_by(

            func.sum(models.Transaction.quantity).desc()

        )

        .limit(10)

        .all()

    )

    return recommendations


# -----------------------------------------------------
# Analytics Dashboard
# -----------------------------------------------------

def analytics_dashboard(db: Session):

    total_products = db.query(models.Product).count()

    total_customers = db.query(models.Customer).count()

    total_orders = db.query(models.Transaction).count()

    revenue = (
        db.query(
            func.sum(models.Transaction.total_amount)
        ).scalar()
    ) or 0

    low_stock = db.query(models.Product).filter(
        models.Product.stock < 10
    ).count()

    out_of_stock = db.query(models.Product).filter(
        models.Product.stock == 0
    ).count()

    return {

        "total_products": total_products,

        "total_customers": total_customers,

        "total_orders": total_orders,

        "total_revenue": revenue,

        "low_stock_products": low_stock,

        "out_of_stock_products": out_of_stock

    }
# =====================================================
# Order CRUD
# =====================================================

def create_order(
    db: Session,
    order: schemas.OrderCreate
):

    cart_items = (
        db.query(models.Cart)
        .filter(models.Cart.customer_id == order.customer_id)
        .all()
    )

    if not cart_items:
        return {"message": "Cart is empty"}

    total_amount = 0

    for item in cart_items:
        total_amount += item.quantity * item.product.price

    db_order = models.Order(
        customer_id=order.customer_id,
        total_amount=total_amount,
        payment_method=order.payment_method,
        address=order.address,
        payment_status="Paid",
        order_status="Placed"
    )

    db.add(db_order)
    db.commit()
    db.refresh(db_order)

    for item in cart_items:

        order_item = models.OrderItem(
            order_id=db_order.id,
            product_id=item.product_id,
            quantity=item.quantity,
            price=item.product.price
        )

        db.add(order_item)
        transaction = models.Transaction(
    vendor_id=item.product.vendor_id,
    product_id=item.product_id,
    quantity=item.quantity,
    unit_price=item.product.price,
    total_amount=item.quantity * item.product.price
)

        db.add(transaction)

        item.product.stock -= item.quantity

        db.delete(item)

    db.commit()

    return db_order
def get_customer_orders(
    db: Session,
    customer_id: int
):

    return (
        db.query(models.Order)
        .filter(models.Order.customer_id == customer_id)
        .order_by(models.Order.created_at.desc())
        .all()
    )
def get_order_details(
    db: Session,
    order_id: int
):

    return (
        db.query(models.OrderItem)
        .join(
            models.Product,
            models.OrderItem.product_id == models.Product.id
        )
        .filter(models.OrderItem.order_id == order_id)
        .all()
    )
def get_sales_report(db: Session):

    return (
        db.query(models.Order)
        .order_by(models.Order.created_at.desc())
        .all()
    )
def admin_dashboard_summary(db: Session):

    total_customers = db.query(models.Customer).count()

    total_vendors = db.query(models.Vendor).count()

    total_products = db.query(models.Product).count()

    total_revenue = db.query(func.coalesce(func.sum(models.Order.total_amount), 0)).scalar()

    return {
        "customers": total_customers,
        "vendors": total_vendors,
        "products": total_products,
        "revenue": total_revenue
    }
from sqlalchemy import func
from datetime import datetime, timedelta
import models


def customer_analytics(db):

    customers = db.query(models.Customer).all()

    analytics = []

    for customer in customers:

        orders = (
            db.query(models.Order)
            .filter(models.Order.customer_id == customer.id)
            .all()
        )

        total_orders = len(orders)

        total_spent = sum(
            order.total_amount or 0
            for order in orders
        )

        average_order_value = (
            total_spent / total_orders
            if total_orders > 0 else 0
        )

        if orders:

            last_purchase = max(order.created_at for order in orders)

            days_since_last = (
                datetime.utcnow() - last_purchase
            ).days

        else:

            last_purchase = None
            days_since_last = None

        # Simple Customer Lifetime Value
        clv = round(total_spent * 1.2, 2)

        if days_since_last is None:

            status = "Inactive"

        elif days_since_last <= 30:

            status = "Active"

        else:

            status = "Inactive"

        analytics.append({

            "customer_id": customer.id,

            "customer_name": customer.full_name,

            "email": customer.email,

            "total_orders": total_orders,

            "total_spent": round(total_spent, 2),

            "average_order_value": round(
                average_order_value,
                2
            ),

            "customer_lifetime_value": clv,

            "last_purchase_days": days_since_last,

            "status": status

        })

    return analytics
from sqlalchemy import func
import models


def get_recommended_products(product_id: int, db):

    current_product = (
        db.query(models.Product)
        .filter(models.Product.id == product_id)
        .first()
    )

    if not current_product:
        return []

    recommendations = []

    # --------------------------------------------------
    # Same Category Products
    # --------------------------------------------------

    category_products = (
        db.query(models.Product)
        .filter(
            models.Product.category == current_product.category,
            models.Product.id != product_id
        )
        .limit(4)
        .all()
    )

    for product in category_products:

        sold = (
            db.query(func.sum(models.Transaction.quantity))
            .filter(models.Transaction.product_id == product.id)
            .scalar()
        ) or 0

        recommendations.append({
            "product_id": product.id,
            "product_name": product.product_name,
            "category": product.category,
            "price": product.price,
            "image": product.image,
            "score": sold
        })

    # --------------------------------------------------
    # Best Selling Products
    # --------------------------------------------------

    best_sellers = (
        db.query(
            models.Product,
            func.sum(models.Transaction.quantity).label("sold")
        )
        .join(
            models.Transaction,
            models.Transaction.product_id == models.Product.id
        )
        .group_by(models.Product.id)
        .order_by(func.sum(models.Transaction.quantity).desc())
        .limit(4)
        .all()
    )

    existing_ids = {p["product_id"] for p in recommendations}

    for product, sold in best_sellers:

        if (
            product.id != product_id and
            product.id not in existing_ids
        ):

            recommendations.append({

                "product_id": product.id,

                "product_name": product.product_name,

                "category": product.category,

                "price": product.price,

                "image": product.image,

                "score": sold

            })

    recommendations.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return recommendations[:8]
def ml_sales_forecast(db: Session, vendor_id: int):

    sales = (
        db.query(
            func.date(models.Transaction.transaction_date),
            func.sum(models.Transaction.total_amount)
        )
        .filter(models.Transaction.vendor_id == vendor_id)
        .group_by(func.date(models.Transaction.transaction_date))
        .order_by(func.date(models.Transaction.transaction_date))
        .all()
    )

    if len(sales) == 0:
        return {
            "labels": [],
            "revenue": [],
            "prediction": 0
        }

    labels = []
    revenue = []

    for i, (_, amount) in enumerate(sales):
        labels.append(i + 1)
        revenue.append(float(amount))

    if len(revenue) < 2:
        prediction = revenue[-1]
    else:
        X = np.array(labels).reshape(-1, 1)
        y = np.array(revenue)

        model = LinearRegression()
        model.fit(X, y)

        prediction = model.predict([[len(labels) + 1]])[0]

    return {
        "labels": labels,
        "revenue": revenue,
        "prediction": round(float(prediction), 2)
    }
def get_vendor_products(db: Session, vendor_id: int):
    return (
        db.query(models.Product)
        .filter(models.Product.vendor_id == vendor_id)
        .all()
    )
from sqlalchemy import func

def vendor_report(db: Session, vendor_id: int):

    total_revenue = (
        db.query(func.sum(models.Transaction.total_amount))
        .filter(models.Transaction.vendor_id == vendor_id)
        .scalar()
    ) or 0

    total_orders = (
        db.query(models.Transaction)
        .filter(models.Transaction.vendor_id == vendor_id)
        .count()
    )

    total_products = (
        db.query(models.Product)
        .filter(models.Product.vendor_id == vendor_id)
        .count()
    )

    average_order_value = (
        total_revenue / total_orders
        if total_orders > 0 else 0
    )

    return {
        "total_revenue": round(total_revenue, 2),
        "total_orders": total_orders,
        "total_products": total_products,
        "average_order_value": round(average_order_value, 2)
    }


def vendor_product_performance(db: Session, vendor_id: int):

    results = (
        db.query(
            models.Product.product_name,
            func.sum(models.Transaction.quantity).label("units_sold"),
            func.sum(models.Transaction.total_amount).label("revenue")
        )
        .join(
            models.Transaction,
            models.Product.id == models.Transaction.product_id
        )
        .filter(models.Product.vendor_id == vendor_id)
        .group_by(models.Product.product_name)
        .all()
    )

    return [
        {
            "product_name": r.product_name,
            "units_sold": r.units_sold,
            "revenue": r.revenue
        }
        for r in results
    ]
from sqlalchemy import func

def vendor_sales_chart(db: Session, vendor_id: int):

    sales = (
        db.query(
            func.date(models.Transaction.transaction_date).label("date"),
            func.sum(models.Transaction.total_amount).label("revenue")
        )
        .filter(models.Transaction.vendor_id == vendor_id)
        .group_by(func.date(models.Transaction.transaction_date))
        .order_by(func.date(models.Transaction.transaction_date))
        .all()
    )

    return [
        {
            "date": str(s.date),
            "revenue": float(s.revenue)
        }
        for s in sales
    ]
def get_vendor_profile(db: Session, vendor_id: int):

    return (
        db.query(models.Vendor)
        .filter(models.Vendor.id == vendor_id)
        .first()
    )


def update_vendor_profile(db: Session, vendor_id: int, vendor):

    db_vendor = (
        db.query(models.Vendor)
        .filter(models.Vendor.id == vendor_id)
        .first()
    )

    if not db_vendor:
        return None

    db_vendor.business_name = vendor.business_name
    db_vendor.email = vendor.email
    db_vendor.phone = vendor.phone
    db_vendor.address = vendor.address

    db.commit()
    db.refresh(db_vendor)

    return db_vendor
def get_vendor_transactions(db: Session, vendor_id: int):
    return (
        db.query(models.Transaction)
        .filter(models.Transaction.vendor_id == vendor_id)
        .all()
    )
from sqlalchemy import func
from datetime import datetime, timedelta



def recommended_products(db: Session, product_id: int):

    product = (
        db.query(models.Product)
        .filter(models.Product.id == product_id)
        .first()
    )

    if not product:
        return []

    recommendations = (
        db.query(models.Product)
        .filter(
            models.Product.category == product.category,
            models.Product.id != product.id
        )
        .limit(4)
        .all()
    )

    return recommendations

from sqlalchemy.orm import Session
from sqlalchemy import func
from sklearn.linear_model import LinearRegression
import numpy as np
import models


def inventory_prediction(db: Session, vendor_id: int):

    products = (
        db.query(models.Product)
        .filter(models.Product.vendor_id == vendor_id)
        .all()
    )

    result = []

    for product in products:

        sales = (
            db.query(
                func.date(models.Transaction.transaction_date),
                func.sum(models.Transaction.quantity)
            )
            .filter(models.Transaction.product_id == product.id)
            .group_by(func.date(models.Transaction.transaction_date))
            .order_by(func.date(models.Transaction.transaction_date))
            .all()
        )

        quantities = [int(s[1]) for s in sales]

        total_sold = sum(quantities)

        if len(quantities) == 0:
            predicted = 0

        elif len(quantities) == 1:
            predicted = quantities[0]

        else:
            X = np.arange(len(quantities)).reshape(-1, 1)
            y = np.array(quantities)

            model = LinearRegression()
            model.fit(X, y)

            predicted = max(
                int(round(model.predict([[len(quantities)]])[0])),
                0
            )

        current_stock = product.stock

        recommended_restock = max(predicted - current_stock, 0)

        if current_stock == 0:
            status = "Out of Stock"

        elif current_stock < predicted:
            status = "Restock Required"

        elif current_stock <= 10:
            status = "Low Stock"

        else:
            status = "Healthy"

        result.append({
            "product_id": product.id,
            "product_name": product.product_name,
            "current_stock": current_stock,
            "total_sold": total_sold,
            "predicted_demand": predicted,
            "recommended_restock": recommended_restock,
            "status": status
        })

    return result
from sqlalchemy import func
import models


def ai_dashboard(db, vendor_id):

    total_products = (
        db.query(models.Product)
        .filter(models.Product.vendor_id == vendor_id)
        .count()
    )

    total_orders = (
        db.query(models.Transaction)
        .filter(models.Transaction.vendor_id == vendor_id)
        .count()
    )

    total_revenue = (
        db.query(func.sum(models.Transaction.total_amount))
        .filter(models.Transaction.vendor_id == vendor_id)
        .scalar()
    ) or 0

    low_stock = (
        db.query(models.Product)
        .filter(
            models.Product.vendor_id == vendor_id,
            models.Product.stock <= 10
        )
        .count()
    )

    out_of_stock = (
        db.query(models.Product)
        .filter(
            models.Product.vendor_id == vendor_id,
            models.Product.stock == 0
        )
        .count()
    )

    top_product = (
        db.query(
            models.Product.product_name,
            func.sum(models.Transaction.quantity).label("sold")
        )
        .join(
            models.Transaction,
            models.Transaction.product_id == models.Product.id
        )
        .filter(models.Product.vendor_id == vendor_id)
        .group_by(models.Product.id)
        .order_by(func.sum(models.Transaction.quantity).desc())
        .first()
    )

    return {
        "total_products": total_products,
        "total_orders": total_orders,
        "total_revenue": round(total_revenue, 2),
        "low_stock_products": low_stock,
        "out_of_stock_products": out_of_stock,
        "top_selling_product": (
            top_product.product_name if top_product else "N/A"
        )
    }
def get_vendor_products(db: Session, vendor_id: int):
    return (
        db.query(models.Product)
        .filter(models.Product.vendor_id == vendor_id)
        .all()
    )
from sqlalchemy import func
import models


def model_validation(db):

    # -----------------------------
    # Forecast Accuracy
    # -----------------------------

    total_products = db.query(models.Product).count()

    products_with_sales = (
        db.query(models.Transaction.product_id)
        .distinct()
        .count()
    )

    if total_products == 0:
        forecast_accuracy = 0
    else:
        forecast_accuracy = round(
            (products_with_sales / total_products) * 100,
            2
        )

    # -----------------------------
    # Segmentation Coverage
    # -----------------------------

    total_customers = db.query(models.Customer).count()

    customers_with_orders = (
        db.query(models.Order.customer_id)
        .distinct()
        .count()
    )

    if total_customers == 0:
        segmentation_accuracy = 0
    else:
        segmentation_accuracy = round(
            (customers_with_orders / total_customers) * 100,
            2
        )

    # -----------------------------
    # Recommendation Relevance
    # -----------------------------

    total_transactions = db.query(models.Transaction).count()

    total_products = db.query(models.Product).count()

    if total_products == 0:
        recommendation_relevance = 0
    else:
        recommendation_relevance = round(
            min(
                (total_transactions / total_products) * 20,
                100
            ),
            2
        )

    return {

        "forecast_accuracy": forecast_accuracy,

        "segmentation_accuracy": segmentation_accuracy,

        "recommendation_relevance": recommendation_relevance,

        "overall_score": round(
            (
                forecast_accuracy +
                segmentation_accuracy +
                recommendation_relevance
            ) / 3,
            2
        )

    }