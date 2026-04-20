'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, Role } from '@/context/AuthContext';

export default function LoginPage() {
  const { login, register } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<Role>('buyer');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    let err: string | null;
    if (mode === 'login') {
      err = login(form.email, form.password);
    } else {
      err = register(form.name, form.email, form.password, role);
    }
    if (err) return setError(err);
    router.push(role === 'seller' && mode === 'register' ? '/seller/dashboard' : '/');
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 420, background: '#fff', borderRadius: 20, padding: 36, border: '1px solid #f0ece4', boxShadow: '0 8px 40px rgba(0,0,0,0.06)' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: '#1c1c1e', marginBottom: 6, textAlign: 'center' }}>
          {mode === 'login' ? 'Masuk' : 'Daftar'}
        </h1>
        <p style={{ color: '#9e9e9e', fontSize: 13, textAlign: 'center', marginBottom: 28 }}>
          {mode === 'login' ? 'Selamat datang kembali!' : 'Buat akun baru'}
        </p>

        {mode === 'register' && (
          <div style={{ display: 'flex', background: '#faf9f7', borderRadius: 12, padding: 4, marginBottom: 24 }}>
            {(['buyer', 'seller'] as Role[]).map(r => (
              <button key={r} onClick={() => setRole(r)} style={{
                flex: 1, padding: '10px', border: 'none', borderRadius: 10, cursor: 'pointer',
                background: role === r ? '#1c1c1e' : 'transparent',
                color: role === r ? '#fff' : '#9e9e9e',
                fontWeight: 600, fontSize: 13, transition: 'all 0.2s',
              }}>
                {r === 'buyer' ? '🛍️ Pembeli' : '🏪 Penjual'}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#6b6b6b', display: 'block', marginBottom: 6 }}>Nama</label>
              <input required placeholder="Nama lengkap" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #f0ece4', borderRadius: 10, fontSize: 14, outline: 'none', background: '#faf9f7' }}
                onFocus={e => e.target.style.borderColor = '#c9a96e'}
                onBlur={e => e.target.style.borderColor = '#f0ece4'}
              />
            </div>
          )}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#6b6b6b', display: 'block', marginBottom: 6 }}>Email</label>
            <input required type="email" placeholder="contoh@email.com" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #f0ece4', borderRadius: 10, fontSize: 14, outline: 'none', background: '#faf9f7' }}
              onFocus={e => e.target.style.borderColor = '#c9a96e'}
              onBlur={e => e.target.style.borderColor = '#f0ece4'}
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#6b6b6b', display: 'block', marginBottom: 6 }}>Password</label>
            <input required type="password" placeholder="••••••••" value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #f0ece4', borderRadius: 10, fontSize: 14, outline: 'none', background: '#faf9f7' }}
              onFocus={e => e.target.style.borderColor = '#c9a96e'}
              onBlur={e => e.target.style.borderColor = '#f0ece4'}
            />
          </div>

          {error && (
            <div style={{ background: '#fff3f3', border: '1px solid #ffcdd2', borderRadius: 10, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#c62828' }}>
              ⚠️ {error}
            </div>
          )}

          <button type="submit" style={{
            width: '100%', padding: '14px', background: '#1c1c1e', color: '#fff',
            border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: 'pointer',
          }}>
            {mode === 'login' ? 'Masuk →' : 'Daftar →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#9e9e9e' }}>
          {mode === 'login' ? 'Belum punya akun?' : 'Sudah punya akun?'}{' '}
          <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
            style={{ background: 'none', border: 'none', color: '#c9a96e', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>
            {mode === 'login' ? 'Daftar' : 'Masuk'}
          </button>
        </p>
      </div>
    </div>
  );
}
