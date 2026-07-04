import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getPengantaranList,
  getPengantaranDetail,
  getKurirList,
  assignKurir,
} from '@/services/admin.services';

export const usePengantaranList = (status?: string) => {
  return useQuery({
    queryKey: ['pengantaran', status],
    queryFn: () => getPengantaranList({ status }),
  });
};

export const usePengantaranDetail = (id: string) => {
  return useQuery({
    queryKey: ['pengantaran-detail', id],
    queryFn: () => getPengantaranDetail(id),
    enabled: !!id,
  });
};

// Kurir aktif saja, dipakai untuk dropdown assign kurir.
// limit besar karena tidak ada UI pagination di dropdown.
export const useKurirAktifList = () => {
  return useQuery({
    queryKey: ['kurir', 'AKTIF'],
    queryFn: () => getKurirList({ status: 'AKTIF', limit: 100 }),
  });
};

export const useAssignKurir = (id_pengantaran: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id_kurir: string) => assignKurir(id_pengantaran, id_kurir),
    onSuccess: () => {
      // refresh detail & list biar status_pengantaran & nama kurir ke-update
      queryClient.invalidateQueries({ queryKey: ['pengantaran-detail', id_pengantaran] });
      queryClient.invalidateQueries({ queryKey: ['pengantaran'] });
    },
  });
};