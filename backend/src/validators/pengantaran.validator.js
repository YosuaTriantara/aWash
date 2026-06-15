const { z } = require('zod')

const createPengantaranSchema = z.object({
  id_pemesanan: z.string().uuid('id_pemesanan harus berupa UUID valid'),
  id_slot_operasional: z.string().uuid('id_slot_operasional harus berupa UUID valid'),
  id_kurir: z.string().uuid('id_kurir harus berupa UUID valid').optional(),
  tanggal_pengantaran: z.string().datetime('Format tanggal pengantaran tidak valid'),
  ongkir: z.number().min(0, 'Ongkir tidak boleh negatif')
})

const assignKurirSchema = z.object({
  id_kurir: z.string().uuid('id_kurir harus berupa UUID valid')
})

const updateStatusPengantaranSchema = z.object({
  status: z.enum(['MENUJU_LOKASI', 'SAMPAI_LOKASI', 'SELESAI', 'DIBATALKAN'])
})

const updateBuktiSchema = z.object({
  bukti_foto: z.string().url('bukti_foto harus berupa URL valid')
})

module.exports = {
  createPengantaranSchema,
  assignKurirSchema,
  updateStatusPengantaranSchema,
  updateBuktiSchema
}
