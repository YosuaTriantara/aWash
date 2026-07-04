import api from "@/lib/axios";

export const getReview = async (id: string) => {
  const response = await api.get(`/ulasan/${id}`);

  return response.data.data;
};

export const createReview = async (payload: unknown) => {
  const response = await api.post("/ulasan", payload);

  return response.data.data;
};