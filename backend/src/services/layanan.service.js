const prisma = require("../config/database");

const getAllLayanan = async ({
  page = 1,
  limit = 10,
  kategori = null,
} = {}) => {
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  const where = { is_active: true };
  if (kategori) where.kategori_layanan = kategori;

  const [data, total] = await Promise.all([
    prisma.layanan.findMany({
      where,
      orderBy: { nama_layanan: "asc" },
      skip,
      take: limitNum,
    }),
    prisma.layanan.count({ where }),
  ]);

  return {
    data,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      total_pages: Math.ceil(total / limitNum),
    },
  };
};

const getLayananById = async (id_layanan) => {
  const layanan = await prisma.layanan.findUnique({
    where: { id_layanan },
  });
  if (!layanan) throw new Error("Layanan tidak ditemukan");
  return layanan;
};

const createLayanan = async (data) => {
  const {
    nama_layanan,
    kategori_layanan,
    satuan,
    harga,
    estimasi_durasi,
    satuan_durasi,
  } = data;
  const layanan = await prisma.layanan.create({
    data: {
      nama_layanan,
      kategori_layanan,
      satuan,
      harga,
      estimasi_durasi,
      satuan_durasi,
    },
  });
  return layanan;
};

const updateLayanan = async (id_layanan, data) => {
  const existing = await prisma.layanan.findUnique({ where: { id_layanan } });
  if (!existing) throw new Error("Layanan tidak ditemukan");

  const layanan = await prisma.layanan.update({
    where: { id_layanan },
    data,
  });
  return layanan;
};

const toggleLayanan = async (id_layanan) => {
  const existing = await prisma.layanan.findUnique({ where: { id_layanan } });
  if (!existing) throw new Error("Layanan tidak ditemukan");

  const layanan = await prisma.layanan.update({
    where: { id_layanan },
    data: { is_active: !existing.is_active },
  });
  return layanan;
};

module.exports = {
  getAllLayanan,
  getLayananById,
  createLayanan,
  updateLayanan,
  toggleLayanan,
};
