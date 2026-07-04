'use client';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function OrderTabs({
  value,
  onChange,
}: Props) {

  const tabs = [
    {
      value: 'validation',
      label: 'Validasi Pesanan',
    },
    {
      value: 'active',
      label: 'Pesanan Aktif',
    },
    {
      value: 'pickup',
      label: 'Penjemputan & Pembayaran',
    },
  ];

  return (

    <div className="flex gap-2">

      {tabs.map((tab) => (

        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`px-5 py-2 rounded-xl font-medium transition ${
            value === tab.value
              ? 'bg-[#1565D8] text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {tab.label}
        </button>

      ))}

    </div>

  );
}