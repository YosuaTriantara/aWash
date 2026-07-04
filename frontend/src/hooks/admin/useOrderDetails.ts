import { useQuery } from '@tanstack/react-query';
import { getOrderDetail } from '@/services/order';

export const useOrderDetail = (id: string) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => getOrderDetail(id),
    enabled: !!id,
  });
};