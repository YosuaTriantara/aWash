'use client';

import { useEffect, useState } from "react";

import { getOrders } from "@/services/order.service";

import Table from "@/components/ui/table";
import TableHead from "@/components/ui/tableHead";
import TableRow from "@/components/ui/tableRow";
import TableCell from "@/components/ui/tableCell";
import StatusBadge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import ReviewModal from "./components/ReviewModal";

export default function RiwayatPage() {

    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const customerStatus: Record<string, string> = {
        DIBUAT: "Menunggu Konfirmasi",
        DIPROSES: "Diproses",
        SIAP: "Siap Diambil",
        SELESAI: "Selesai",
    };
    const [openReview, setOpenReview] = useState(false);


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <p className="p-6">
        Memuat data...
      </p>
    );
  }

  return (
    <div className="space-y-6">

        <Table
            title="Riwayat Pesanan"
            subtitle="Lihat seluruh riwayat pesanan laundry Anda."
            className="min-w-312.5"
        >

            <TableHead>

                <TableRow>
                    <TableCell header>ID</TableCell>
                    <TableCell header>Tanggal</TableCell>
                    <TableCell header>Outlet</TableCell>
                    <TableCell header>Layanan</TableCell>
                    <TableCell header>Estimasi</TableCell>
                    <TableCell header>Total</TableCell>
                    <TableCell header>Status</TableCell>
                    <TableCell header>Review</TableCell>
                </TableRow>

            </TableHead>

            <tbody>
                {orders.map((order) => (

                    <TableRow key={order.id_pemesanan}>

                        {/* ID */}
                        <TableCell className="whitespace-nowrap">
                            {order.id_pemesanan.slice(0, 8)}
                        </TableCell>

                        {/* Tanggal */}
                        <TableCell className="whitespace-nowrap">
                            {new Date(order.tanggal_pesan).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            })}
                        </TableCell>

                        {/* Outlet */}
                        <TableCell className="whitespace-nowrap">
                            {order.outlet.nama_outlet}
                        </TableCell>

                        {/* Layanan */}
                        <TableCell>
                            <div className="font-medium">
                            {order.detail_pemesanan
                                .map((item: any) => item.nama_layanan)
                                .join(", ")}
                            </div>

                            <div className="mt-1 text-xs text-slate-500">
                            {order.detail_pemesanan
                                .map((item: any) => `${item.kuantitas} ${item.satuan}`)
                                .join(", ")}
                            </div>
                        </TableCell>

                        {/* Estimasi */}
                        <TableCell className="whitespace-nowrap">
                            Rp {Number(order.grand_total).toLocaleString("id-ID")}
                        </TableCell>

                        {/* Total */}
                        <TableCell className="whitespace-nowrap">
                            {order.grand_total
                                ? `Rp ${Number(order.grand_total).toLocaleString("id-ID")}`
                                : "-"}
                        </TableCell>

                        {/* Status */}
                        <TableCell className="whitespace-nowrap">
                            <StatusBadge
                            status={
                                customerStatus[order.status_terkini] ??
                                order.status_terkini
                            }
                            />
                        </TableCell>

                        {/* Review */}
                        <TableCell className="whitespace-nowrap">
                            {order.status_terkini === "SELESAI" ? (
                            <Button
                                variant="outline"
                                className="px-3 py-2 text-xs"
                                onClick={() => setOpenReview(true)}
                            >
                                Berikan Review
                            </Button>
                            ) : (
                            "-"
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </tbody>
        </Table>
        <ReviewModal
            open={openReview}
            onClose={() => setOpenReview(false)}
        />
    </div>
  );
}