'use client';

import { useParams } from 'next/navigation';

import Card from '@/components/ui/card';
import StatusBadge from '@/components/ui/badge';

import { usePengantaranDetail } from '@/hooks/admin/usePengantaran';
import AssignKurirForm from '../components/assignKurirForm';

export default function PengantaranDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: pengantaran, isLoading } = usePengantaranDetail(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!pengantaran) {
    return <Card className="p-6">Data pengantaran tidak ditemukan.</Card>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Detail Pengantaran</h1>
        <p className="text-gray-500 mt-1">
          Pesanan {pengantaran.pemesanan.id_pemesanan}
        </p>
      </div>

      <Card className="p-6 space-y-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Customer</label>
          <p className="font-medium">
            {pengantaran.pemesanan.customer.user.nama} —{' '}
            {pengantaran.pemesanan.customer.user.no_telepon}
          </p>
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Layanan</label>
          {pengantaran.pemesanan.detail_pemesanan.map((d, i) => (
            <p key={i} className="font-medium">
              {d.nama_layanan} — {d.kuantitas} {d.satuan}
            </p>
          ))}
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Status Pengantaran
          </label>
          <StatusBadge status={pengantaran.status_pengantaran} />
        </div>

        <div>
        <label className="block text-sm text-gray-500 mb-1">Kurir</label>
        {pengantaran.kurir ? (
            <p className="font-medium">
            {pengantaran.kurir.user.nama} — {pengantaran.kurir.user.no_telepon}
            </p>
        ) : pengantaran.status_pengantaran === 'MENUNGGU' ? (
            <div className="mt-2">
            <AssignKurirForm id_pengantaran={pengantaran.id_pengantaran} />
            </div>
        ) : (
            <p className="font-medium text-gray-400">Belum ditugaskan</p>
        )}
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Jadwal Pengantaran
          </label>
          <p className="font-medium">
            {new Date(pengantaran.tanggal_pengantaran).toLocaleString('id-ID')}
          </p>
        </div>

        {pengantaran.catatan && (
          <div>
            <label className="block text-sm text-gray-500 mb-1">Catatan</label>
            <p className="font-medium">{pengantaran.catatan}</p>
          </div>
        )}
      </Card>
    </div>
  );
}