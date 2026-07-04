export interface KurirUser {
  nama: string;
  email: string;
  no_telepon: string;
  is_active: boolean;
}
 
export interface Kurir {
  id_kurir: string;
  id_outlet: string;
  status_kurir: 'AKTIF' | 'TIDAK_AKTIF';
  user: KurirUser;
}
 
export interface KurirListResponse {
  data: Kurir[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
 