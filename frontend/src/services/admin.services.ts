import api from '../lib/axios';
import { ApiResponse } from '@/types/api';
import { PengantaranResponse, PengantaranDetail } from '@/types/pengantaran';
import { KurirListResponse } from '@/types/kurir';

export const getPengantaranList = async (params?: {
  status?: string;
  page?: number;
  limit?: number;
}) => {
  const response = await api.get<ApiResponse<PengantaranResponse>>(
    '/admin/pengantaran',
    { params }
  );

  return response.data.data;
};

export const getPengantaranDetail = async (id: string) => {
  const response = await api.get<ApiResponse<PengantaranDetail>>(
    `/admin/pengantaran/${id}`
  );

  return response.data.data;
};

export const getKurirList = async (params?: {
  status?: 'AKTIF' | 'TIDAK_AKTIF';
  page?: number;
  limit?: number;
}) => {
  const response = await api.get<ApiResponse<KurirListResponse>>(
    '/admin/kurir',
    { params }
  );

  return response.data.data;
};

export const assignKurir = async (id_pengantaran: string, id_kurir: string) => {
  const response = await api.patch<ApiResponse<null>>(
    `/admin/pengantaran/${id_pengantaran}/assign`,
    { id_kurir }
  );

  return response.data.data;
};