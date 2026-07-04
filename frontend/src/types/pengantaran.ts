export interface PengantaranCustomer {
  user: {
    nama: string;
    no_telepon: string;
  };
}

export interface PengantaranPemesanan {
  id_pemesanan: string;
  customer: PengantaranCustomer;
}

export interface PengantaranKurir {
  id_kurir: string;
  user: {
    nama: string;
  };
}

export interface Pengantaran {
  id_pengantaran: string;
  id_pemesanan: string;
  status_pengantaran: string;
  tanggal_pengantaran: string;
  ongkir: number;
  created_at: string;
  pemesanan: PengantaranPemesanan;
  kurir: PengantaranKurir | null;
}

export interface PengantaranResponse {
  data: Pengantaran[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PengantaranDetailSlot {
  id_slot: string;
  jam_mulai: string;
  jam_selesai: string;
}

export interface PengantaranDetailKurir {
  id_kurir: string;
  user: {
    nama: string;
    no_telepon: string;
  };
}

export interface PengantaranDetailPemesanan {
  id_pemesanan: string;
  status_terkini: string;
  metode_antar: string;
  metode_jemput: string;
  customer: PengantaranCustomer;
  detail_pemesanan: {
    nama_layanan: string;
    kuantitas: string;
    satuan: string;
  }[];
}

export interface PengantaranDetail {
  id_pengantaran: string;
  status_pengantaran: string;
  tanggal_pengantaran: string;
  ongkir: number;
  waktu_mulai: string | null;
  waktu_selesai: string | null;
  catatan: string | null;
  pemesanan: PengantaranDetailPemesanan;
  slot: PengantaranDetailSlot;
  kurir: PengantaranDetailKurir | null;
}