'use client';

import { useState } from 'react';
import { useKurirAktifList, useAssignKurir } from '@/hooks/admin/usePengantaran';

interface AssignKurirFormProps {
  id_pengantaran: string;
}

export default function AssignKurirForm({ id_pengantaran }: AssignKurirFormProps) {
  const [selectedKurir, setSelectedKurir] = useState('');
  const { data: kurirData, isLoading: isLoadingKurir, isError: isErrorKurir } = useKurirAktifList();
  const { mutate: assign, isPending, isError, error } = useAssignKurir(id_pengantaran);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedKurir) return;
    assign(selectedKurir);
  };

  if (isLoadingKurir) {
    return <p className="text-sm text-gray-500">Memuat daftar kurir...</p>;
  }

  if (isErrorKurir) {
    return <p className="text-sm text-red-500">Gagal memuat daftar kurir. Coba refresh halaman.</p>;
  }

  const kurirList = kurirData?.data ?? [];

  if (kurirList.length === 0) {
    return <p className="text-sm text-gray-500">Tidak ada kurir aktif saat ini.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <select
        value={selectedKurir}
        onChange={(e) => setSelectedKurir(e.target.value)}
        className="border rounded-md px-3 py-2 text-sm"
        disabled={isPending}
      >
        <option value="">-- Pilih kurir --</option>
        {kurirList.map((kurir) => (
          <option key={kurir.id_kurir} value={kurir.id_kurir}>
            {kurir.user.nama}
          </option>
        ))}
      </select>

      {isError && (
        <p className="text-sm text-red-500">
          {(error as any)?.response?.data?.message ?? 'Gagal menugaskan kurir. Coba lagi.'}
        </p>
      )}

      <button
        type="submit"
        disabled={!selectedKurir || isPending}
        className="bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Menugaskan...' : 'Tugaskan Kurir'}
      </button>
    </form>
  );
}