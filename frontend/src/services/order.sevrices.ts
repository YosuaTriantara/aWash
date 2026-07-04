import api from '../lib/axios';
import { ENDPOINTS } from '../lib/endpoints';

export const OrderService = {

  getOrders(params?: Record<string, unknown>) {
    return api.get(ENDPOINTS.admin.orders, {
      params,
    });
  },

  getOrderById(id: string) {
    return api.get(`${ENDPOINTS.admin.orders}/${id}`);
  },

  verifyOrder(id: string, payload: unknown) {
    return api.patch(
      `${ENDPOINTS.admin.orders}/${id}/verifikasi`,
      payload
    );
  },

  updateStatus(id: string, status: string) {
    return api.patch(
      `${ENDPOINTS.admin.orders}/${id}/status`,
      { status }
    );
  },

};