const prisma = require("../config/database");

const hitungEstimasiSelesai = (tanggal_antar, layananList) => {
  let maxJam = 0;
  for (const layanan of layananList) {
    let jam = layanan.estimasi_durasi;
    if (layanan.satuan_durasi === "HARI") jam *= 24;
    if (jam > maxJam) maxJam = jam;
  }
  const selesai = new Date(tanggal_antar);
  selesai.setHours(selesai.getHours() + maxJam);
  return selesai;
};

const buildPaginationMeta = (total, page, limit) => ({
  total,
  page,
  limit,
  total_pages: Math.ceil(total / limit),
});

// ─── Service functions ────────────────────────────────────────────────────────

const createPemesanan = async (id_user, data) => {
  // 1. Cari customer
  const customer = await prisma.customer.findUnique({ where: { id_user } });
  if (!customer) throw new Error("Customer tidak ditemukan");

  // 2. Cari outlet
  const outlet = await prisma.outlet.findUnique({
    where: { id_outlet: data.id_outlet },
  });
  if (!outlet) throw new Error("Outlet tidak ditemukan");

// 3. Validasi layanan
  const item = data.items[0];

  const layanan = await prisma.layanan.findFirst({
    where: {
      id_layanan: item.id_layanan,
      is_active: true,
    },
  });

  if (!layanan) {
    throw new Error("Layanan tidak ditemukan");
  }

  // 4. Validasi slot operasional jika DIANTAR_KURIR
  if (data.metode_antar === "DIANTAR_KURIR") {
    if (!data.id_slot_antar)
      throw new Error("id_slot_antar wajib diisi untuk metode DIANTAR_KURIR");
    const slot = await prisma.slotOperasional.findFirst({
      where: {
        id_slot: data.id_slot_antar,
        id_outlet: data.id_outlet,
        jenis_pengantaran: "DIJEMPUT",
        is_active: true,
      },
    });
    if (!slot)
      throw new Error("Slot pengantaran tidak valid atau tidak tersedia");
  }

  // 5. Hitung detail tiap item
  const subtotal =
    parseFloat(layanan.harga) * item.kuantitas;

  const detailItem = {
    id_layanan: layanan.id_layanan,
    nama_layanan: layanan.nama_layanan,
    kategori_layanan: layanan.kategori_layanan,
    satuan: layanan.satuan,
    harga_satuan: layanan.harga,
    estimasi_durasi: layanan.estimasi_durasi,
    satuan_durasi: layanan.satuan_durasi,
    kuantitas: item.kuantitas,
    subtotal,
  };

  // 6. Hitung total biaya
  const total_laundry = detailItem.subtotal;
  const total_pengantaran = 0; // ongkir default 0 saat order dibuat
  const grand_total = total_laundry + total_pengantaran;

  // 7. Estimasi selesai berdasarkan layanan terlama
  const estimasi_selesai = hitungEstimasiSelesai(
    new Date(data.tanggal_antar_request),
    [layanan],
  );

  // 8. Buat semua record dalam satu transaksi
  const pemesanan = await prisma.$transaction(async (tx) => {
    const created = await tx.pemesanan.create({
      data: {
        id_customer: customer.id_customer,
        id_outlet: data.id_outlet,
        tanggal_pesan: new Date(),
        status_terkini: "DIBUAT",
        estimasi_selesai,
        total_laundry,
        total_pengantaran,
        grand_total,
        catatan: data.catatan ?? null,
        metode_antar: data.metode_antar,
        metode_jemput: data.metode_jemput,
        tanggal_antar_request: data.tanggal_antar_request
          ? new Date(data.tanggal_antar_request)
          : null,
        tanggal_jemput_request: data.tanggal_jemput_request
          ? new Date(data.tanggal_jemput_request)
          : null,
      },
    });

    await tx.detailPemesanan.create({
      data: {
        id_pemesanan: created.id_pemesanan,
        ...detailItem,
      },
    });

  await tx.transaksi.create({
    data: {
      id_pemesanan: created.id_pemesanan,
      tanggal_pembayaran: new Date(),
      nominal_pembayaran: grand_total,
      status_pembayaran: "UNPAID",
    },
  });

    if (data.metode_antar === "DIANTAR_KURIR") {
      await tx.pengantaran.create({
        data: {
          id_pemesanan: created.id_pemesanan,
          id_slot_operasional: data.id_slot_antar,
          tanggal_pengantaran: new Date(data.tanggal_antar_request),
          status_pengantaran: "MENUNGGU",
          ongkir: 0,
        },
      });
    }

    await tx.riwayatPesanan.create({
      data: {
        id_pemesanan: created.id_pemesanan,
        status_pesanan: "DIBUAT",
        waktu_update: new Date(),
      },
    });

    return created;
  });

  return pemesanan;
};

const getPemesananByCustomer = async (
  id_user,
  {
    page = 1,
    limit = 10,
    status = null,
    tanggal_mulai = null,
    tanggal_akhir = null,
  } = {},
) => {
  const customer = await prisma.customer.findUnique({ where: { id_user } });
  if (!customer) throw new Error("Customer tidak ditemukan");

  const where = { id_customer: customer.id_customer };
  if (status) where.status_terkini = status;
  if (tanggal_mulai || tanggal_akhir) {
    where.tanggal_pesan = {};
    if (tanggal_mulai) where.tanggal_pesan.gte = new Date(tanggal_mulai);
    if (tanggal_akhir) where.tanggal_pesan.lte = new Date(tanggal_akhir);
  }

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.pemesanan.findMany({
      where,
      skip,
      take: limit,
      orderBy: { tanggal_pesan: "desc" },
      include: {
        outlet: { select: { nama_outlet: true, alamat_outlet: true } },
        detail_pemesanan: true,
        pengantaran: { include: { slot: true } },
      },
    }),
    prisma.pemesanan.count({ where }),
  ]);

  return { data, pagination: buildPaginationMeta(total, page, limit) };
};

const getPemesananById = async (id_pemesanan, id_user) => {
  const customer = await prisma.customer.findUnique({ where: { id_user } });
  if (!customer) throw new Error("Customer tidak ditemukan");

  const pemesanan = await prisma.pemesanan.findFirst({
    where: { id_pemesanan, id_customer: customer.id_customer },
    include: {
      outlet: true,
      detail_pemesanan: true,
      pengantaran: {
        include: {
          slot: true,
          kurir: {
            include: {
              user: { select: { nama: true, no_telepon: true } },
            },
          },
        },
      },
      transaksi: true,
      ulasan: true,
    },
  });

  if (!pemesanan) throw new Error("Pesanan tidak ditemukan");
  return pemesanan;
};

const cancelPemesanan = async (id_pemesanan, id_user) => {
  const customer = await prisma.customer.findUnique({ where: { id_user } });
  if (!customer) throw new Error("Customer tidak ditemukan");

  const pemesanan = await prisma.pemesanan.findFirst({
    where: { id_pemesanan, id_customer: customer.id_customer },
  });
  if (!pemesanan) throw new Error("Pesanan tidak ditemukan");

  if (!["DIBUAT", "DITERIMA"].includes(pemesanan.status_terkini)) {
    throw new Error("Pesanan tidak dapat dibatalkan pada status ini");
  }

  const updated = await prisma.$transaction(async (tx) => {
    const updatedPemesanan = await tx.pemesanan.update({
      where: { id_pemesanan },
      data: { status_terkini: "DIBATALKAN" },
    });

    await tx.riwayatPesanan.create({
      data: {
        id_pemesanan,
        status_pesanan: "DIBATALKAN",
        waktu_update: new Date(),
      },
    });

    return updatedPemesanan;
  });

  return updated;
};

const getRiwayat = async (id_pemesanan, id_user) => {
  const customer = await prisma.customer.findUnique({ where: { id_user } });
  if (!customer) throw new Error("Customer tidak ditemukan");

  const pemesanan = await prisma.pemesanan.findFirst({
    where: { id_pemesanan, id_customer: customer.id_customer },
  });
  if (!pemesanan) throw new Error("Pesanan tidak ditemukan");

  const riwayat = await prisma.riwayatPesanan.findMany({
    where: { id_pemesanan },
    orderBy: { waktu_update: "asc" },
  });

  return riwayat;
};

module.exports = {
  createPemesanan,
  getPemesananByCustomer,
  getPemesananById,
  cancelPemesanan,
  getRiwayat,
};
