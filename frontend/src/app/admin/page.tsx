'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';


export default function AdminPage() {
  const { user } = useAuthStore();
  
const menu = [
  {
    name:'Pesanan Baru',
    path:'/admin/pesanan-baru'
  },
  {
    name:'Pengantaran',
    path:'/admin/pengantaran'
  },
  {
    name:'Kelola Pesanan',
    path:'/admin/kelola-pesanan'
  },
  {
    name:'Pembayaran',
    path:'/admin/pembayaran'
  },
  {
    name:'Riwayat Pesanan',
    path:'/admin/riwayat-pesanan'
  },
  {
    name:'Profil',
    path:'/admin/profil'
  }
];

  return (
      <div className="min-h-screen bg-blue-50 p-8">

      <h1 className="text-3xl font-bold text-blue-900">
        Dashboard Admin
      </h1>

      <p className="mt-2 text-gray-600">
        Halo, {user?.nama}
      </p>

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
