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
      admin: {
        select: {
          id_admin: true,
          id_outlet: true,
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
  const user = await prisma.user.update({
    where: { id_user },
    data: {
      nama: data.nama,
      no_telepon: data.no_telepon
    }
  })

  return user
}

module.exports = { getProfile, updateProfile }