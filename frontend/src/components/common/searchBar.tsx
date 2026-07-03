'use client';

import { Search } from 'lucide-react';

type SearchBarProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
};

export default function SearchBar({ value, onChange, placeholder = 'Cari pesanan...' }: SearchBarProps) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2.5 rounded-full flex-1 max-w-md"
      style={{ backgroundColor: '#F3F5F9' }}
    >
      <Search className="w-4 h-4" style={{ color: '#8A94A6' }} />
      <input
        value={value ?? ''}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="bg-transparent outline-none text-sm flex-1"
        style={{ color: '#1A3A6B' }}
      />
    </div>
  );
}