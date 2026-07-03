'use client';

import SearchBar from '@/components/common/searchBar';
import { useAuthStore } from '@/store/auth.store';
import { ROLE_LABEL } from '@/constants/roles';
import Avatar from '@/components/ui/avatar';

export default function Header() {
  const { user } = useAuthStore();

  return (
    <header className="sticky top-0 z-30 h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between">

      {/* Search */}

      <div className="w-full max-w-md">
        <SearchBar placeholder="Cari pesanan, pelanggan..." />
      </div>

      {/* User */}

      <div className="flex items-center gap-3">

        <div className="text-right">

          <p className="text-sm font-semibold text-gray-900">
            {user?.nama}
          </p>

          <p className="text-xs text-gray-500">
            {ROLE_LABEL[user?.role as keyof typeof ROLE_LABEL]}
          </p>

        </div>

        <Avatar
          name={user?.nama}
          size="md"
        />

      </div>

    </header>
  );
}