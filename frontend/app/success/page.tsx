'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';

function SuccessContent() {
  const params = useSearchParams();
  const router = useRouter();
  const orderId = params.get('orderId');
  const name = params.get('name');
  const total = params.get('total');

  if (!orderId) { router.push('/'); return null; }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: 24 }}>
      <div style={{ background: '#fff', borderRadius: 24, padding: '48px 40px', maxWidth: 480, width: '100%', textAlign: 'center', border: '1px solid #f0ece4', boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}>
        {/* Success icon */}
        <div style={{
          width: 72, height: 72, background: 'linear-gradient(135deg, #4caf50, #66bb6a)',
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px', fontSize: 32,
        }}>
          ✓
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: '#1c1c1e', marginBottom: 8 }}>
          Pesanan Berhasil!
        </h1>
        <p style={{ color: '#9e9e9e', fontSize: 14, marginBottom: 28 }}>
          Terima kasih, <strong style={{ color: '#1c1c1e' }}>{name}</strong>! Pesananmu sedang kami proses.
        </p>

        {/* Order info */}
        <div style={{ background: '#faf9f7', borderRadius: 14, padding: '20px 24px', marginBottom: 28, textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14 }}>
            <span style={{ color: '#9e9e9e' }}>Nomor Pesanan</span>
            <span style={{ fontWeight: 700, color: '#1c1c1e' }}>#{orderId}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
            <span style={{ color: '#9e9e9e' }}>Total Pembayaran</span>
            <span style={{ fontWeight: 700, color: '#1c1c1e' }}>Rp {Number(total).toLocaleString('id-ID')}</span>
          </div>
        </div>

        {/* Status badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fff3e0', color: '#e65100', padding: '6px 16px', borderRadius: 50, fontSize: 12, fontWeight: 600, marginBottom: 28 }}>
          <span style={{ width: 6, height: 6, background: '#ff9800', borderRadius: '50%', display: 'inline-block' }} />
          Status: Menunggu Konfirmasi
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{
            padding: '12px 28px', background: '#1c1c1e', color: '#fff',
            borderRadius: 50, textDecoration: 'none', fontWeight: 600, fontSize: 14,
          }}>
            Belanja Lagi
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Success() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
