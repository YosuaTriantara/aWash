export const formatRupiah = (value: string | number) =>
  `Rp${Math.round(Number(value)).toLocaleString('id-ID')}`;

export const formatTanggal = (value: string | null | undefined) => {
  if (!value) return '-';
  return new Date(value).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

export const initials = (nama: string) =>
  nama
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();