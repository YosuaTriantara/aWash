import { useQuery } from '@tanstack/react-query';
import { getOrders } from '@/services/order';

export const useOrders = (status?: string) => {
  return useQuery({
    queryKey: ['orders', status],
    queryFn: () =>
      getOrders({
        status,
      }),
  });
};