from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from datetime import datetime

from database import Base


# -----------------------------
# Vendor Table
# -----------------------------
class Vendor(Base):
    __tablename__ = "vendors"

    id = Column(Integer, primary_key=True, index=True)
    business_name = Column(String(100))
    owner_name = Column(String(100))
    email = Column(String(100), unique=True)
    phone = Column(String(20))
    business_type = Column(String(100))
    address = Column(String(300))
    description = Column(String(500))
    shop_logo = Column(String(255))
    password = Column(String(100))
    status = Column(String(20), default="Pending")

    products = relationship("Product", back_populates="vendor")
    transactions = relationship("Transaction", back_populates="vendor")


# -----------------------------
# Admin Table
# -----------------------------
class Admin(Base):
    __tablename__ = "admins"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True)
    password = Column(String(100))


# -----------------------------
# Customer Table
# -----------------------------
class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100))
    email = Column(String(100), unique=True)
    phone = Column(String(20))
    password = Column(String(100))

    cart_items = relationship("Cart", back_populates="customer")
    wishlist_items = relationship("Wishlist", back_populates="customer")
    orders = relationship("Order", back_populates="customer")


# -----------------------------
# Product Table
# -----------------------------
class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String(100))
    category = Column(String(100))
    description = Column(String(500))
    original_price = Column(Float)
    discount = Column(Float, default=0)
    price = Column(Float)
    stock = Column(Integer)
    image = Column(String(255), nullable=True)

    vendor_id = Column(Integer, ForeignKey("vendors.id"))

    vendor = relationship("Vendor", back_populates="products")
    transactions = relationship("Transaction", back_populates="product")
    cart_items = relationship("Cart", back_populates="product")
    wishlist_items = relationship("Wishlist", back_populates="product")
    order_items = relationship("OrderItem", back_populates="product")


# -----------------------------
# Transaction Table
# -----------------------------
class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)

    vendor_id = Column(Integer, ForeignKey("vendors.id"))
    product_id = Column(Integer, ForeignKey("products.id"))

    quantity = Column(Integer, nullable=False)
    unit_price = Column(Float, nullable=False)
    total_amount = Column(Float, nullable=False)

    transaction_date = Column(DateTime, default=datetime.utcnow)

    vendor = relationship("Vendor", back_populates="transactions")
    product = relationship("Product", back_populates="transactions")


# -----------------------------
# Cart Table
# -----------------------------
class Cart(Base):
    __tablename__ = "cart"

    id = Column(Integer, primary_key=True, index=True)

    customer_id = Column(Integer, ForeignKey("customers.id"))
    product_id = Column(Integer, ForeignKey("products.id"))

    quantity = Column(Integer, default=1)

    customer = relationship("Customer", back_populates="cart_items")
    product = relationship("Product", back_populates="cart_items")


# -----------------------------
# Wishlist Table
# -----------------------------
class Wishlist(Base):
    __tablename__ = "wishlist"

    id = Column(Integer, primary_key=True, index=True)

    customer_id = Column(Integer, ForeignKey("customers.id"))
    product_id = Column(Integer, ForeignKey("products.id"))

    customer = relationship("Customer", back_populates="wishlist_items")
    product = relationship("Product", back_populates="wishlist_items")


# -----------------------------
# Order Table
# -----------------------------
class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)

    customer_id = Column(Integer, ForeignKey("customers.id"))

    total_amount = Column(Float)

    payment_method = Column(String(100))

    payment_status = Column(String(50), default="Pending")

    order_status = Column(String(50), default="Placed")

    address = Column(String(300))

    created_at = Column(DateTime, default=datetime.utcnow)

    customer = relationship("Customer", back_populates="orders")
    items = relationship("OrderItem", back_populates="order")


# -----------------------------
# Order Item Table
# -----------------------------
class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)

    order_id = Column(Integer, ForeignKey("orders.id"))
    product_id = Column(Integer, ForeignKey("products.id"))

    quantity = Column(Integer)

    price = Column(Float)

    order = relationship("Order", back_populates="items")
    product = relationship("Product", back_populates="order_items")
