'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/api';
import { useState } from 'react';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, cart } = useCart();
  const [added, setAdded] = useState(false);
  const inCart = cart.find(i => i.id === product.id);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div style={{
      background: '#fff',
      borderRadius: 16,
      overflow: 'hidden',
      border: '1px solid #f0ece4',
      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      cursor: 'pointer',
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
    >
      <Link href={`/products/${product.id}`} style={{ textDecoration: 'none', display: 'block', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
          <Image
            src={product.image} alt={product.name}
            fill style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
            unoptimized
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          />
          {product.stock === 0 && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 600, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase' }}>Habis</span>
            </div>
          )}
          {product.stock > 0 && product.stock <= 5 && (
            <div style={{ position: 'absolute', top: 10, right: 10, background: '#fff3e0', color: '#e65100', fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 20 }}>
              Sisa {product.stock}
            </div>
          )}
        </div>
      </Link>

      <div style={{ padding: '14px 16px 16px' }}>
        <span style={{ fontSize: 11, color: '#c9a96e', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>{product.category}</span>
        <Link href={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
          <p style={{ fontWeight: 600, color: '#1c1c1e', margin: '6px 0 4px', fontSize: 14, lineHeight: 1.4 }}>{product.name}</p>
        </Link>
        <p style={{ color: '#1c1c1e', fontWeight: 700, fontSize: 15, marginBottom: 12 }}>
          Rp {product.price.toLocaleString('id-ID')}
        </p>
        <button
          onClick={handleAdd}
          disabled={product.stock === 0}
          style={{
            width: '100%', padding: '10px', borderRadius: 10, border: 'none', cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
            background: added ? '#4caf50' : product.stock === 0 ? '#f0ece4' : '#1c1c1e',
            color: product.stock === 0 ? '#aaa' : '#fff',
            fontWeight: 600, fontSize: 13, letterSpacing: 0.3,
            transition: 'all 0.2s ease',
          }}
        >
          {added ? '✓ Ditambahkan' : product.stock === 0 ? 'Stok Habis' : inCart ? `+ Tambah Lagi (${inCart.qty})` : '+ Keranjang'}
        </button>
      </div>
    </div>
  );
}
