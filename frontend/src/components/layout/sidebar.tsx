'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LucideIcon, HelpCircle, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';

export type SidebarMenuItem = {
  name: string;
  path: string;
  icon: LucideIcon;
};

type SidebarProps = {
  menu: SidebarMenuItem[];
};

export default function Sidebar({ menu }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore();

  const isActive = (path: string) =>
    path === '/kurir' ? pathname === path : pathname.startsWith(path);

  return (
    <aside
      className="w-64 min-h-screen bg-white border-r flex flex-col justify-between"
      style={{ borderColor: '#EEF1F6' }}
    >
      <div>
        <div className="px-6 py-6">
          <h1 className="text-xl font-bold" style={{ color: '#1A6FD4' }}>
            Awash
          </h1>
          <p className="text-xs" style={{ color: '#8A94A6' }}>
            Renewed Clarity
          </p>
        </div>

        <nav className="px-3 mt-2 flex flex-col gap-1">
          {menu.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition"
                style={{
                  backgroundColor: active ? '#EAF2FF' : 'transparent',
                  color: active ? '#1A6FD4' : '#4B5768',
                }}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-3 pb-6 flex flex-col gap-1">
        <button
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium"
          style={{ color: '#4B5768' }}
        >
          <HelpCircle className="w-4 h-4" />
          Help
        </button>
        <button
          onClick={() => {
            logout();
            router.replace('/login');
          }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium"
          style={{ color: '#C0392B' }}
        >
          <LogOut className="w-4 h-4" />
          Keluar
        </button>
      </div>
    </aside>
  );
}