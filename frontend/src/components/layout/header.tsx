'use client';

import Avatar from '@/components/ui/avatar';
import SearchBar from '@/components/common/searchBar';

interface HeaderProps {
  userName: string;
  roleLabel: string;
  search?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
}

export default function Header({
  userName,
  roleLabel,
  search,
  onSearchChange,
  searchPlaceholder = 'Cari...',
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between">

      <div className="w-full max-w-md">
        {search !== undefined && onSearchChange && (
          <SearchBar
            value={search}
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
          />
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold text-gray-800">
            {userName}
          </p>

          <p className="text-sm text-gray-500">
            {roleLabel}
          </p>
        </div>

        <Avatar name={userName} />
      </div>

    </header>
  );
}