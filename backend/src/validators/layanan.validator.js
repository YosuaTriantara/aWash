const { z } = require('zod')

const createLayananSchema = z.object({
  nama_layanan: z.string().min(1, 'Nama layanan wajib diisi'),
  kategori_layanan: z.enum(['CUCI_KILOAN', 'DRY_CLEAN', 'CUCI_SEPATU']),
  satuan: z.enum(['KG', 'PCS', 'PASANG']),
  harga: z.number().positive('Harga harus lebih dari 0'),
  estimasi_durasi: z.number().int('Estimasi durasi harus bilangan bulat').positive('Estimasi durasi harus lebih dari 0'),
  satuan_durasi: z.enum(['JAM', 'HARI'])
})

const updateLayananSchema = createLayananSchema.partial()

module.exports = {
  createLayananSchema,
  updateLayananSchema
}
