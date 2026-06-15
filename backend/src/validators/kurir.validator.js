const { z } = require('zod')

const createKurirSchema = z.object({
  nama: z.string().min(1, 'Nama wajib diisi'),
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
  no_telepon: z.string().min(10, 'Nomor telepon minimal 10 digit'),
  jenis_kendaraan: z.string().min(1, 'Jenis kendaraan wajib diisi'),
  nomor_kendaraan: z.string().min(1, 'Nomor kendaraan wajib diisi')
})

// Semua field opsional kecuali email dan password (dihapus dari schema)
const updateKurirByAdminSchema = createKurirSchema
  .omit({ email: true, password: true })
  .partial()

module.exports = {
  createKurirSchema,
  updateKurirByAdminSchema
}
