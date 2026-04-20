# 🛍️ Mini E-Commerce

Aplikasi e-commerce fullstack dengan fitur pembeli dan penjual, dibangun menggunakan Next.js dan NestJS.

🔗 **Demo**: [mini-ecommerce-mu-ten.vercel.app](https://mini-ecommerce-mu-ten.vercel.app)  
🔗 **Backend**: [mini-ecommerce-l78b.vercel.app](https://mini-ecommerce-l78b.vercel.app)

---

## ✨ Fitur

### 🛍️ Pembeli
- Lihat daftar produk dengan filter kategori & pencarian
- Detail produk
- Keranjang belanja
- Checkout & halaman sukses

### 🏪 Penjual
- Daftar & login sebagai penjual
- Dashboard untuk tambah, edit, dan hapus produk
- Produk yang ditambah langsung muncul di halaman utama

### 🔐 Autentikasi
- Register & login sebagai pembeli atau penjual
- Data user disimpan di localStorage

---

## 🧱 Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS |
| Backend | NestJS, TypeScript |
| Auth | localStorage |
| Deployment | Vercel |

---

## 📁 Struktur Project

```
ecommerce-mvp/
├── frontend/        # Next.js App
│   ├── app/
│   │   ├── login/         # Halaman login & register
│   │   ├── seller/
│   │   │   └── dashboard/ # Dashboard penjual
│   │   ├── cart/          # Keranjang belanja
│   │   ├── checkout/      # Halaman checkout
│   │   └── products/      # Detail produk
│   ├── components/        # Navbar, ProductCard
│   ├── context/           # AuthContext, CartContext
│   └── lib/               # API helper
└── backend/         # NestJS App
    └── src/
        ├── products/      # CRUD produk
        └── orders/        # Buat pesanan
```

---

## 🚀 Cara Menjalankan Lokal

### Backend
```bash
cd backend
npm install
npm run start:dev
```
Berjalan di: `http://localhost:8000`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Berjalan di: `http://localhost:3000`

---

## 🔌 API Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/products` | List produk (query: `category`, `search`) |
| GET | `/api/products/:id` | Detail produk |
| POST | `/api/orders` | Buat pesanan |

---

## ✅ Status Fitur

- ✅ List produk dengan filter & search
- ✅ Detail produk
- ✅ Keranjang belanja
- ✅ Checkout & success page
- ✅ Register & login (pembeli / penjual)
- ✅ Dashboard penjual (tambah, edit, hapus produk)
- ✅ Deploy ke Vercel
