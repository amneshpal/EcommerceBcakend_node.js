 E-commerce Backend

[![Node.js](https://img.shields.io/badge/Node.js-v20.0.0-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v6.0.0-green)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

---

## Project Overview
**Vendora** is a multi-role e-commerce backend supporting **Customer, Vendor, and Admin** roles.  
It provides features like:

- Product CRUD operations  
- Cart management  
- Order placement and pending order tracking  
- Wishlist / Favorites  
- Reviews & Ratings  
- Pagination, search & filters  
- Analytics (sales, top products, users)  
- Email notifications for order confirmation  

> **Payment Integration (Stripe/Razorpay)** is pending and will be added later.

---

## Tech Stack
| Layer | Technology / Library |
|-------|--------------------|
| Backend | Node.js + Express.js |
| Database | MongoDB (NoSQL) |
| Authentication | JWT (JSON Web Token) |
| Validation | Joi / Zod |
| Password Security | bcrypt.js |
| Payment Gateway | Stripe / Razorpay (Pending) |
| Email | Nodemailer |
| Logging | Morgan |
| Deployment | Heroku / Railway / AWS |
| Testing | Postman / Jest |

---

## User Roles & Permissions
| Role | Permissions |
|------|-------------|
| Customer | Signup/Login, Browse products, Add to cart, Place orders, View orders |
| Vendor | Manage products (CRUD), View vendor-specific orders |
| Admin | Manage users/vendors, View all orders, Analytics, Manage products |

---

## Database Design

### Users
```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string",
  "password": "hashed string",
  "role": "customer/vendor/admin",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```
---
### Products Collection
```json
{
  "_id": "ObjectId",
  "name": "string",
  "description": "string",
  "price": "number",
  "category": "string",
  "stock": "number",
  "images": ["string"],
  "vendorId": "ObjectId",
  "reviews": [
    { "userId": "ObjectId", "rating": "number", "comment": "string", "createdAt": "Date" }
  ],
  "createdAt": "Date",
  "updatedAt": "Date"
}
```
---
### Cart Collection
```json

{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "products": [
    { "productId": "ObjectId", "quantity": "number" }
  ]
}
```
---
### Orders Collection
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "products": [
    { "productId": "ObjectId", "quantity": "number", "price": "number" }
  ],
  "totalPrice": "number",
  "status": "pending/confirmed/shipped/delivered/cancelled",
  "paymentStatus": "paid/unpaid",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```
---
### Wishlist Collection
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "products": ["ObjectId"],
  "createdAt": "Date",
  "updatedAt": "Date"
}
```
---


## API Endpoints
### Auth
```
POST /api/auth/signup – Register user

POST /api/auth/login – Login user

GET /api/auth/profile – Get logged-in user info

POST /api/auth/forgot-password – Request password reset

POST /api/auth/reset-password – Reset password
```
---
### Products
```
GET /api/products – List all products (supports pagination, search, filters)

GET /api/products/:id – Get single product

POST /api/products – Add product (vendor/admin)

PUT /api/products/:id – Update product (vendor/admin)

DELETE /api/products/:id – Delete product (vendor/admin)

POST /api/products/:id/review – Add product review

GET /api/products/:id/reviews – Get all reviews
```
---
### Cart
```
POST /api/cart – Add product to cart

GET /api/cart/:userId – Get user cart

PUT /api/cart/:userId – Update product quantity

DELETE /api/cart/:userId/:productId – Remove product
```
---

### Orders
```
POST /api/orders – Place order (sends email notification)

GET /api/orders – Get all orders (admin/vendor)

GET /api/orders/user/:userId – Get user orders

PUT /api/orders/:id – Update order status (admin/vendor)

GET /api/orders/pending – Get all pending orders
```
---

### Wishlist
```
POST /api/wishlist/:productId – Add product to wishlist

GET /api/wishlist – Get user wishlist

DELETE /api/wishlist/:productId – Remove product
```
---
### Analytics (Admin)
```
GET /api/analytics/sales – Total sales & revenue

GET /api/analytics/products – Top-selling products

GET /api/analytics/users – Total customers/vendors
```
---

## Installation
```
Clone the repository:
git clone <repo-url>
cd ecommerce-backend
```
---

## Install dependencies:
```
npm install

```
---

## Create .env file in root:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_or_app_password

RAZORPAY_KEY_ID=your_key_id
RAZORPAY_SECRET=your_secret_key
```


## Start the server:
```
npm run dev
```
Test APIs via Postman.

Project Structure
```
ecommerce-backend/
├─ server.js
├─ package.json
├─ .env
├─ config/
├─ controllers/
├─ models/
├─ routes/
├─ middlewares/
└─ utils/
```



## License
```
This project is licensed under the MIT License.
```

---

  


