'use client';

import clsx from 'clsx';
import { CheckCircle2 } from 'lucide-react';
import { ReactNode } from 'react';

interface DeliveryMethodCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  selected: boolean;
  onClick: () => void;
}

export default function DeliveryMethodCard({
  title,
  description,
  icon,
  selected,
  onClick,
}: DeliveryMethodCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "relative w-full rounded-2xl border p-5 text-left transition-all",
        selected
          ? "border-blue-600 bg-blue-50"
          : "border-gray-200 bg-white hover:border-blue-300"
      )}
    >
      {selected && (
        <CheckCircle2
          size={20}
          className="absolute right-4 top-4 text-blue-600"
        />
      )}

      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-slate-800">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </button>
  );
}