'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, updateQty, total } = useCart();
  const router = useRouter();

  if (cart.length === 0) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', padding: 24 }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: '#1c1c1e', marginBottom: 8 }}>Keranjang Kosong</h2>
      <p style={{ color: '#9e9e9e', marginBottom: 28, fontSize: 14 }}>Belum ada produk yang ditambahkan</p>
      <Link href="/" style={{
        padding: '12px 32px', background: '#1c1c1e', color: '#fff', borderRadius: 50,
        textDecoration: 'none', fontWeight: 600, fontSize: 14,
      }}>
        Mulai Belanja
      </Link>
    </div>
  );

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: '#1c1c1e', marginBottom: 8 }}>Keranjang Belanja</h1>
      <p style={{ color: '#9e9e9e', fontSize: 13, marginBottom: 28 }}>{cart.length} produk dipilih</p>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Items */}
        <div style={{ flex: 2, minWidth: 300 }}>
          {cart.map((item, idx) => (
            <div key={item.id} style={{
              display: 'flex', gap: 16, alignItems: 'center',
              background: '#fff', borderRadius: 16, padding: 16, marginBottom: 12,
              border: '1px solid #f0ece4', flexWrap: 'wrap',
              animation: 'fadeIn 0.3s ease',
            }}>
              <div style={{ position: 'relative', width: 80, height: 80, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
                <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} unoptimized />
              </div>
              <div style={{ flex: 1, minWidth: 120 }}>
                <span style={{ fontSize: 10, color: '#c9a96e', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>{item.category}</span>
                <p style={{ fontWeight: 600, color: '#1c1c1e', fontSize: 14, margin: '4px 0 2px' }}>{item.name}</p>
                <p style={{ color: '#9e9e9e', fontSize: 13 }}>Rp {item.price.toLocaleString('id-ID')}</p>
              </div>
              {/* Qty control */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1px solid #f0ece4', borderRadius: 10, overflow: 'hidden' }}>
                <button onClick={() => updateQty(item.id, item.qty - 1)}
                  style={{ width: 36, height: 36, border: 'none', background: '#faf9f7', cursor: 'pointer', fontSize: 16, color: '#1c1c1e', fontWeight: 500 }}>−</button>
                <span style={{ width: 36, textAlign: 'center', fontWeight: 700, fontSize: 14 }}>{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)}
                  style={{ width: 36, height: 36, border: 'none', background: '#faf9f7', cursor: 'pointer', fontSize: 16, color: '#1c1c1e', fontWeight: 500 }}>+</button>
              </div>
              <p style={{ fontWeight: 700, color: '#1c1c1e', fontSize: 14, minWidth: 100, textAlign: 'right' }}>
                Rp {(item.price * item.qty).toLocaleString('id-ID')}
              </p>
              <button onClick={() => removeFromCart(item.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d0c8bc', fontSize: 18, padding: 4, lineHeight: 1 }}>✕</button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div style={{ flex: 1, minWidth: 240, background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #f0ece4', position: 'sticky', top: 80 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: '#1c1c1e', marginBottom: 20 }}>Ringkasan</h3>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#6b6b6b', marginBottom: 8 }}>
              <span>{item.name} ×{item.qty}</span>
              <span>Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid #f0ece4', marginTop: 16, paddingTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 16, marginBottom: 20 }}>
              <span>Total</span>
              <span>Rp {total.toLocaleString('id-ID')}</span>
            </div>
            <button onClick={() => router.push('/checkout')} style={{
              width: '100%', padding: '14px', background: '#1c1c1e', color: '#fff',
              border: 'none', borderRadius: 12, fontWeight: 600, fontSize: 14, cursor: 'pointer',
            }}>
              Lanjut Checkout →
            </button>
            <Link href="/" style={{
              display: 'block', textAlign: 'center', marginTop: 12, fontSize: 13,
              color: '#9e9e9e', textDecoration: 'none',
            }}>
              ← Lanjut Belanja
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
