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
      kurir: {
        select: {
          id_kurir: true,
          id_outlet: true,
          jenis_kendaraan: true,
          nomor_kendaraan: true,
          status_kurir: true,
          outlet: {
            select: {
              nama_outlet: true,
              alamat_outlet: true
            }
          }
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

  // update tabel kurir
  const kurir = await prisma.kurir.update({
    where: { id_user },
    data: {
      jenis_kendaraan: data.jenis_kendaraan,
      nomor_kendaraan: data.nomor_kendaraan
    }
  })

  return kurir
}

module.exports = { getProfile, updateProfile }