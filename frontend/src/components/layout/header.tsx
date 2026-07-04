'use client';

import { useEffect, useState } from 'react';

import Avatar from '@/components/ui/avatar';
import SearchBar from '@/components/common/searchBar';

interface HeaderProps {
  userName: string;
  roleLabel?: string;
  search?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
}

export default function Header({
  userName,
  search,
  onSearchChange,
  searchPlaceholder = 'Cari...',
}: HeaderProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Selalu tampil di bagian atas
      if (currentScrollY < 80) {
        setVisible(true);
      }
      // Scroll ke bawah -> sembunyikan
      else if (currentScrollY > lastScrollY) {
        setVisible(false);
      }
      // Scroll ke atas -> tampilkan
      else {
        setVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed
        top-0
        right-0
        left-60
        z-30
        flex
        h-20
        items-center
        justify-between
        border-b
        border-gray-200
        bg-white
        px-8
        transition-transform
        duration-300
        ${
          visible
            ? 'translate-y-0'
            : '-translate-y-full'
        }
      `}
    >
      {/* Left */}
      <div className="w-full">
        {search !== undefined && onSearchChange && (
          <div className="max-w-md">
            <SearchBar
              value={search}
              onChange={onSearchChange}
              placeholder={searchPlaceholder}
            />
          </div>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <p className="font-semibold text-slate-800">
          {userName}
        </p>

        <Avatar name={userName} />
      </div>
    </header>
  );
}