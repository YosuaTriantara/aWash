import api from "@/lib/axios";

export const getServices = async () => {
  const response = await api.get("/layanan");

  return response.data.data.data;
};

export const getServiceById = async (id: string) => {
  const response = await api.get(`/layanan/${id}`);

  return response.data.data;
};