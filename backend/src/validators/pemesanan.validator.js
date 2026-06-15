const { z } = require("zod");

const createPemesananSchema = z
  .object({
    id_outlet: z.string().length(36, "id_outlet harus berupa UUID valid"),
    metode_antar: z.enum(["DIANTAR_SENDIRI", "DIANTAR_KURIR"]),
    metode_jemput: z.enum(["DIAMBIL_SENDIRI", "DIJEMPUT_KURIR"]),
    tanggal_antar_request: z
      .string()
      .datetime("Format tanggal antar tidak valid"),
    tanggal_jemput_request: z
      .string()
      .datetime("Format tanggal jemput tidak valid")
      .optional(),
    id_slot_antar: z
      .string()
      .length(36, "id_slot_antar harus berupa UUID valid")
      .optional(),
    catatan: z.string().optional(),
    items: z
      .array(
        z.object({
          id_layanan: z.string().length(36, "id_layanan harus berupa UUID valid"),
          kuantitas: z.number().positive("Kuantitas harus lebih dari 0"),
        }),
      )
      .min(1, "Items tidak boleh kosong"),
  })
  .refine(
    (data) =>
      data.metode_antar !== "DIANTAR_KURIR" || data.id_slot_antar !== undefined,
    {
      message:
        "id_slot_antar wajib diisi jika metode_antar adalah DIANTAR_KURIR",
      path: ["id_slot_antar"],
    },
  );

const verifikasiPesananSchema = z.object({
  items: z
    .array(
      z.object({
        id_detail: z.string().length(36, "id_detail harus berupa UUID valid"),
        kuantitas: z.number().positive("Kuantitas harus lebih dari 0"),
      }),
    )
    .min(1, "Items tidak boleh kosong"),
});

const updateStatusPesananSchema = z.object({
  status: z.enum(["MENUNGGU", "DIPROSES", "SIAP", "SELESAI", "DIBATALKAN"]),
});

module.exports = {
  createPemesananSchema,
  verifikasiPesananSchema,
  updateStatusPesananSchema,
};
