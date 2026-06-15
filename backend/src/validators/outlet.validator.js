const { z } = require('zod')

const timeRegex = /^\d{2}:\d{2}$/

const updateOutletSchema = z.object({
  nama_outlet: z.string().optional(),
  alamat_outlet: z.string().optional(),
  nomor_telepon_outlet: z.string().optional(),
  jam_buka: z.string().regex(timeRegex, 'Format jam buka harus HH:MM').optional(),
  jam_tutup: z.string().regex(timeRegex, 'Format jam tutup harus HH:MM').optional()
})

const createSlotSchema = z.object({
  jenis_pengantaran: z.enum(['DIANTAR', 'DIJEMPUT']),
  hari: z.enum(['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU', 'MINGGU']),
  jam_mulai: z.string().regex(timeRegex, 'Format jam mulai harus HH:MM'),
  jam_selesai: z.string().regex(timeRegex, 'Format jam selesai harus HH:MM')
})

const updateSlotSchema = createSlotSchema.partial()

module.exports = {
  updateOutletSchema,
  createSlotSchema,
  updateSlotSchema
}
