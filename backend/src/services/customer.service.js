const prisma = require('../config/database')

const getProfile = async (id_user) => {
  const user = await prisma.user.findUnique({
    where: { id_user },
    select: {
      id_user: true,
      nama: true,
      email: true,
      no_telepon: true,
      role: true,
      customer: {
        select: {
          id_customer: true,
          alamat: true,
          tanggal_lahir: true,
          tanggal_daftar: true
        }
      }
    }
  })

  if (!user) throw new Error('User tidak ditemukan')
  return user
}

const updateProfile = async (id_user, data) => {
  // update tabel user
  await prisma.user.update({
    where: { id_user },
    data: {
      nama: data.nama,
      no_telepon: data.no_telepon
    }
  })

  // update tabel customer
  const customer = await prisma.customer.update({
    where: { id_user },
    data: {
      alamat: data.alamat,
      tanggal_lahir: data.tanggal_lahir ? new Date(data.tanggal_lahir) : undefined
    }
  })

  return customer
}

module.exports = { getProfile, updateProfile }