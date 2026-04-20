'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { getProduct, Product } from '@/lib/api';
import { useCart } from '@/context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart, cart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [added, setAdded] = useState(false);
  const inCart = cart.find(i => i.id === product?.id);

  useEffect(() => {
    getProduct(id as string).then(setProduct);
  }, [id]);

  const handleAdd = () => {
    if (!product) return;
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (!product) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <div style={{ textAlign: 'center', color: '#9e9e9e' }}>
        <div style={{ width: 40, height: 40, border: '3px solid #f0ece4', borderTop: '3px solid #c9a96e', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
        <p>Memuat produk...</p>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28, fontSize: 13, color: '#9e9e9e' }}>
        <button onClick={() => router.push('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9e9e9e', padding: 0, fontSize: 13 }}>Beranda</button>
        <span>/</span>
        <span style={{ color: '#c9a96e' }}>{product.category}</span>
        <span>/</span>
        <span style={{ color: '#1c1c1e', fontWeight: 500 }}>{product.name}</span>
      </div>

      <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', background: '#fff', borderRadius: 20, overflow: 'hidden', border: '1px solid #f0ece4' }}>
        {/* Image */}
        <div style={{ position: 'relative', width: '100%', maxWidth: 420, minHeight: 380, flexShrink: 0 }}>
          <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} unoptimized />
          {product.stock === 0 && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: 18, letterSpacing: 2, textTransform: 'uppercase' }}>Stok Habis</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ flex: 1, padding: '36px 32px 36px 0', minWidth: 260, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ fontSize: 11, color: '#c9a96e', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>{product.category}</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: '#1c1c1e', margin: '10px 0 8px', lineHeight: 1.3 }}>{product.name}</h1>
          <p style={{ fontSize: 26, fontWeight: 700, color: '#1c1c1e', marginBottom: 20 }}>
            Rp {product.price.toLocaleString('id-ID')}
          </p>

          {/* Stock indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: product.stock > 5 ? '#4caf50' : product.stock > 0 ? '#ff9800' : '#f44336' }} />
            <span style={{ fontSize: 13, color: '#6b6b6b' }}>
              {product.stock === 0 ? 'Stok habis' : product.stock <= 5 ? `Sisa ${product.stock} item` : 'Tersedia'}
            </span>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={handleAdd}
              disabled={product.stock === 0}
              style={{
                flex: 1, minWidth: 160, padding: '14px 24px', borderRadius: 12, border: 'none',
                cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                background: added ? '#4caf50' : product.stock === 0 ? '#f0ece4' : '#1c1c1e',
                color: product.stock === 0 ? '#aaa' : '#fff',
                fontWeight: 600, fontSize: 14, transition: 'all 0.2s',
              }}
            >
              {added ? '✓ Ditambahkan!' : product.stock === 0 ? 'Stok Habis' : inCart ? `+ Tambah Lagi (${inCart.qty} di keranjang)` : '+ Tambah ke Keranjang'}
            </button>
            {inCart && (
              <button
                onClick={() => router.push('/cart')}
                style={{
                  padding: '14px 24px', borderRadius: 12, border: '1.5px solid #1c1c1e',
                  background: 'transparent', color: '#1c1c1e', fontWeight: 600, fontSize: 14, cursor: 'pointer',
                }}
              >
                Lihat Keranjang
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
