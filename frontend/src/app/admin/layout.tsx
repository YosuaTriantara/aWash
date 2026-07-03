'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { useEffect } from 'react';
import {
  WashingMachine,
  Users,
  Shirt,
  Building2,
  ClipboardList,
  Clock,
  CreditCard,
  LogOut,
  LayoutDashboard,
} from 'lucide-react';

const menu = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Pesanan Baru', path: '/admin/pesanan-baru', icon: ClipboardList },
  { name: 'Pengantaran', path: '/admin/pengantaran', icon: Shirt },
  { name: 'Kelola Pesanan', path: '/admin/kelola-pesanan', icon: Building2 },
  { name: 'Pembayaran', path: '/admin/pembayaran', icon: CreditCard },
  { name: 'Riwayat Pesanan', path: '/admin/riwayat-pesanan', icon: Clock },
  { name: 'Profil', path: '/admin/profil', icon: CreditCard },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, hydrated, logout } = useAuthStore();

  useEffect(() => {
    if (!hydrated) return;
    if (!user) { router.replace('/login'); return; }
    if (user.role !== 'ADMIN') { router.replace('/'); }
  }, [user, hydrated, router]);

  if (!hydrated) return <p>Loading...</p>;
  if (!user || user.role !== 'ADMIN') return null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFF' }}>

      {/* ── Sidebar ── */}
      <aside
        className="w-64 flex flex-col justify-between py-6 px-4 fixed h-full"
        style={{ backgroundColor: '#1A3A6B' }}
      >
        {/* Logo */}
        <div>
          <div className="flex items-center gap-2.5 px-2 mb-8">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: '#1A6FD4' }}
            >
              <WashingMachine className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-lg font-bold">aWash</span>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full ml-auto"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }}
            >
              Admin
            </span>
          </div>

          {/* Menu */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {menu.map((item) => {
              const isActive = pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                  style={{
                    backgroundColor: isActive ? '#1A6FD4' : 'transparent',
                    color: isActive ? '#ffffff' : 'rgba(255,255,255,0.6)',
                  }}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User + Logout */}
        <div
          className="px-3 py-3 rounded-xl"
          style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
        >
          <p className="text-white text-sm font-semibold">{user.nama}</p>
          <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {user.email}
          </p>
          <button
            onClick={() => { logout(); router.replace('/login'); }}
            className="flex items-center gap-2 text-sm transition-colors"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            <LogOut className="w-4 h-4" />
            Keluar
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="ml-64 flex-1 p-8">
        {children}
      </main>

    </div>
  );
}