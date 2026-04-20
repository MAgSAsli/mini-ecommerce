const BASE = 'http://localhost:8000/api';

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
  category: string;
}

export interface Order {
  id: number;
  customer: { name: string; email: string; address: string };
  items: (Product & { qty: number; subtotal: number })[];
  total: number;
  status: string;
  createdAt: string;
}

export const getProducts = (params: Record<string, string> = {}): Promise<Product[]> => {
  const query = new URLSearchParams(params).toString();
  return fetch(`${BASE}/products?${query}`, { cache: 'no-store' }).then(r => r.json());
};

export const getProduct = (id: number | string): Promise<Product> =>
  fetch(`${BASE}/products/${id}`, { cache: 'no-store' }).then(r => r.json());

export const createOrder = (data: { customer: Order['customer']; items: { productId: number; qty: number }[] }): Promise<Order> =>
  fetch(`${BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(r => r.json());
