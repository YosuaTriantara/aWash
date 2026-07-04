import api from "@/lib/axios";

export const getSlots = async (
  idOutlet: string,
  jenis: "DIJEMPUT" | "DIANTAR"
) => {
  const response = await api.get(
    `/outlet/${idOutlet}/slot`,
    {
      params: {
        jenis,
      },
    }
  );

  return response.data.data;
};