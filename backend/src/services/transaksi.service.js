const prisma = require("../config/database");

const getTransaksiById = async (id_transaksi, id_user, role) => {
  const transaksi = await prisma.transaksi.findUnique({
    where: { id_transaksi },
    include: {
      pemesanan: {
        include: {
          customer: {
            include: {
              user: { select: { nama: true } },
            },
          },
          outlet: { select: { nama_outlet: true } },
          detail_pemesanan: true,
        },
      },
    },
  });
  if (!transaksi) throw new Error("Transaksi tidak ditemukan");

  if (role === "CUSTOMER") {
    const customer = await prisma.customer.findUnique({ where: { id_user } });
    if (!customer || transaksi.pemesanan.id_customer !== customer.id_customer) {
      throw new Error("Akses ditolak");
    }
  } else if (role === "ADMIN") {
    const admin = await prisma.admin.findUnique({ where: { id_user } });
    if (!admin || transaksi.pemesanan.id_outlet !== admin.id_outlet) {
      throw new Error("Akses ditolak");
    }
  }

  return transaksi;
};

module.exports = { getTransaksiById };
