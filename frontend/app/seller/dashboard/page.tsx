'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Product } from '@/lib/api';

const EMPTY_FORM = { name: '', price: '', stock: '', image: '', category: 'Fashion' };
const CATEGORIES = ['Fashion', 'Elektronik', 'Aksesoris'];

export default function SellerDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'seller') { router.push('/login'); return; }
    const stored = localStorage.getItem(`seller_products_${user.email}`);
    if (stored) setProducts(JSON.parse(stored));
  }, [user, router]);

  const save = (updated: Product[]) => {
    setProducts(updated);
    localStorage.setItem(`seller_products_${user!.email}`, JSON.stringify(updated));
    // merge ke global products
    const allStored = localStorage.getItem('all_seller_products');
    const all: Product[] = allStored ? JSON.parse(allStored) : [];
    const filtered = all.filter((p: Product) => !updated.find(u => u.id === p.id) && !products.find(old => old.id === p.id));
    localStorage.setItem('all_seller_products', JSON.stringify([...filtered, ...updated]));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: editId ?? Date.now(),
      name: form.name,
      price: Number(form.price),
      stock: Number(form.stock),
      image: form.image || `https://picsum.photos/seed/${form.name}/300/200`,
      category: form.category,
    };
    const updated = editId
      ? products.map(p => p.id === editId ? product : p)
      : [...products, product];
    save(updated);
    setForm(EMPTY_FORM);
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (p: Product) => {
    setForm({ name: p.name, price: String(p.price), stock: String(p.stock), image: p.image, category: p.category });
    setEditId(p.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    const updated = products.filter(p => p.id !== id);
    save(updated);
  };

  if (!user) return null;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: '#1c1c1e', margin: 0 }}>Dashboard Penjual</h1>
          <p style={{ color: '#9e9e9e', fontSize: 13, marginTop: 4 }}>Halo, {user.name} 👋</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => { setShowForm(true); setEditId(null); setForm(EMPTY_FORM); }} style={{
            padding: '10px 20px', background: '#1c1c1e', color: '#fff', border: 'none',
            borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: 'pointer',
          }}>
            + Tambah Produk
          </button>
          <button onClick={() => { logout(); router.push('/'); }} style={{
            padding: '10px 20px', background: '#fff', color: '#6b6b6b', border: '1.5px solid #f0ece4',
            borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: 'pointer',
          }}>
            Keluar
          </button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: '#fff', borderRadius: 16, padding: 28, border: '1px solid #f0ece4', marginBottom: 28 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1c1c1e', marginBottom: 20 }}>
            {editId ? 'Edit Produk' : 'Tambah Produk Baru'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { key: 'name', label: 'Nama Produk', placeholder: 'Nama produk', type: 'text' },
                { key: 'price', label: 'Harga (Rp)', placeholder: '100000', type: 'number' },
                { key: 'stock', label: 'Stok', placeholder: '10', type: 'number' },
                { key: 'image', label: 'URL Gambar (opsional)', placeholder: 'https://...', type: 'text' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#6b6b6b', display: 'block', marginBottom: 6 }}>{f.label}</label>
                  <input required={f.key !== 'image'} type={f.type} placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #f0ece4', borderRadius: 10, fontSize: 14, outline: 'none', background: '#faf9f7' }}
                    onFocus={e => e.target.style.borderColor = '#c9a96e'}
                    onBlur={e => e.target.style.borderColor = '#f0ece4'}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#6b6b6b', display: 'block', marginBottom: 6 }}>Kategori</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #f0ece4', borderRadius: 10, fontSize: 14, outline: 'none', background: '#faf9f7' }}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button type="submit" style={{ padding: '10px 24px', background: '#1c1c1e', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                {editId ? 'Simpan Perubahan' : 'Tambah Produk'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditId(null); setForm(EMPTY_FORM); }}
                style={{ padding: '10px 24px', background: '#fff', color: '#6b6b6b', border: '1.5px solid #f0ece4', borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Product list */}
      {products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#9e9e9e' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
          <p style={{ fontSize: 15, fontWeight: 500 }}>Belum ada produk</p>
          <p style={{ fontSize: 13, marginTop: 6 }}>Klik "Tambah Produk" untuk mulai berjualan</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {products.map(p => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#fff', borderRadius: 14, padding: '14px 18px', border: '1px solid #f0ece4' }}>
              <img src={p.image} alt={p.name} style={{ width: 60, height: 60, borderRadius: 10, objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, color: '#1c1c1e', fontSize: 14, margin: 0 }}>{p.name}</p>
                <p style={{ color: '#9e9e9e', fontSize: 12, margin: '3px 0 0' }}>{p.category} · Stok: {p.stock}</p>
              </div>
              <p style={{ fontWeight: 700, color: '#1c1c1e', fontSize: 14 }}>Rp {p.price.toLocaleString('id-ID')}</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => handleEdit(p)} style={{ padding: '7px 14px', background: '#faf9f7', border: '1.5px solid #f0ece4', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', color: '#6b6b6b' }}>Edit</button>
                <button onClick={() => handleDelete(p.id)} style={{ padding: '7px 14px', background: '#fff3f3', border: '1.5px solid #ffcdd2', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', color: '#c62828' }}>Hapus</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
