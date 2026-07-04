export const NEXT_STATUS: Record<string, { next: string; label: string }> = {
  MENUNGGU: { next: 'DIPROSES', label: 'Mulai Proses' },
  DIPROSES: { next: 'SIAP', label: 'Tandai Siap' },
  SIAP: { next: 'SELESAI', label: 'Selesaikan' },
};