'use client';

import { useState } from 'react';

import Card from '@/components/ui/card';
import Button from '@/components/ui/button';
import Pagination from '@/components/ui/pagination';
import StatusBadge from '@/components/ui/badge';

import Table from '@/components/ui/table';
import TableHead from '@/components/ui/tableHead';
import TableRow from '@/components/ui/tableRow';
import TableCell from '@/components/ui/tableCell';

import SearchBar from '@/components/common/searchBar';

const deliveries = [
  {
    id: 'PSN001',
    customer: 'Alia',
    courier: 'Agung',
    status: 'MENUNGGU',
    createdAt: '08:30',
  },
  {
    id: 'PSN002',
    customer: 'Budi',
    courier: 'Agung',
    status: 'MENUJU LOKASI',
    createdAt: '08:45',
  },
  {
    id: 'PSN003',
    customer: 'Cici',
    courier: 'Agung',
    status: 'SAMPAI LOKASI',
    createdAt: '09:05',
  },
];

export default function PengantaranPage() {
  const [search, setSearch] = useState('');

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

              <TableRow key={item.id}>

                <TableCell>{item.id}</TableCell>

                <TableCell>{item.customer}</TableCell>

                <TableCell>{item.courier}</TableCell>

                <TableCell>
                  <StatusBadge status={item.status} />
                </TableCell>

                <TableCell>{item.createdAt}</TableCell>

                <TableCell>
                  <Button variant="secondary">
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