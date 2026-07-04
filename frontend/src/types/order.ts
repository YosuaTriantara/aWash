export interface Customer {
  user: {
    nama: string;
    email?: string;
    no_telepon: string;
  };
}

export interface Layanan {
  id_layanan: string;
  nama_layanan: string;
  kategori: string;
  satuan: string;
  harga: number;
}

export interface DetailPemesanan {
  id_detail: string;
  id_pemesanan: string;
  id_layanan: string;

  nama_layanan: string;
  kategori_layanan: string;

  satuan: string;

  harga_satuan: string;

  estimasi_durasi: number;
  satuan_durasi: string;

  kuantitas: string;

  subtotal: string;

  created_at: string;
  updated_at: string;
}

export interface Kurir {
  user: {
    nama: string;
    no_telepon?: string;
  };
}

export interface Pengantaran {
  id_pengantaran: string;

  status_pengantaran: string;

  tanggal_pengantaran: string;

  ongkir: number;

  kurir?: Kurir;
}

export interface Transaksi {
  id_transaksi: string;

  status_pembayaran: string;

  nominal_pembayaran: number;

  tanggal_pembayaran: string;
}

export interface Order {
  id_pemesanan: string;

  tanggal_pesan: string;

  estimasi_selesai: string | null;

  status_terkini: string;

  metode_jemput: string;

  metode_antar: string;

  total_laundry: number;

  total_pengantaran: number;

  grand_total: number;

  customer: Customer;

  detail_pemesanan: DetailPemesanan[];

  pengantaran: Pengantaran[];

  transaksi?: Transaksi | null;
}

export interface Pagination {
  page: number;

  limit: number;

  total: number;

  totalPages: number;
}

export interface OrderResponse {
  data: Order[];

  pagination: Pagination;
}