'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { createOrder } from '@/lib/api';

const fields = [
  { key: 'name', label: 'Nama Lengkap', type: 'text', placeholder: 'Masukkan nama lengkap' },
  { key: 'email', label: 'Email', type: 'email', placeholder: 'contoh@email.com' },
  { key: 'address', label: 'Alamat Pengiriman', type: 'textarea', placeholder: 'Jl. Contoh No. 123, Kota...' },
] as const;

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (cart.length === 0) { router.push('/'); return null; }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await createOrder({
      customer: form,
      items: cart.map(i => ({ productId: i.id, qty: i.qty })),
    });
    setLoading(false);
    if ('message' in result) return setError(result.message as string);
    clearCart();
    router.push(`/success?orderId=${result.id}&name=${encodeURIComponent(form.name)}&total=${result.total}`);
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 24px' }}>
      {/* Steps indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, fontSize: 13 }}>
        <span style={{ color: '#9e9e9e' }}>Keranjang</span>
        <span style={{ color: '#d0c8bc' }}>›</span>
        <span style={{ color: '#c9a96e', fontWeight: 600 }}>Checkout</span>
        <span style={{ color: '#d0c8bc' }}>›</span>
        <span style={{ color: '#9e9e9e' }}>Selesai</span>
      </div>

      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: '#1c1c1e', marginBottom: 28 }}>Detail Pemesanan</h1>

      <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Form */}
        <form onSubmit={handleSubmit} style={{ flex: 2, minWidth: 300, background: '#fff', borderRadius: 20, padding: 32, border: '1px solid #f0ece4' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1c1c1e', marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid #f0ece4' }}>
            Informasi Pembeli
          </h3>
          {fields.map(field => (
            <div key={field.key} style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#6b6b6b', marginBottom: 8, letterSpacing: 0.3 }}>
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  rows={3} required
                  placeholder={field.placeholder}
                  value={form[field.key]}
                  onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                  style={{
                    width: '100%', padding: '12px 14px', border: '1.5px solid #f0ece4',
                    borderRadius: 10, fontSize: 14, outline: 'none', resize: 'vertical',
                    fontFamily: 'Inter, sans-serif', color: '#1c1c1e', background: '#faf9f7',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = '#c9a96e'}
                  onBlur={e => e.target.style.borderColor = '#f0ece4'}
                />
              ) : (
                <input
                  type={field.type} required
                  placeholder={field.placeholder}
                  value={form[field.key]}
                  onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                  style={{
                    width: '100%', padding: '12px 14px', border: '1.5px solid #f0ece4',
                    borderRadius: 10, fontSize: 14, outline: 'none', color: '#1c1c1e',
                    background: '#faf9f7', transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = '#c9a96e'}
                  onBlur={e => e.target.style.borderColor = '#f0ece4'}
                />
              )}
            </div>
          ))}
          {error && (
            <div style={{ background: '#fff3f3', border: '1px solid #ffcdd2', borderRadius: 10, padding: '12px 16px', marginBottom: 16, fontSize: 13, color: '#c62828' }}>
              ⚠️ {error}
            </div>
          )}
          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '15px', background: loading ? '#9e9e9e' : '#1c1c1e',
            color: '#fff', border: 'none', borderRadius: 12, fontWeight: 700,
            fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: 0.3,
            transition: 'background 0.2s',
          }}>
            {loading ? 'Memproses Pesanan...' : 'Buat Pesanan →'}
          </button>
        </form>

        {/* Order Summary */}
        <div style={{ flex: 1, minWidth: 240, background: '#fff', borderRadius: 20, padding: 24, border: '1px solid #f0ece4', position: 'sticky', top: 80 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: '#1c1c1e', marginBottom: 20 }}>Pesanan Anda</h3>
          <div style={{ marginBottom: 16 }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, gap: 8 }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#1c1c1e', margin: 0 }}>{item.name}</p>
                  <p style={{ fontSize: 12, color: '#9e9e9e', margin: '2px 0 0' }}>×{item.qty}</p>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#1c1c1e', whiteSpace: 'nowrap' }}>
                  Rp {(item.price * item.qty).toLocaleString('id-ID')}
                </span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid #f0ece4', paddingTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, color: '#6b6b6b' }}>
              <span>Subtotal</span><span>Rp {total.toLocaleString('id-ID')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, color: '#6b6b6b' }}>
              <span>Ongkir</span><span style={{ color: '#4caf50' }}>Gratis</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 16, marginTop: 12, paddingTop: 12, borderTop: '1px solid #f0ece4' }}>
              <span>Total</span>
              <span>Rp {total.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
