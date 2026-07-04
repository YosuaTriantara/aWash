'use client';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { updateOrderStatus } from '@/services/order';
import { NEXT_STATUS } from '@/constants/orderStatus';

import Card from '@/components/ui/card';
import Button from '@/components/ui/button';
import StatusBadge from '@/components/ui/badge';

import Table from '@/components/ui/table';
import TableHead from '@/components/ui/tableHead';
import TableRow from '@/components/ui/tableRow';
import TableCell from '@/components/ui/tableCell';
import { useOrders } from '@/hooks/admin/useOrder';


export default function ActiveOrderTable() {

    const queryClient = useQueryClient();
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const handleUpdateStatus = async (id: string, nextStatus: string) => {
    setLoadingId(id);
    try {
        await updateOrderStatus(id, nextStatus);
        await queryClient.invalidateQueries({ queryKey: ['orders'] });
    } catch (error) {
        console.error(error);
        alert('Gagal update status pesanan');
    } finally {
        setLoadingId(null);
    }
    };

    const { data } =
    useOrders('MENUNGGU,DIPROSES');

    const orders =
    data?.data ?? [];
  return (
    <Card className="overflow-hidden">

      <Table>

        <TableHead>
        <TableRow>
            <TableCell header>ID Pesanan</TableCell>
            <TableCell header>Tanggal</TableCell>
            <TableCell header>Customer</TableCell>
            <TableCell header>Layanan</TableCell>
            <TableCell header>Durasi</TableCell>
            <TableCell header>Satuan</TableCell>
            <TableCell header>Jumlah</TableCell>
            <TableCell header>Tenggat</TableCell>
            <TableCell header>Status</TableCell>
            <TableCell header>Aksi</TableCell>
        </TableRow>
        </TableHead>

        <tbody>

          {orders.map((order) => (

            <TableRow key={order.id_pemesanan}>
                <TableCell>{order.id_pemesanan}</TableCell>
                <TableCell>
                    {new Date(order.tanggal_pesan).toLocaleDateString('id-ID')}
                </TableCell>
                <TableCell>{order.customer.user.nama}</TableCell>
                <TableCell>
                    {order.detail_pemesanan[0]?.nama_layanan}
                </TableCell>
                <TableCell>
                    {order.detail_pemesanan[0]?.estimasi_durasi}
                </TableCell>
                <TableCell>
                    {order.detail_pemesanan[0]?.satuan_durasi}
                </TableCell>
                <TableCell>
                    {order.detail_pemesanan[0]?.kuantitas}
                </TableCell>
                <TableCell>
                    {order.estimasi_selesai
                        ? new Date(order.estimasi_selesai).toLocaleDateString('id-ID')
                        : '-'}
                </TableCell>

                <TableCell>
                    <StatusBadge status={order.status_terkini} />
                </TableCell>

                <TableCell>
                        {NEXT_STATUS[order.status_terkini] && (
                            <Button
                            onClick={() => handleUpdateStatus(
                                order.id_pemesanan,
                                NEXT_STATUS[order.status_terkini].next
                            )}
                            disabled={loadingId === order.id_pemesanan}
                            >
                            {loadingId === order.id_pemesanan
                                ? 'Memproses...'
                                : NEXT_STATUS[order.status_terkini].label}
                            </Button>
                        )}
                </TableCell>

            </TableRow>

          ))}

        </tbody>

      </Table>

    </Card>
  );
}