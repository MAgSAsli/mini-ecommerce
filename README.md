# Ecommerce MVP - Next.js + Nest.js

Mini ecommerce dengan fitur:
- List produk dengan filter kategori & search
- Detail produk
- Keranjang belanja
- Checkout & success page

## Tech Stack
- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Nest.js + TypeScript

## Cara Menjalankan

### Backend (Nest.js)
```bash
cd backend
npm run start:dev
```
Backend berjalan di: http://localhost:5000

### Frontend (Next.js)
```bash
cd frontend
npm run dev
```
Frontend berjalan di: http://localhost:3000

## API Endpoints
- `GET /api/products` - List produk (query: category, search)
- `GET /api/products/:id` - Detail produk
- `POST /api/orders` - Buat pesanan
- `GET /api/orders` - List pesanan

## Fitur
✅ List produk dengan filter & search
✅ Detail produk
✅ Keranjang belanja (client-side state)
✅ Checkout form
✅ Success page
✅ Stock management
