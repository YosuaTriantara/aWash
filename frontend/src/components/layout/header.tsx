'use client';

import { useState } from 'react';
import { Bell } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import SearchBar from '@/components/common/searchBar';
import { initials } from '@/utils/format';

export default function Header() {
  const { user } = useAuthStore();
  const [search, setSearch] = useState('');

  return (
    <header className="flex items-center justify-between px-8 py-5">
      {/* search di header ini masih lokal/dekoratif, filter asli ada di tiap halaman list */}
      <SearchBar value={search} onChange={setSearch} placeholder="Cari pesanan..." />

      <div className="flex items-center gap-5">
        <button className="relative" style={{ color: '#4B5768' }}>
          <Bell className="w-5 h-5" />
          <span
            className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
            style={{ backgroundColor: '#E74C3C' }}
          />
        </button>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold" style={{ color: '#1A3A6B' }}>
              {user?.nama ?? '-'}
            </p>
            <p className="text-xs" style={{ color: '#8A94A6' }}>
              {user?.status_kurir === 'AKTIF' ? 'Kurir Aktif' : 'Kurir'}
            </p>
          </div>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ backgroundColor: '#E8F0FE', color: '#1A6FD4' }}
          >
            {user?.nama ? initials(user.nama) : '?'}
          </div>
        </div>
      </div>
    </header>
  );
}