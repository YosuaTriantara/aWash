'use client';

import Card from "@/components/ui/card";
import StatusBadge from "@/components/ui/badge";
import {
  Calendar,
  Package,
  Scale,
  Clock3,
  CircleDollarSign,
  Info,
} from "lucide-react";

interface ActiveOrderProps {
  orders: any[];
}

export default function ActiveOrder({
  orders,
}: ActiveOrderProps) {
  return (
    <Card className="p-6">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-slate-800">
            Pesanan Aktif
          </h2>

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
            3
          </div>
        </div>

        <button className="text-sm font-medium text-blue-600 hover:underline">
          Lihat Semua
        </button>
      </div>

      {/* Order */}
      <div className="rounded-2xl border border-blue-100 p-5">
        {/* ID */}
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50">
            <Package className="h-7 w-7 text-blue-600" />
          </div>

          <div>
            <p className="text-sm text-gray-400">
              ID Pesanan
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-blue-600">
              #12345
            </h1>
          </div>
        </div>

        <div className="my-5 h-px bg-gray-200" />

        {/* Detail */}
        <div className="grid grid-cols-3 gap-6">
          <div className="flex gap-3">
            <Package className="mt-1 h-5 w-5 text-gray-400" />

            <div>
              <p className="text-xs text-gray-400">
                Jenis Layanan
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                Cuci Kering
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Scale className="mt-1 h-5 w-5 text-gray-400" />

            <div>
              <p className="text-xs text-gray-400">
                Berat
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                5 Kg
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Calendar className="mt-1 h-5 w-5 text-gray-400" />

            <div>
              <p className="text-xs text-gray-400">
                Tanggal Order
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                12 Mei 2024
              </p>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="mt-6">
          <h3 className="mb-3 font-semibold text-slate-800">
            Status Pesanan
          </h3>

          <div className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-4">
            <Info className="h-5 w-5 text-blue-600" />

            <StatusBadge status="DIPROSES" />
          </div>
        </div>

        <div className="my-5 h-px bg-gray-200" />

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <Clock3 className="mt-1 h-5 w-5 text-gray-400" />

            <div>
              <p className="text-xs text-gray-400">
                Estimasi Selesai
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                Hari Ini, 16:30 WIB
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <CircleDollarSign className="mt-1 h-5 w-5 text-gray-400" />

            <div className="text-right">
              <p className="text-xs text-gray-400">
                Total Tagihan
              </p>

              <p className="mt-1 text-3xl font-bold text-blue-600">
                Rp85.000
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}