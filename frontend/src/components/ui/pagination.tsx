import clsx from 'clsx';

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {

  const normalized = status.toUpperCase();

  const styles = {
    MENUNGGU: 'bg-yellow-100 text-yellow-700',

    DIPROSES: 'bg-blue-100 text-blue-700',

    'MENUJU LOKASI': 'bg-purple-100 text-purple-700',

    'SAMPAI LOKASI': 'bg-cyan-100 text-cyan-700',

    PENDING: 'bg-orange-100 text-orange-700',

    PAID: 'bg-green-100 text-green-700',

    SELESAI: 'bg-green-100 text-green-700',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
        styles[normalized as keyof typeof styles] ??
          'bg-gray-100 text-gray-600'
      )}
    >
      {status}
    </span>
  );
}