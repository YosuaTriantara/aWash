'use client';

interface SummaryCardProps {
  outlet: string;
  layanan: string;
  quantity: number;
  unit: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  metodeAntar: string;
  metodeJemput: string;
}

export default function SummaryCard({
  outlet,
  layanan,
  quantity,
  unit,
  subtotal,
  deliveryFee,
  total,
  metodeAntar,
  metodeJemput,
}: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">

      <h3 className="text-xl font-semibold text-slate-800">
        Ringkasan Pesanan
      </h3>

      {/* Detail Pesanan */}

      <div className="mt-6 space-y-5">

        <div className="flex justify-between items-start">
          <span className="text-slate-500">Outlet</span>
          <span className="max-w-sm text-right font-semibold text-slate-800">
            {outlet}
          </span>
        </div>

        <div className="flex justify-between items-start">
          <span className="text-slate-500">Layanan</span>
          <span className="max-w-sm text-right font-semibold text-slate-800">
            {layanan}
          </span>
        </div>

        <div className="flex justify-between items-start">
          <span className="text-slate-500">Jumlah</span>
          <span className="font-semibold text-slate-800">
            {quantity} {unit}
          </span>
        </div>

        <div className="flex justify-between items-start">
          <span className="text-slate-500">Pengiriman</span>
          <span className="font-semibold text-slate-800">
            {metodeAntar === "DIANTAR_KURIR"
              ? "Dijemput Kurir"
              : "Diantar Sendiri"}
          </span>
        </div>

        <div className="flex justify-between items-start">
          <span className="text-slate-500">Pengembalian</span>
          <span className="font-semibold text-slate-800">
            {metodeJemput === "DIJEMPUT_KURIR"
              ? "Diantar Kurir"
              : "Diambil Sendiri"}
          </span>
        </div>

      </div>

      {/* Divider */}

      <div className="my-8 border-t border-dashed" />

      {/* Estimasi */}

      <div className="space-y-4">

        <div className="flex justify-between">
          <span className="text-slate-500">
            Estimasi Biaya Layanan
          </span>

          <span className="font-semibold">
            Rp {subtotal.toLocaleString("id-ID")}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">
            Estimasi Biaya Kurir
          </span>

          <span className="font-semibold">
            Rp {deliveryFee.toLocaleString("id-ID")}
          </span>
        </div>

      </div>

      {/* Total */}

      <div className="mt-8 rounded-2xl bg-blue-50 border border-blue-100 p-5">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm text-slate-500">
              Estimasi Total
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Belum termasuk hasil validasi outlet.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-blue-600">
            Rp {total.toLocaleString("id-ID")}
          </h2>

        </div>

      </div>

      {/* Informasi */}

      <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">

        <p className="text-sm leading-6 text-slate-600">

          <span className="font-semibold text-blue-600">
            Informasi
          </span>

          {" "}

          Estimasi biaya dihitung berdasarkan berat atau jumlah yang Anda
          masukkan. Biaya akhir akan divalidasi oleh outlet setelah proses
          penimbangan atau pemeriksaan laundry.

        </p>

      </div>

    </div>
  );
}