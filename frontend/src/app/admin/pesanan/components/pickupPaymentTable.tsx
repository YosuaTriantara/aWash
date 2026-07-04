'use client';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { updateOrderStatus, updateTransaksiStatus } from '@/services/order';
import { NEXT_STATUS } from '@/constants/orderStatus';

import Card from '@/components/ui/card';
import Button from '@/components/ui/button';
import StatusBadge from '@/components/ui/badge';

import Table from '@/components/ui/table';
import TableHead from '@/components/ui/tableHead';
import TableRow from '@/components/ui/tableRow';
import TableCell from '@/components/ui/tableCell';
import { useOrders } from '@/hooks/admin/useOrder';



export default function PickupPaymentTable() {
    const queryClient = useQueryClient();
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const handleMarkPaid = async (idTransaksi: string) => {
    setLoadingId(idTransaksi);
    try {
        await updateTransaksiStatus(idTransaksi, 'PAID');
        await queryClient.invalidateQueries({ queryKey: ['orders'] });
    } catch (error) {
        console.error(error);
        alert('Gagal update status pembayaran');
    } finally {
        setLoadingId(null);
    }
    };

    const handleFinish = async (idPemesanan: string) => {
    setLoadingId(idPemesanan);
    try {
        await updateOrderStatus(idPemesanan, 'SELESAI');
        await queryClient.invalidateQueries({ queryKey: ['orders'] });
    } catch (error) {
        console.error(error);
        alert('Gagal menyelesaikan pesanan');
    } finally {
        setLoadingId(null);
    }
    };

    const { data } =
    useOrders('SIAP');

    const orders =
    data?.data ?? [];

  return (
    <Card className="overflow-hidden">

      <Table>

        <TableHead>

          <TableRow>

            <TableCell header>
              ID Pesanan
            </TableCell>

            <TableCell header>
              Tanggal
            </TableCell>

            <TableCell header>
              Customer
            </TableCell>

            <TableCell header>
              Harga
            </TableCell>

            <TableCell header>
              Metode Ambil
            </TableCell>

            <TableCell header>
              Pembayaran
            </TableCell>

            <TableCell header>
              Pengantaran
            </TableCell>

            <TableCell header>
              Aksi
            </TableCell>

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
                {order.grand_total}
              </TableCell>

              <TableCell>
                {order.metode_jemput}
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2">
                    <StatusBadge status={order.transaksi?.status_pembayaran ?? 'UNPAID'} />
                    {order.transaksi && order.transaksi.status_pembayaran !== 'PAID' && (
                    <Button
                        variant="secondary"
                        onClick={() => handleMarkPaid(order.transaksi!.id_transaksi)}
                        disabled={loadingId === order.transaksi.id_transaksi}
                    >
                        {loadingId === order.transaksi.id_transaksi ? '...' : 'Tandai Lunas'}
                    </Button>
                    )}
                </div>
              </TableCell>

                <TableCell>
                {order.pengantaran.length === 0 ? (
                    '-'
                ) : (
                    <StatusBadge
                    status={order.pengantaran[0].status_pengantaran}
                    />
                )}
              </TableCell>

              <TableCell>
                {(() => {
                    const isPaid = order.transaksi?.status_pembayaran === 'PAID';
                    const usesKurir = order.metode_jemput === 'DIJEMPUT_KURIR';
                    const deliveryDone =
                    !usesKurir || order.pengantaran[0]?.status_pengantaran === 'SELESAI';
                    const canFinish = isPaid && deliveryDone;

                    return (
                    <Button
                        onClick={() => handleFinish(order.id_pemesanan)}
                        disabled={!canFinish || loadingId === order.id_pemesanan}
                    >
                        {loadingId === order.id_pemesanan ? 'Memproses...' : 'Selesaikan'}
                    </Button>
                    );
                })()}
              </TableCell>

            </TableRow>

          ))}

        </tbody>

      </Table>

    </Card>
  );
}