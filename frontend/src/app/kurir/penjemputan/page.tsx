'use client';

import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPenjemputanList, updateStatusPengantaran } from '@/services/kurir.service';
import { Pengantaran, StatusPengantaran } from '@/types/kurir';
import DataTable from '@/components/tables/dataTable';
import StatusBadge from '@/components/common/statusBadge';
import SearchBar from '@/components/common/searchBar';
import DetailTugasModal from '@/components/kurir/detailTugasModal';
import { STATUS_PENGANTARAN_LABEL, STATUS_PENGANTARAN_COLOR } from '@/constants/pengantaranStatus';
import { KATEGORI_LAYANAN_LABEL, KATEGORI_LAYANAN_COLOR } from '@/constants/layananCategory';
import { formatTanggal } from '@/utils/format';

export default function PenjemputanPage() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Pengantaran | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['kurir', 'penjemputan'],
    queryFn: () => getPenjemputanList({ limit: 50 }),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: StatusPengantaran }) =>
      updateStatusPengantaran(id, status),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ['kurir', 'penjemputan'] });
      setSelected(updated);
    },
  });

  const filtered = useMemo(() => {
    if (!data) return [];
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter(
      (item) =>
        item.pemesanan.customer.user.nama.toLowerCase().includes(q) ||
        item.pemesanan.id_pemesanan.toLowerCase().includes(q),
    );
  }, [data, search]);

  return (
    <>
      <div className="mb-4 max-w-sm">
        <SearchBar value={search} onChange={setSearch} placeholder="Cari pesanan..." />
      </div>

      <DataTable<Pengantaran>
        loading={isLoading}
        data={filtered}
        rowKey={(row) => row.id_pengantaran}
        emptyText="Belum ada tugas penjemputan"
        columns={[
          {
            header: 'Tanggal',
            accessor: (row) => <span style={{ color: '#8A94A6' }}>{formatTanggal(row.tanggal_pengantaran)}</span>,
          },
          {
            header: 'ID Pesanan',
            accessor: (row) => (
              <span className="font-semibold" style={{ color: '#1A3A6B' }}>
                #{row.pemesanan.id_pemesanan.slice(0, 5)}
              </span>
            ),
          },
          {
            header: 'Customer',
            accessor: (row) => (
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: '#E8F0FE', color: '#1A6FD4' }}
                >
                  {row.pemesanan.customer.user.nama.slice(0, 2).toUpperCase()}
                </div>
                <span style={{ color: '#1A3A6B' }}>{row.pemesanan.customer.user.nama}</span>
              </div>
            ),
          },
          {
            header: 'Tipe Layanan',
            accessor: (row) => {
              const item = row.pemesanan.detail_pemesanan?.[0];
              if (!item) return '-';
              const label = KATEGORI_LAYANAN_LABEL[item.kategori_layanan] ?? item.kategori_layanan;
              const color = KATEGORI_LAYANAN_COLOR[item.kategori_layanan] ?? { bg: '#F3F5F9', text: '#4B5768' };
              return <StatusBadge label={label} bg={color.bg} text={color.text} />;
            },
          },
          {
            header: 'Jumlah Est.',
            accessor: (row) => row.pemesanan.detail_pemesanan?.[0]?.kuantitas ?? '-',
          },
          {
            header: 'Status Penjemputan',
            accessor: (row) => (
              <StatusBadge
                label={STATUS_PENGANTARAN_LABEL[row.status_pengantaran]}
                bg={STATUS_PENGANTARAN_COLOR[row.status_pengantaran].bg}
                text={STATUS_PENGANTARAN_COLOR[row.status_pengantaran].text}
              />
            ),
          },
          {
            header: 'Aksi',
            accessor: (row) => {
              const done = row.status_pengantaran === 'SELESAI' || row.status_pengantaran === 'DIBATALKAN';
              return (
                <button
                  onClick={() => setSelected(row)}
                  disabled={done}
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold"
                  style={{ backgroundColor: '#EAF2FF', color: '#1A6FD4', opacity: done ? 0.5 : 1 }}
                >
                  Update
                </button>
              );
            },
          },
        ]}
      />

      {selected && (
        <DetailTugasModal
          pengantaran={selected}
          onClose={() => setSelected(null)}
          onUpdateStatus={async (status) => {
            await statusMutation.mutateAsync({ id: selected.id_pengantaran, status });
          }}
          onMarkPaid={async () => {}}
        />
      )}
    </>
  );
}