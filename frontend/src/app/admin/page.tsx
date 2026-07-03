'use client';

import Card from '@/components/ui/card';
import Table from '@/components/ui/table';
import TableHead from '@/components/ui/tableHead';
import TableRow from '@/components/ui/tableRow';
import TableCell from '@/components/ui/tableCell';
import StatusBadge from '@/components/ui/badge';

import {
  ClipboardList,
  Shirt,
  Truck,
  Wallet,
} from 'lucide-react';

const summary = [
  {
    title: 'Pesanan Baru',
    value: 12,
    icon: ClipboardList,
  },
  {
    title: 'Sedang Diproses',
    value: 8,
    icon: Shirt,
  },
  {
    title: 'Menunggu Pengantaran',
    value: 5,
    icon: Truck,
  },
  {
    title: 'Pendapatan Hari Ini',
    value: 'Rp850.000',
    icon: Wallet,
  },
];

const recentOrders = [
  {
    id: 'PSN001',
    customer: 'Alia',
    layanan: 'Cuci Express',
    status: 'MENUNGGU',
  },
  {
    id: 'PSN002',
    customer: 'Budi',
    layanan: 'Cuci Reguler',
    status: 'DIPROSES',
  },
  {
    id: 'PSN003',
    customer: 'Andi',
    layanan: 'Cuci Kilat',
    status: 'MENUNGGU',
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Ringkasan aktivitas operasional laundry hari ini.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {summary.map((item) => {

          const Icon = item.icon;

          return (
            <Card
              key={item.title}
              className="p-6"
            >
              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {item.value}
                  </h2>

                </div>

                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>

              </div>
            </Card>
          );
        })}

      </div>

      {/* Pesanan Terbaru */}

      <Card className="p-0">

        <div className="px-6 py-5 border-b">

          <h2 className="text-xl font-semibold">
            Pesanan Terbaru
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Daftar pesanan yang baru masuk.
          </p>

        </div>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell header>ID Pesanan</TableCell>

              <TableCell header>Pelanggan</TableCell>

              <TableCell header>Layanan</TableCell>

              <TableCell header>Status</TableCell>

            </TableRow>

          </TableHead>

          <tbody>

            {recentOrders.map((order) => (

              <TableRow key={order.id}>

                <TableCell>
                  {order.id}
                </TableCell>

                <TableCell>
                  {order.customer}
                </TableCell>

                <TableCell>
                  {order.layanan}
                </TableCell>

                <TableCell>
                  <StatusBadge status={order.status} />
                </TableCell>

              </TableRow>

            ))}

          </tbody>

        </Table>

      </Card>

    </div>
  );
}