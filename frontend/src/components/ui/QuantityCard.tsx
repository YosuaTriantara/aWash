'use client';

import { Minus, Plus } from 'lucide-react';

interface QuantityCardProps {
  unit: 'KG' | 'PCS' | 'PASANG';
  quantity: number;
  price: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function QuantityCard({
  unit,
  quantity,
  price,
  onIncrease,
  onDecrease,
}: QuantityCardProps) {

  const total = quantity * price;

  const title =
    unit === 'KG'
      ? 'Estimasi Berat Cucian'
      : unit === 'PCS'
      ? 'Jumlah Pakaian'
      : 'Jumlah Sepatu';

  const subtitle =
    unit === 'KG'
      ? 'Masukkan estimasi berat cucian Anda.'
      : unit === 'PCS'
      ? 'Masukkan jumlah pakaian yang akan dicuci.'
      : 'Masukkan jumlah sepatu yang akan dicuci.';

  return (
    <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-6">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-xl font-bold text-slate-800">
            {title}
          </h3>

          <p className="mt-1 text-slate-500">
            {subtitle}
          </p>

        </div>

        {/* Counter */}

        <div className="flex h-14 items-center overflow-hidden rounded-xl border border-gray-200 bg-white">

          <button
            type="button"
            onClick={onDecrease}
            className="
                flex h-full w-14 items-center justify-center
                bg-white
                text-blue-600
                transition-colors
                hover:bg-gray-50
            "
            >
                <Minus size={18} strokeWidth={2.5} />
            </button>

          <div className="flex items-baseline gap-1 px-6">

            <span className="text-2xl font-bold text-slate-900">
                {quantity}
            </span>

            <span className="text-lg font-medium text-slate-400">
                {unit}
            </span>

          </div>

          <button
            type="button"
            onClick={onIncrease}
            className="
                flex h-full w-14 items-center justify-center
                text-blue-600
                transition
                hover:bg-slate-50
            "
            >
            <Plus size={18} />
          </button>

        </div>

      </div>

      {/* Summary */}

      <div className="mt-6 rounded-2xl bg-white p-6">

        <div className="grid grid-cols-2">

          <div>

            <p className="text-slate-500">
              Harga per {unit}
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-800">
              Rp {price.toLocaleString('id-ID')}
            </h2>

          </div>

          <div className="border-l pl-10">

            <p className="text-slate-500">
              Estimasi Total
            </p>

            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              Rp {total.toLocaleString('id-ID')}
            </h2>

          </div>

        </div>

      </div>

    </div>
  );
}