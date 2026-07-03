'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LayoutDashboard, PackageSearch, Truck, User } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import Sidebar, { SidebarMenuItem } from '@/components/layout/sidebar';
import Header from '@/components/layout/header';

const menu: SidebarMenuItem[] = [
  { name: 'Dashboard', path: '/kurir', icon: LayoutDashboard },
  { name: 'Penjemputan', path: '/kurir/penjemputan', icon: PackageSearch },
  { name: 'Pengantaran', path: '/kurir/pengantaran', icon: Truck },
  { name: 'Profil', path: '/kurir/profil', icon: User },
];

export default function KurirLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, hydrated } = useAuthStore();

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

  if (!hydrated) return <p className="p-8 text-sm text-gray-400">Loading...</p>;
  if (!user || user.role !== 'KURIR') return null;

  const title =
    pathname === '/kurir'
      ? 'Dashboard'
      : pathname.startsWith('/kurir/penjemputan')
      ? 'Penjemputan Pesanan'
      : pathname.startsWith('/kurir/pengantaran')
      ? 'Pengantaran Pesanan'
      : 'Profil';

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#F8FAFF' }}>
      <Sidebar menu={menu} />
      <div className="flex-1">
        <Header />
        <main className="px-8 pb-10">
          <h1 className="text-xl font-bold mb-5" style={{ color: '#1A3A6B' }}>
            {title}
          </h1>
          {children}
        </main>
      </div>
    </div>
  );
}