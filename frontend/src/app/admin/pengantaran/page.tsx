'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePengantaranList } from '@/hooks/admin/usePengantaran';

import Card from '@/components/ui/card';
import Button from '@/components/ui/button';
import Pagination from '@/components/ui/pagination';
import StatusBadge from '@/components/ui/badge';

import Table from '@/components/ui/table';
import TableHead from '@/components/ui/tableHead';
import TableRow from '@/components/ui/tableRow';
import TableCell from '@/components/ui/tableCell';

import SearchBar from '@/components/common/searchBar';

export default function PengantaranPage() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const { data, isLoading } = usePengantaranList();
  const deliveries = data?.data ?? [];

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Pengantaran
        </h1>

        <p className="text-gray-500 mt-1">
          Pantau proses penjemputan laundry oleh kurir.
        </p>
      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Cari pesanan..."
      />

      <Card className="overflow-hidden">

        <Table>

          <TableHead>
            <TableRow>
              <TableCell header>ID Pesanan</TableCell>
              <TableCell header>Customer</TableCell>
              <TableCell header>Kurir</TableCell>
              <TableCell header>Status</TableCell>
              <TableCell header>Dibuat</TableCell>
              <TableCell header>Aksi</TableCell>
            </TableRow>
          </TableHead>

            <tbody>
            {deliveries.map((item) => (
                <TableRow key={item.id_pengantaran}>
                <TableCell>{item.id_pemesanan}</TableCell>
                <TableCell>{item.pemesanan.customer.user.nama}</TableCell>
                <TableCell>{item.kurir?.user.nama ?? '-'}</TableCell>
                <TableCell>
                    <StatusBadge status={item.status_pengantaran} />
                </TableCell>
                <TableCell>
                    {new Date(item.created_at).toLocaleString('id-ID')}
                </TableCell>
                <TableCell>
                    <Button
                    variant="secondary"
                    onClick={() => router.push(`/admin/pengantaran/${item.id_pengantaran}`)}
                    >
                    Detail
                    </Button>
                </TableCell>
                </TableRow>
            ))}
            </tbody>

        </Table>

      </Card>

      <Pagination
        currentPage={1}
        totalPages={1}
        onPageChange={() => {}}
      />

    </div>
  );
}