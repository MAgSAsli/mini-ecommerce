'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getProducts, Product } from '@/lib/api';
import ProductCard from '@/components/ProductCard';

const CATEGORIES = ['Semua', 'Fashion', 'Elektronik', 'Aksesoris'];

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const category = searchParams.get('category') || 'Semua';
  const search = searchParams.get('search') || '';

  const updateParams = useCallback((newCategory: string, newSearch: string) => {
    const params = new URLSearchParams();
    if (newCategory !== 'Semua') params.set('category', newCategory);
    if (newSearch) params.set('search', newSearch);
    const query = params.toString();
    router.replace(query ? `/?${query}` : '/', { scroll: false });
  }, [router]);

  useEffect(() => {
    setLoading(true);
    const params: Record<string, string> = {};
    if (category !== 'Semua') params.category = category;
    if (search) params.search = search;
    getProducts(params).then(data => { setProducts(data); setLoading(false); });
  }, [category, search]);

  return (
    <div>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #1c1c1e 0%, #2d2d30 50%, #3a3028 100%)',
        padding: '64px 24px',
        textAlign: 'center',
      }}>
        <p style={{ color: '#c9a96e', fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 12 }}>
          Koleksi Terbaru
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, margin: '0 0 16px', lineHeight: 1.2 }}>
          Temukan Gaya <br /><span style={{ color: '#c9a96e' }}>Terbaik Anda</span>
        </h1>
        <p style={{ color: '#9e9e9e', fontSize: 15, maxWidth: 400, margin: '0 auto 32px' }}>
          Produk pilihan berkualitas tinggi untuk melengkapi penampilan Anda sehari-hari.
        </p>

        {/* Search */}
        <div style={{ maxWidth: 480, margin: '0 auto', position: 'relative' }}>
          <svg style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }}
            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            placeholder="Cari produk..."
            defaultValue={search}
            onChange={e => updateParams(category, e.target.value)}
            style={{
              width: '100%', padding: '14px 16px 14px 46px',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 50, color: '#fff', fontSize: 14, outline: 'none',
              backdropFilter: 'blur(10px)',
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        {/* Category Filter */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32, alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: '#9e9e9e', marginRight: 4 }}>Filter:</span>
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => updateParams(c, search)}
              style={{
                padding: '8px 20px', borderRadius: 50, fontSize: 13, fontWeight: 500, cursor: 'pointer',
                border: category === c ? '1.5px solid #1c1c1e' : '1.5px solid #e8e2d9',
                background: category === c ? '#1c1c1e' : '#fff',
                color: category === c ? '#fff' : '#6b6b6b',
                transition: 'all 0.2s',
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Results count */}
        {!loading && (
          <p style={{ fontSize: 13, color: '#9e9e9e', marginBottom: 20 }}>
            {products.length} produk ditemukan
            {search && <span> untuk "<strong>{search}</strong>"</span>}
            {category !== 'Semua' && <span> di <strong>{category}</strong></span>}
          </p>
        )}

        {/* Grid */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{ background: '#f0ece4', borderRadius: 16, height: 320 }} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#9e9e9e' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <p style={{ fontSize: 16, fontWeight: 500 }}>Produk tidak ditemukan</p>
            <p style={{ fontSize: 13, marginTop: 8 }}>Coba kata kunci atau kategori lain</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return <Suspense><HomeContent /></Suspense>;
}
