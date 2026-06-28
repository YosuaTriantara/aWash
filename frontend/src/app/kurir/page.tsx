'use client';

import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function KurirPage() {
  const router = useRouter();
  const { user, hydrated, logout } = useAuthStore();

  useEffect(() => {
    if (!hydrated) return;

    if (!user) {
      router.replace('/login');
      return;
    }

    if (user.role !== 'KURIR') {
      router.replace('/');
    }
  }, [user, hydrated, router]);

  if (!hydrated) return <p>Loading...</p>;
  if (!user || user.role !== 'KURIR') return null;

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <h1 className="text-3xl font-bold text-blue-900">
        Dashboard Kurir
      </h1>
      <p className="mt-2 text-gray-600">
        Halo, {user.nama}
      </p>
        <button
            onClick={() => {
                logout();
                router.replace('/login');
            }}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600 transition"
            >
            Keluar
        </button>
    </div>
  );
}