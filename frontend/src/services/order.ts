import api from '../lib/axios';
import { Order, OrderResponse } from '@/types/order';
import { ApiResponse } from '@/types/api';

export const getOrders = async (params?: {
  status?: string;
  page?: number;
  limit?: number;
}) => {
    const response = await api.get<ApiResponse<OrderResponse>>(
    '/admin/pemesanan',
    {
        params,
    }
    );

  return response.data.data;
};

export const getOrderDetail = async (id: string) => {
  const response = await api.get<ApiResponse<Order>>(
    `/admin/pemesanan/${id}`
  );

  return response.data;
};

export interface VerifyOrderItem {
  id_detail: string;
  kuantitas: number;
}

export const verifyOrder = async (
  id: string,
  items: VerifyOrderItem[]
) => {
  const response = await api.patch(
    `/admin/pemesanan/${id}/verifikasi`,
    { items }
  );

  return response.data;
};

export const updateOrderStatus = async (
  id: string,
  status: string
) => {
const response = await api.patch<ApiResponse<Order>>(
  `/admin/pemesanan/${id}/status`,
  {
    status,
  }
);

return response.data.data;
};

export const updateTransaksiStatus = async (
  idTransaksi: string,
  status: string
) => {
  const response = await api.patch(
    `/admin/transaksi/${idTransaksi}/status`,
    { status }
  );

  return response.data;
};