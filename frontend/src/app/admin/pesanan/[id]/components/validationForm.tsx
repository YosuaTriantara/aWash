'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

import Card from '@/components/ui/card';
import Button from '@/components/ui/button';

import { verifyOrder } from '@/services/order';
import { Order } from '@/types/order';
import { isAxiosError } from 'axios';

interface ValidationFormProps {
  order?: Order;
}

export default function ValidationForm({
  order,
}: ValidationFormProps) {

  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const orderId = params.id as string;

  const detail = order?.detail_pemesanan[0];
  const [kuantitas, setKuantitas] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const hargaSatuan = Number(detail?.harga_satuan ?? 0);

  const kuantitasNumber = Number(kuantitas);
  const isKuantitasValid = kuantitas.trim() !== '' && kuantitasNumber > 0;

  const totalBaru = (isKuantitasValid ? kuantitasNumber : 0) * hargaSatuan;

  const handleSubmit = async () => {
    if (!detail) return;

    if (!isKuantitasValid) {
      setErrorMsg('Berat aktual harus diisi dan lebih dari 0');
      return;
    }

    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      await verifyOrder(orderId, [
        {
          id_detail: detail.id_detail,
          kuantitas: kuantitasNumber,
        },
      ]);

      await queryClient.invalidateQueries({ queryKey: ['order', orderId] });
      await queryClient.invalidateQueries({ queryKey: ['orders'] });

      router.push('/admin/pesanan');
      router.refresh();
    } catch (error) {
      console.error(error);
      const backendMessage = isAxiosError(error)
        ? (error.response?.data as { message?: string } | undefined)?.message
        : undefined;
      setErrorMsg(backendMessage ?? 'Gagal memverifikasi pesanan. Coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!detail) {
    return (
      <Card className="p-6">
        Tidak ada detail pesanan.
      </Card>
    );
  }

  return (
    <Card className="p-6">

      <h2 className="text-lg font-semibold mb-6">
        Validasi Berat & Harga
      </h2>

      <div className="space-y-5">

        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Layanan
          </label>

          <p className="font-medium">
            {detail.nama_layanan}
          </p>
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Harga per {detail.satuan}
          </label>

          <p className="font-medium">
            Rp {hargaSatuan.toLocaleString('id-ID')}
          </p>
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Berat Estimasi
          </label>

          <p className="font-medium">
            {detail.kuantitas} {detail.satuan}
          </p>
        </div>

        <div>
          <label className="block text-sm mb-2">
            Berat Aktual
          </label>

            <input
            type="number"
            value={kuantitas}
            onChange={(e) => setKuantitas(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-2"
            />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Total Baru
          </label>

          <p className="font-semibold text-lg">
            Rp {totalBaru.toLocaleString('id-ID')}
          </p>
        </div>

      </div>

      {errorMsg && (
        <p className="mt-4 text-sm text-red-500">
          {errorMsg}
        </p>
      )}

      <div className="mt-8 flex justify-end">

        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Menyimpan...' : 'Simpan Validasi'}
        </Button>

      </div>

    </Card>
  );
}