'use client';
import { useRouter } from 'next/navigation';
import Table from '@/components/ui/table';
import TableHead from '@/components/ui/tableHead';
import TableRow from '@/components/ui/tableRow';
import TableCell from '@/components/ui/tableCell';
import Card from '@/components/ui/card';
import Button from '@/components/ui/button';
import StatusBadge from '@/components/ui/badge';

import { useOrders } from '@/hooks/admin/useOrder';
import { Order } from '@/types/order';


export default function ValidationOrderTable() {
    const router = useRouter();
    const { data, isLoading } =
    useOrders('DIBUAT');

    const orders = data?.data ?? [];

  return (
    <Card className="overflow-hidden">

      <Table>

        <TableHead>
          <TableRow>
            <TableCell header>ID Pesanan</TableCell>
            <TableCell header>Tanggal</TableCell>
            <TableCell header>Customer</TableCell>
            <TableCell header>Layanan</TableCell>
            <TableCell header>Jumlah</TableCell>
            <TableCell header>Status</TableCell>
            <TableCell header>Aksi</TableCell>
          </TableRow>
        </TableHead>

        <tbody>

          {orders.map((order) => (

            <TableRow key={order.id_pemesanan}>

            <TableCell>
                {order.id_pemesanan}
            </TableCell>

            <TableCell>
                {new Date(order.tanggal_pesan).toLocaleDateString('id-ID')}
            </TableCell>

            <TableCell>
                {order.customer.user.nama}
            </TableCell>

            <TableCell>
                {order.detail_pemesanan[0]?.nama_layanan}
            </TableCell>

            <TableCell>
                {order.detail_pemesanan[0]?.kuantitas}
            </TableCell>

            <TableCell>
                <StatusBadge status={order.status_terkini} />
            </TableCell>

              <TableCell>
                <Button  onClick={() => router.push(`/admin/pesanan/${order.id_pemesanan}`)}>
                  Validasi
                </Button>
              </TableCell>

            </TableRow>

          ))}

        </tbody>

      </Table>

    </Card>
  );
}