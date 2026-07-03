'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';


export default function AdminPage() {
  const { user } = useAuthStore();
  const summary = {
  totalPesanan: 12,
  diproses: 5,
  penjemputan: 3,
  pendapatan: 850000,
};

const pesanan = [
  {
    id: 1,
    customer: 'Alia',
    layanan: 'Cuci Express',
    status: 'MENUNGGU',
  },
  {
    id: 2,
    customer: 'Budi',
    layanan: 'Cuci Reguler',
    status: 'DIPROSES',
  },
];
}