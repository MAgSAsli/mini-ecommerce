# 🛍️ Mini E-Commerce

A fullstack e-commerce application with buyer and seller features, built with Next.js and NestJS.

🔗 **Live Demo**: [mini-ecommerce-mu-ten.vercel.app](https://mini-ecommerce-mu-ten.vercel.app)  
🔗 **Backend**: [mini-ecommerce-l78b.vercel.app](https://mini-ecommerce-l78b.vercel.app)

---

## ✨ Features

### 🛍️ Buyer
- Browse products with category filter & search
- Product detail page
- Shopping cart
- Checkout & order success page

### 🏪 Seller
- Register & login as a seller
- Dashboard to add, edit, and delete products
- Products added by sellers appear instantly on the main page

### 🔐 Authentication
- Register & login as buyer or seller
- User data stored in localStorage

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS |
| Backend | NestJS, TypeScript |
| Auth | localStorage |
| Deployment | Vercel |

---

## 📁 Project Structure

```
ecommerce-mvp/
├── frontend/        # Next.js App
│   ├── app/
│   │   ├── login/         # Login & register page
│   │   ├── seller/
│   │   │   └── dashboard/ # Seller dashboard
│   │   ├── cart/          # Shopping cart
│   │   ├── checkout/      # Checkout page
│   │   └── products/      # Product detail
│   ├── components/        # Navbar, ProductCard
│   ├── context/           # AuthContext, CartContext
│   └── lib/               # API helper
└── backend/         # NestJS App
    └── src/
        ├── products/      # Product endpoints
        └── orders/        # Order endpoints
```

---

## 🚀 Getting Started

### Backend
```bash
cd backend
npm install
npm run start:dev
```
Runs on: `http://localhost:8000`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs on: `http://localhost:3000`

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (query: `category`, `search`) |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/orders` | Create an order |

---

## ✅ Feature Checklist

- ✅ Product listing with filter & search
- ✅ Product detail page
- ✅ Shopping cart
- ✅ Checkout & success page
- ✅ Register & login (buyer / seller)
- ✅ Seller dashboard (add, edit, delete products)
- ✅ Deployed to Vercel
