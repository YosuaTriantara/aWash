import api from "@/lib/axios";

export interface CreateOrderDTO {
  id_outlet: string;

  metode_antar: "DIANTAR_SENDIRI" | "DIANTAR_KURIR";
  metode_jemput: "DIAMBIL_SENDIRI" | "DIJEMPUT_KURIR";

  tanggal_antar_request: string | null;
  tanggal_jemput_request: string | null;

  id_slot_antar: string | null;
  id_slot_jemput: string | null;

  catatan: string | null;

  items: {
    id_layanan: string;
    kuantitas: number;
  }[];
}

export const getOrders = async () => {
  const response = await api.get("/customer/pemesanan");

  return response.data.data.data;
};

export const createOrder = async (data: CreateOrderDTO) => {
  const response = await api.post(
    "/customer/pemesanan",
    data
  );

  return response.data;
};