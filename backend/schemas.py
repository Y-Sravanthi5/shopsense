from pydantic import BaseModel

# ==========================================================
# Vendor
# ==========================================================

class VendorCreate(BaseModel):
    business_name: str
    owner_name: str
    email: str
    phone: str
    business_type: str
    address: str
    description: str
    password: str


class VendorLogin(BaseModel):
    email: str
    password: str


class VendorUpdate(BaseModel):
    business_name: str
    email: str
    phone: str
    address: str


# ==========================================================
# Admin
# ==========================================================

class AdminLogin(BaseModel):
    username: str
    password: str


# ==========================================================
# Product
# ==========================================================

class ProductCreate(BaseModel):
    product_name: str
    category: str
    description: str
    original_price: float
    discount: float
    price: float
    stock: int
    vendor_id: int


# ==========================================================
# Customer
# ==========================================================

class CustomerCreate(BaseModel):
    full_name: str
    email: str
    phone: str
    password: str


class CustomerLogin(BaseModel):
    email: str
    password: str


# ==========================================================
# Cart
# ==========================================================

class CartCreate(BaseModel):
    customer_id: int
    product_id: int
    quantity: int = 1


class CartUpdate(BaseModel):
    quantity: int


class CartResponse(BaseModel):
    id: int
    customer_id: int
    product_id: int
    quantity: int

    class Config:
        from_attributes = True


# ==========================================================
# Wishlist
# ==========================================================

class WishlistCreate(BaseModel):
    customer_id: int
    product_id: int


class WishlistResponse(BaseModel):
    id: int
    customer_id: int
    product_id: int

    class Config:
        from_attributes = True


# ==========================================================
# Orders
# ==========================================================

class OrderCreate(BaseModel):
    customer_id: int
    payment_method: str
    address: str


class OrderItemResponse(BaseModel):
    product_name: str
    quantity: int
    unit_price: float
    subtotal: float

    class Config:
        from_attributes = True


class OrderResponse(BaseModel):
    id: int
    customer_id: int
    total_amount: float
    payment_method: str
    address: str

    class Config:
        from_attributes = True


# ==========================================================
# Transactions
# ==========================================================

class TransactionCreate(BaseModel):
    vendor_id: int
    product_id: int
    quantity: int


# ==========================================================
# Inventory Analytics
# ==========================================================

class InventoryAnalytics(BaseModel):
    product_id: int
    product_name: str
    stock: int
    total_sold: int
    status: str


# ==========================================================
# Sales Forecast
# ==========================================================

class ForecastResponse(BaseModel):
    product_id: int
    product_name: str
    predicted_sales: float
    suggested_restock: int


# ==========================================================
# Customer Analytics
# ==========================================================

class CustomerAnalytics(BaseModel):
    customer_id: int
    customer_name: str
    total_orders: int
    total_spent: float
    average_order_value: float
    segment: str


# ==========================================================
# Recommendation
# ==========================================================

class RecommendationResponse(BaseModel):
    product_id: int
    product_name: str
    score: float