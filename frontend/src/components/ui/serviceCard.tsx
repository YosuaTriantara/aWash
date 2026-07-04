'use client';

import clsx from 'clsx';
import {
  CheckCircle2,
  Clock3,
  Shirt,
  WashingMachine,
  Footprints,
} from 'lucide-react';

interface ServiceCardProps {
  title: string;
  category: string;
  duration: string;
  price: string;
  selected: boolean;
  onClick: () => void;
}

export default function ServiceCard({
  title,
  category,
  duration,
  price,
  selected,
  onClick,
}: ServiceCardProps) {

  const Icon =
    category === 'CUCI_KILOAN'
      ? WashingMachine
      : category === 'DRY_CLEAN'
      ? Shirt
      : Footprints;

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'relative rounded-2xl border bg-white p-5 text-left transition-all',
        selected
          ? 'border-blue-600 bg-blue-50 shadow-sm'
          : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
      )}
    >
      {selected && (
        <CheckCircle2
          size={20}
          className="absolute right-4 top-4 text-blue-600"
        />
      )}

      {/* Icon */}
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
        <Icon
          size={28}
          className="text-blue-600"
        />
      </div>

      {/* Nama */}
      <h3 className="text-lg font-bold text-slate-800">
        {title}
      </h3>

      {/* Estimasi */}
      <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
        <Clock3 size={15} />

        <span>{duration}</span>
      </div>

      {/* Harga */}
      <p className="mt-5 text-xl font-bold text-blue-600">
        {price}
      </p>

    </button>
  );
}