import api from '@/lib/axios';

export const getProfile = async () => {
  const response = await api.get('/customer/profile');
  return response.data.data;
};