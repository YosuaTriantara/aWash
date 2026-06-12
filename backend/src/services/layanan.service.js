const prisma = require('../config/database')

const getAllLayanan = async () => {
  const layanan = await prisma.layanan.findMany({
    orderBy: { nama_layanan: 'asc' }
  })
  return layanan
}

const getLayananById = async (id_layanan) => {
  const layanan = await prisma.layanan.findUnique({
    where: { id_layanan }
  })

  if (!layanan) throw new Error('Layanan tidak ditemukan')
  return layanan
}

module.exports = { getAllLayanan, getLayananById }