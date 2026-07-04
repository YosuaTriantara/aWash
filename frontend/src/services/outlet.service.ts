import api from "@/lib/axios";

export const getOutlets = async () => {
  const response = await api.get("/outlet");

  return response.data.data.data;
};

export const getOutletById = async (id: string) => {
  const response = await api.get(`/outlet/${id}`);

  return response.data.data;
};

export const getOutletSlots = async (
  id: string,
  jenis: "DIJEMPUT" | "DIANTAR"
) => {
  const response = await api.get(
    `/outlet/${id}/slot?jenis=${jenis}`
  );

  return response.data.data;
};