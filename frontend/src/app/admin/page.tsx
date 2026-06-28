'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminPage() {

  const router = useRouter();
  const { user, hydrated, logout } = useAuthStore();
  
useEffect(() => {
    if (!hydrated) return;

  if (!user) {
    router.replace('/login');
    return;
  }

  if (user.role !== 'ADMIN') {
    router.replace('/');
  }
}, [user, hydrated, router]);

if (!hydrated) return <p>Loading...</p>;

if (!user || user.role !== 'ADMIN') return null;



const menu = [
  {
    name:'Kurir',
    path:'/admin/kurir'
  },
  {
    name:'Layanan',
    path:'/admin/layanan'
  },
  {
    name:'Outlet',
    path:'/admin/outlet'
  },
  {
    name:'Pesanan',
    path:'/admin/pesanan'
  },
  {
    name:'Slot Operasional',
    path:'/admin/slot-operasional'
  },
  {
    name:'Transaksi',
    path:'/admin/transaksi'
  }
];

  return (
      <div className="min-h-screen bg-blue-50 p-8">

      <h1 className="text-3xl font-bold text-blue-900">
        Dashboard Admin
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">

        {menu.map(item => (

          <Link
            key={item.path}
            href={item.path}
            className="
              bg-white
              rounded-2xl
              p-6
              shadow
              hover:shadow-lg
              transition
            "
          >

            <h2 className="text-xl font-bold">
              {item.name}
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Kelola data {item.name}
            </p>


          </Link>

        ))}


      </div>


    </div>
  );
}
