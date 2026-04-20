'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const router = useRouter();
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(255,255,255,0.95)' : '#fff',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #f0ece4',
      boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.06)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: 22, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#1c1c1e' }}>
            Toko<span style={{ color: '#c9a96e' }}>Ku</span>
          </span>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Link href="/" style={{ textDecoration: 'none', fontSize: 14, fontWeight: 500, color: '#6b6b6b' }}>Produk</Link>

          {user ? (
            <>
              {user.role === 'seller' && (
                <Link href="/seller/dashboard" style={{ textDecoration: 'none', fontSize: 14, fontWeight: 500, color: '#6b6b6b' }}>
                  🏪 Dashboard
                </Link>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 13, color: '#6b6b6b' }}>
                  {user.role === 'seller' ? '🏪' : '👤'} {user.name}
                </span>
                <button onClick={() => { logout(); router.push('/'); }} style={{
                  padding: '7px 14px', background: '#faf9f7', border: '1.5px solid #f0ece4',
                  borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer', color: '#6b6b6b',
                }}>
                  Keluar
                </button>
              </div>
            </>
          ) : (
            <Link href="/login" style={{
              textDecoration: 'none', padding: '8px 18px',
              border: '1.5px solid #1c1c1e', borderRadius: 20,
              fontSize: 13, fontWeight: 600, color: '#1c1c1e',
            }}>
              Masuk
            </Link>
          )}

          {user?.role !== 'seller' && (
            <Link href="/cart" style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: count > 0 ? '#1c1c1e' : 'transparent',
                border: '1.5px solid #1c1c1e', borderRadius: 100,
                padding: '8px 18px', transition: 'all 0.2s',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={count > 0 ? '#fff' : '#1c1c1e'} strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
                </svg>
                <span style={{ fontSize: 13, fontWeight: 600, color: count > 0 ? '#fff' : '#1c1c1e' }}>
                  Keranjang {count > 0 && `(${count})`}
                </span>
              </div>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
