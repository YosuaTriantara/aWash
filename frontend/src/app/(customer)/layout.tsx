'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, hydrated } = useAuthStore();

  useEffect(() => {
    if (!hydrated) return;

    if (!user) {
      router.replace('/login');
      return;
    }

    if (user.role !== 'CUSTOMER') {
      router.replace('/');
    }
  }, [user, hydrated, router]);

  if (!hydrated) return <p>Loading...</p>;
  if (!user || user.role !== 'CUSTOMER') return null;

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#F8FAFF',
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: '260px',
          borderRight: '1px solid #E5E7EB',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h1
          style={{
            fontSize: '30px',
            fontWeight: 'bold',
            color: '#1565D8',
            marginBottom: '8px',
          }}
        >
          aWash
        </h1>

        <p
          style={{
            color: '#6B7280',
            marginBottom: '40px',
          }}
        >
          Renewed Clarity
        </p>

        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/pesanan">New Order</Link>
          <Link href="/riwayat">Order History</Link>
          <Link href="/profil">My Profile</Link>
        </nav>

        <div
          style={{
            marginTop: 'auto',
          }}
        >
          Help
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1 }}>
        <header
            style={{
                height: '80px',
                borderBottom: '1px solid #E5E7EB',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 32px',
                background: '#FFFFFF',
            }}
            >
            <div>
                <h2
                style={{
                    margin: 0,
                    fontSize: '22px',
                    fontWeight: 'bold',
                }}
                >
                Good Morning 👋
                </h2>

                <p
                style={{
                    margin: '4px 0 0',
                    color: '#6B7280',
                }}
                >
                Welcome back, {user.nama}
                </p>
            </div>

            <div
                style={{
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                background: '#1565D8',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '18px',
                }}
            >
                {user.nama.charAt(0)}
            </div>
        </header>

        <div style={{ padding: '24px' }}>
          {children}
        </div>
      </main>
    </div>
  );
}