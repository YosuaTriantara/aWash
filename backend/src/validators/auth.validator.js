const { z } = require('zod')

const registerSchema = z.object({
  nama: z.string().trim().min(1, 'Nama wajib diisi'),
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
  no_telepon: z.string().min(10, 'Nomor telepon minimal 10 digit'),
  alamat: z.string().optional(),
  tanggal_lahir: z.string().optional()
})

const loginSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(1, 'Password wajib diisi')
})

module.exports = { registerSchema, loginSchema }