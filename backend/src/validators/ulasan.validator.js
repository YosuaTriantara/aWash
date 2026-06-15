const { z } = require("zod");

const createUlasanSchema = z.object({
  id_pemesanan: z.string().uuid("id_pemesanan harus berupa UUID valid"),
  rating: z
    .number()
    .int("Rating harus bilangan bulat")
    .min(1, "Rating minimal 1")
    .max(5, "Rating maksimal 5"),
  komen: z.string().min(1, "Komentar wajib diisi"),
});

module.exports = {
  createUlasanSchema,
};
