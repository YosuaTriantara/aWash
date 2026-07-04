'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Sidebar from '@/components/layout/sidebar';
import Header from '@/components/layout/header';

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

  if (!hydrated) return null;
  if (!user || user.role !== 'CUSTOMER') return null;

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <Sidebar role="CUSTOMER" />

      <div className="ml-60 min-h-screen">
        <Header
          userName={user.nama}
          roleLabel="Customer"
        />

        <main className="px-8 pt-28 pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}