const { z } = require("zod");

const createTransaksiSchema = z.object({
  id_pemesanan: z.string().uuid("id_pemesanan harus berupa UUID valid"),
  nominal_pembayaran: z
    .number()
    .positive("Nominal pembayaran harus lebih dari 0"),
});

const updateStatusTransaksiSchema = z.object({
  status: z.enum(["PAID", "UNPAID", "PENDING"]),
});

module.exports = {
  createTransaksiSchema,
  updateStatusTransaksiSchema,
};
