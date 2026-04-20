import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'TokoKu — Belanja Elegan',
  description: 'Mini Ecommerce MVP',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen" style={{ background: '#faf9f7' }}>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="pb-16">{children}</main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
