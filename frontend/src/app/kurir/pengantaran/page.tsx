'use client';

import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getPengantaranSajaList,
  updateStatusPengantaran,
  markPembayaranPaid,
} from '@/services/kurir.service';
import { Pengantaran, StatusPengantaran } from '@/types/kurir';
import DataTable from '@/components/tables/dataTable';
import StatusBadge from '@/components/common/statusBadge';
import SearchBar from '@/components/common/searchBar';
import DetailTugasModal from '@/components/kurir/detailTugasModal';
import {
  STATUS_PENGANTARAN_LABEL,
  STATUS_PENGANTARAN_COLOR,
  STATUS_BAYAR_LABEL,
  STATUS_BAYAR_COLOR,
} from '@/constants/pengantaranStatus';
import { formatRupiah, formatTanggal } from '@/utils/format';

export default function PengantaranPage() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Pengantaran | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['kurir', 'pengantaran'],
    queryFn: () => getPengantaranSajaList({ limit: 50 }),
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['kurir', 'pengantaran'] });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: StatusPengantaran }) =>
      updateStatusPengantaran(id, status),
    onSuccess: (updated) => {
      invalidate();
      setSelected(updated);
    },
  });

  const paidMutation = useMutation({
    mutationFn: (id: string) => markPembayaranPaid(id),
    onSuccess: (updated) => {
      invalidate();
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
        emptyText="Belum ada tugas pengantaran"
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
          { header: 'Harga', accessor: (row) => formatRupiah(row.ongkir) },
          {
            header: 'Metode',
            accessor: (row) => (row.pemesanan.metode_antar === 'DIANTAR_KURIR' ? 'Kurir' : 'Ambil Sendiri'),
          },
          {
            header: 'Status Pengantaran',
            accessor: (row) => (
              <StatusBadge
                label={STATUS_PENGANTARAN_LABEL[row.status_pengantaran]}
                bg={STATUS_PENGANTARAN_COLOR[row.status_pengantaran].bg}
                text={STATUS_PENGANTARAN_COLOR[row.status_pengantaran].text}
              />
            ),
          },
          {
            header: 'Status Bayar',
            accessor: (row) => {
              const status = row.pemesanan.transaksi?.status_pembayaran ?? 'UNPAID';
              return (
                <StatusBadge
                  label={STATUS_BAYAR_LABEL[status]}
                  bg={STATUS_BAYAR_COLOR[status].bg}
                  text={STATUS_BAYAR_COLOR[status].text}
                />
              );
            },
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
          onMarkPaid={async () => {
            await paidMutation.mutateAsync(selected.id_pengantaran);
          }}
        />
      )}
    </>
  );
}