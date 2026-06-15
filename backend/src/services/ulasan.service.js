const prisma = require("../config/database");

const createUlasan = async (id_user, data) => {
  // 1. Cari customer
  const customer = await prisma.customer.findUnique({ where: { id_user } });
  if (!customer) throw new Error("Customer tidak ditemukan");

  // 2. Pastikan pesanan milik customer
  const pemesanan = await prisma.pemesanan.findFirst({
    where: {
      id_pemesanan: data.id_pemesanan,
      id_customer: customer.id_customer,
    },
  });
  if (!pemesanan) throw new Error("Pesanan tidak ditemukan");

  // 3. Hanya pesanan SELESAI yang bisa diberi ulasan
  if (pemesanan.status_terkini !== "SELESAI") {
    throw new Error(
      "Ulasan hanya bisa diberikan untuk pesanan yang sudah selesai",
    );
  }

  // 4. Cek duplikasi ulasan
  const existing = await prisma.ulasan.findUnique({
    where: { id_pemesanan: data.id_pemesanan },
  });
  if (existing) throw new Error("Ulasan untuk pesanan ini sudah ada");

  // 5. Buat ulasan
  const ulasan = await prisma.ulasan.create({
    data: {
      id_customer: customer.id_customer,
      id_pemesanan: data.id_pemesanan,
      rating: data.rating,
      komen: data.komen,
      tanggal_ulasan: new Date(),
    },
  });

  return ulasan;
};

const getUlasanByPemesanan = async (id_pemesanan, id_user, role) => {
  // Jika CUSTOMER, pastikan pesanan memang miliknya
  if (role === "CUSTOMER") {
    const customer = await prisma.customer.findUnique({ where: { id_user } });
    if (!customer) throw new Error("Customer tidak ditemukan");

    const pemesanan = await prisma.pemesanan.findFirst({
      where: { id_pemesanan, id_customer: customer.id_customer },
    });
    if (!pemesanan) throw new Error("Pesanan tidak ditemukan");
  }

  const ulasan = await prisma.ulasan.findUnique({
    where: { id_pemesanan },
    include: {
      customer: {
        include: {
          user: { select: { nama: true } },
        },
      },
    },
  });
  if (!ulasan) throw new Error("Ulasan tidak ditemukan");

  return ulasan;
};

module.exports = { createUlasan, getUlasanByPemesanan };
