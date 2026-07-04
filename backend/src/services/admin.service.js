const { randomUUID } = require("crypto");
const prisma = require("../config/database");
const { hashPassword } = require("../utils/password");

// ─── Helper Internal ──────────────────────────────────────────────────────────

const getAdminData = async (id_user) => {
  const admin = await prisma.admin.findUnique({ where: { id_user } });
  if (!admin) throw new Error("Data admin tidak ditemukan");
  return admin;
};

// ─── Profile ──────────────────────────────────────────────────────────────────

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
            select: { nama_outlet: true, alamat_outlet: true },
          },
        },
      },
    },
  });
  if (!user) throw new Error("User tidak ditemukan");
  return user;
};

const updateProfile = async (id_user, data) => {
  const user = await prisma.user.update({
    where: { id_user },
    data: { nama: data.nama, no_telepon: data.no_telepon },
  });
  return user;
};

// ─── Outlet ───────────────────────────────────────────────────────────────────

const getOutlet = async (id_user) => {
  const { id_outlet } = await getAdminData(id_user);
  const outlet = await prisma.outlet.findUnique({
    where: { id_outlet },
    include: { slot_operasional: true },
  });
  if (!outlet) throw new Error("Outlet tidak ditemukan");
  return outlet;
};

const updateOutlet = async (id_user, data) => {
  const { id_outlet } = await getAdminData(id_user);
  const updateData = {};
  if (data.nama_outlet !== undefined) updateData.nama_outlet = data.nama_outlet;
  if (data.alamat_outlet !== undefined)
    updateData.alamat_outlet = data.alamat_outlet;
  if (data.nomor_telepon_outlet !== undefined)
    updateData.nomor_telepon_outlet = data.nomor_telepon_outlet;
  if (data.jam_buka !== undefined) updateData.jam_buka = data.jam_buka;
  if (data.jam_tutup !== undefined) updateData.jam_tutup = data.jam_tutup;
  const outlet = await prisma.outlet.update({
    where: { id_outlet },
    data: updateData,
  });
  return outlet;
};

// ─── Kurir ────────────────────────────────────────────────────────────────────

const getKurirList = async (id_user, { page = 1, limit = 10 }) => {
  const { id_outlet } = await getAdminData(id_user);
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    prisma.kurir.findMany({
      where: { id_outlet },
      include: {
        user: {
          select: {
            nama: true,
            email: true,
            no_telepon: true,
            is_active: true,
          },
        },
      },
      skip,
      take: limit,
    }),
    prisma.kurir.count({ where: { id_outlet } }),
  ]);
  return {
    data,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
};

const getKurirById = async (id_user, id_kurir) => {
  const { id_outlet } = await getAdminData(id_user);
  const kurir = await prisma.kurir.findFirst({
    where: { id_kurir, id_outlet },
    include: {
      user: {
        select: { nama: true, email: true, no_telepon: true, is_active: true },
      },
    },
  });
  if (!kurir) throw new Error("Kurir tidak ditemukan");
  return kurir;
};

const createKurir = async (id_user, data) => {
  const { id_outlet } = await getAdminData(id_user);

  const existingEmail = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existingEmail) throw new Error("Email sudah digunakan");

  const existingTelepon = await prisma.user.findFirst({
    where: { no_telepon: data.no_telepon },
  });
  if (existingTelepon) throw new Error("Nomor telepon sudah digunakan");

  const password_hash = await hashPassword(data.password);

  const result = await prisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: {
        nama: data.nama,
        email: data.email,
        password_hash,
        no_telepon: data.no_telepon,
        role: "KURIR",
      },
    });
    const newKurir = await tx.kurir.create({
      data: {
        id_kurir: randomUUID(),
        id_user: newUser.id_user,
        id_outlet,
        jenis_kendaraan: data.jenis_kendaraan,
        nomor_kendaraan: data.nomor_kendaraan,
        status_kurir: "AKTIF",
      },
    });
    return { ...newKurir, user: newUser };
  });

  return result;
};

const updateKurir = async (id_user, id_kurir, data) => {
  const { id_outlet } = await getAdminData(id_user);
  const kurir = await prisma.kurir.findFirst({
    where: { id_kurir, id_outlet },
  });
  if (!kurir) throw new Error("Kurir tidak ditemukan");

  await prisma.$transaction(async (tx) => {
    if (data.nama !== undefined || data.no_telepon !== undefined) {
      const userUpdate = {};
      if (data.nama !== undefined) userUpdate.nama = data.nama;
      if (data.no_telepon !== undefined)
        userUpdate.no_telepon = data.no_telepon;
      await tx.user.update({
        where: { id_user: kurir.id_user },
        data: userUpdate,
      });
    }
    if (
      data.jenis_kendaraan !== undefined ||
      data.nomor_kendaraan !== undefined
    ) {
      const kurirUpdate = {};
      if (data.jenis_kendaraan !== undefined)
        kurirUpdate.jenis_kendaraan = data.jenis_kendaraan;
      if (data.nomor_kendaraan !== undefined)
        kurirUpdate.nomor_kendaraan = data.nomor_kendaraan;
      await tx.kurir.update({ where: { id_kurir }, data: kurirUpdate });
    }
  });

  const updated = await prisma.kurir.findFirst({
    where: { id_kurir },
    include: {
      user: {
        select: { nama: true, email: true, no_telepon: true, is_active: true },
      },
    },
  });
  return updated;
};

const toggleKurirStatus = async (id_user, id_kurir) => {
  const { id_outlet } = await getAdminData(id_user);
  const kurir = await prisma.kurir.findFirst({
    where: { id_kurir, id_outlet },
  });
  if (!kurir) throw new Error("Kurir tidak ditemukan");
  const newStatus = kurir.status_kurir === "AKTIF" ? "TIDAK_AKTIF" : "AKTIF";
  const updated = await prisma.kurir.update({
    where: { id_kurir },
    data: { status_kurir: newStatus },
  });
  return updated;
};

// ─── Slot Operasional ─────────────────────────────────────────────────────────

const getSlotList = async (id_user) => {
  const { id_outlet } = await getAdminData(id_user);
  const slots = await prisma.slotOperasional.findMany({
    where: { id_outlet },
    orderBy: [{ hari: "asc" }, { jam_mulai: "asc" }],
  });
  return slots;
};

const createSlot = async (id_user, data) => {
  const { id_outlet } = await getAdminData(id_user);
  const slot = await prisma.slotOperasional.create({
    data: { id_slot: randomUUID(), id_outlet, ...data },
  });
  return slot;
};

const updateSlot = async (id_user, id_slot, data) => {
  const { id_outlet } = await getAdminData(id_user);
  const existing = await prisma.slotOperasional.findFirst({
    where: { id_slot, id_outlet },
  });
  if (!existing) throw new Error("Slot tidak ditemukan");
  const slot = await prisma.slotOperasional.update({
    where: { id_slot },
    data,
  });
  return slot;
};

const deleteSlot = async (id_user, id_slot) => {
  const { id_outlet } = await getAdminData(id_user);
  const existing = await prisma.slotOperasional.findFirst({
    where: { id_slot, id_outlet },
  });
  if (!existing) throw new Error("Slot tidak ditemukan");
  await prisma.slotOperasional.delete({ where: { id_slot } });
};

const toggleSlot = async (id_user, id_slot) => {
  const { id_outlet } = await getAdminData(id_user);
  const slot = await prisma.slotOperasional.findFirst({
    where: { id_slot, id_outlet },
  });
  if (!slot) throw new Error("Slot tidak ditemukan");
  const updated = await prisma.slotOperasional.update({
    where: { id_slot },
    data: { is_active: !slot.is_active },
  });
  return updated;
};

// ─── Layanan ──────────────────────────────────────────────────────────────────

const createLayanan = async (data) => {
  const layanan = await prisma.layanan.create({
    data: { id_layanan: randomUUID(), ...data },
  });
  return layanan;
};

const updateLayanan = async (id_layanan, data) => {
  const existing = await prisma.layanan.findUnique({ where: { id_layanan } });
  if (!existing) throw new Error("Layanan tidak ditemukan");
  const layanan = await prisma.layanan.update({ where: { id_layanan }, data });
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

// ─── Pemesanan ────────────────────────────────────────────────────────────────

const getPemesananList = async (
  id_user,
  {
    page = 1,
    limit = 10,
    status = null,
    tanggal_mulai = null,
    tanggal_akhir = null,
  },
) => {
  const { id_outlet } = await getAdminData(id_user);
  const skip = (page - 1) * limit;

  const where = { id_outlet };
  if (status) {
  const statusList = status.split(',');
  where.status_terkini = statusList.length > 1
    ? { in: statusList }
    : statusList[0];
}
  if (tanggal_mulai || tanggal_akhir) {
    where.tanggal_pesan = {};
    if (tanggal_mulai) where.tanggal_pesan.gte = new Date(tanggal_mulai);
    if (tanggal_akhir) where.tanggal_pesan.lte = new Date(tanggal_akhir);
  }

  const [data, total] = await Promise.all([
    prisma.pemesanan.findMany({
      where,
      include: {
        customer: {
          include: { user: { select: { nama: true, no_telepon: true } } },
        },
        detail_pemesanan: {
          include: {
            layanan: true,
          },
        },
        pengantaran: {
          include: {
            kurir: { include: { user: { select: { nama: true } } } },
          },
        },
      },
      skip,
      take: limit,
      orderBy: { tanggal_pesan: "desc" },
    }),
    prisma.pemesanan.count({ where }),
  ]);

  return {
    data,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
};

const getPemesananById = async (id_user, id_pemesanan) => {
  const { id_outlet } = await getAdminData(id_user);
  const pemesanan = await prisma.pemesanan.findFirst({
    where: { id_pemesanan, id_outlet },
    include: {
      customer: {
        include: {
          user: { select: { nama: true, email: true, no_telepon: true } },
        },
      },
      detail_pemesanan: {
        include: {
          layanan: true,
        },
      },
      pengantaran: {
        include: {
          slot: true,
          kurir: {
            include: { user: { select: { nama: true, no_telepon: true } } },
          },
        },
      },
      transaksi: true,
      riwayat_pesanan: { orderBy: { waktu_update: "asc" } },
      ulasan: true,
    },
  });
  if (!pemesanan) throw new Error("Pemesanan tidak ditemukan");
  return pemesanan;
};

const verifikasiPesanan = async (id_user, id_pemesanan, data) => {
  const { id_outlet } = await getAdminData(id_user);

  const pemesanan = await prisma.pemesanan.findFirst({
    where: { id_pemesanan, id_outlet },
    include: { detail_pemesanan: true },
  });

  if (!pemesanan) throw new Error("Pemesanan tidak ditemukan");

  if (pemesanan.status_terkini !== "DIBUAT") {
    throw new Error("Hanya pesanan DIBUAT yang dapat diverifikasi");
  }

  if (!pemesanan.detail_pemesanan.length) {
    throw new Error("Detail pesanan tidak ditemukan");
  }

  // data.items = [{ id_detail, kuantitas }, ...] — divalidasi oleh verifikasiPesananSchema
  const detailMap = new Map(
    pemesanan.detail_pemesanan.map((d) => [d.id_detail, d]),
  );

  const updates = data.items.map((item) => {
    const detail = detailMap.get(item.id_detail);

    if (!detail) {
      throw new Error(
        `Detail pesanan ${item.id_detail} tidak ditemukan pada pesanan ini`,
      );
    }

    const kuantitasAktual = Number(item.kuantitas);
    const subtotal = Number(detail.harga_satuan) * kuantitasAktual;

    return { id_detail: detail.id_detail, kuantitasAktual, subtotal };
  });

  const result = await prisma.$transaction(async (tx) => {

    // update tiap detail yang divalidasi
    for (const u of updates) {
      await tx.detailPemesanan.update({
        where: { id_detail: u.id_detail },
        data: {
          kuantitas: u.kuantitasAktual,
          subtotal: u.subtotal,
        },
      });
    }

    const total_laundry = updates.reduce((sum, u) => sum + u.subtotal, 0);
    const grand_total =
      total_laundry + Number(pemesanan.total_pengantaran);

    // update pemesanan
    const updated = await tx.pemesanan.update({
      where: { id_pemesanan },
      data: {
        total_laundry,
        grand_total,
        status_terkini: "MENUNGGU",
      },
    });

    // riwayat
    await tx.riwayatPesanan.create({
      data: {
        id_pemesanan,
        status_pesanan: "MENUNGGU",
        waktu_update: new Date(),
      },
    });

    return updated;
  });

  return result;
};

const TRANSISI_STATUS = {
  DITERIMA: ["MENUNGGU", "DIPROSES", "DIBATALKAN"],
  MENUNGGU: ["DIPROSES", "DIBATALKAN"],
  DIPROSES: ["SIAP", "DIBATALKAN"],
  SIAP: ["SELESAI"],
};

const updateStatusPesanan = async (id_user, id_pemesanan, status) => {
  const { id_outlet } = await getAdminData(id_user);
  const pemesanan = await prisma.pemesanan.findFirst({
    where: { id_pemesanan, id_outlet },
  });
  if (!pemesanan) throw new Error("Pemesanan tidak ditemukan");

  const allowed = TRANSISI_STATUS[pemesanan.status_terkini];
  if (!allowed) {
    throw new Error(`Status ${pemesanan.status_terkini} tidak dapat diubah`);
  }
  if (!allowed.includes(status)) {
    throw new Error(
      `Tidak dapat mengubah status dari ${pemesanan.status_terkini} ke ${status}`,
    );
  }

  const result = await prisma.$transaction(async (tx) => {
    const updated = await tx.pemesanan.update({
      where: { id_pemesanan },
      data: { status_terkini: status },
    });
    await tx.riwayatPesanan.create({
      data: {
        id_history: randomUUID(),
        id_pemesanan,
        status_pesanan: status,
        waktu_update: new Date(),
      },
    });
    return updated;
  });

  return result;
};

// ─── Pengantaran ──────────────────────────────────────────────────────────────

const getPengantaranList = async (
  id_user,
  { page = 1, limit = 10, status = null },
) => {
  const { id_outlet } = await getAdminData(id_user);
  const skip = (page - 1) * limit;

  const where = { pemesanan: { id_outlet } };
  if (status) where.status_pengantaran = status;

  const [data, total] = await Promise.all([
    prisma.pengantaran.findMany({
      where,
      include: {
        pemesanan: {
          include: {
            customer: {
              include: { user: { select: { nama: true, no_telepon: true } } },
            },
          },
        },
        slot: true,
        kurir: { include: { user: { select: { nama: true } } } },
      },
      skip,
      take: limit,
      orderBy: { tanggal_pengantaran: "desc" },
    }),
    prisma.pengantaran.count({ where }),
  ]);

  return {
    data,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
};

const createPengantaran = async (id_user, data) => {
  const { id_outlet } = await getAdminData(id_user);

  const pemesanan = await prisma.pemesanan.findFirst({
    where: { id_pemesanan: data.id_pemesanan, id_outlet },
  });
  if (!pemesanan) throw new Error("Pemesanan tidak ditemukan");
  if (pemesanan.status_terkini !== "SIAP") {
    throw new Error(
      "Pesanan harus berstatus SIAP untuk dijadwalkan pengantaran",
    );
  }
  if (pemesanan.metode_jemput !== "DIJEMPUT_KURIR") {
    throw new Error("Metode pengambilan pesanan bukan DIJEMPUT_KURIR");
  }

  const slot = await prisma.slotOperasional.findFirst({
    where: { id_slot: data.id_slot_operasional, id_outlet },
  });
  if (!slot) throw new Error("Slot operasional tidak ditemukan");
  if (slot.jenis_pengantaran !== "DIANTAR")
    throw new Error("Slot harus bertipe DIANTAR");
  if (!slot.is_active) throw new Error("Slot tidak aktif");

  if (data.id_kurir) {
    const kurir = await prisma.kurir.findFirst({
      where: { id_kurir: data.id_kurir, id_outlet },
    });
    if (!kurir) throw new Error("Kurir tidak ditemukan");
    if (kurir.status_kurir !== "AKTIF") throw new Error("Kurir tidak aktif");
  }

  const result = await prisma.$transaction(async (tx) => {
    const pengantaran = await tx.pengantaran.create({
      data: {
        id_pengantaran: randomUUID(),
        id_pemesanan: data.id_pemesanan,
        id_slot_operasional: data.id_slot_operasional,
        id_kurir: data.id_kurir || null,
        tanggal_pengantaran: new Date(data.tanggal_pengantaran),
        status_pengantaran: data.id_kurir ? "DITUGASKAN" : "MENUNGGU",
        ongkir: data.ongkir,
      },
    });

    await tx.pemesanan.update({
      where: { id_pemesanan: data.id_pemesanan },
      data: {
        total_pengantaran:
          Number(pemesanan.total_pengantaran) + Number(data.ongkir),
        grand_total: Number(pemesanan.grand_total) + Number(data.ongkir),
      },
    });

    return pengantaran;
  });

  return result;
};

const assignKurir = async (id_user, id_pengantaran, id_kurir) => {
  const { id_outlet } = await getAdminData(id_user);

  const pengantaran = await prisma.pengantaran.findFirst({
    where: { id_pengantaran },
    include: { pemesanan: true },
  });
  if (!pengantaran) throw new Error("Pengantaran tidak ditemukan");
  if (pengantaran.pemesanan.id_outlet !== id_outlet)
    throw new Error("Pengantaran tidak ditemukan");

  const kurir = await prisma.kurir.findFirst({
    where: { id_kurir, id_outlet },
  });
  if (!kurir) throw new Error("Kurir tidak ditemukan");
  if (kurir.status_kurir !== "AKTIF") throw new Error("Kurir tidak aktif");

  const updated = await prisma.pengantaran.update({
    where: { id_pengantaran },
    data: { id_kurir, status_pengantaran: "DITUGASKAN" },
  });
  return updated;
};

// ─── Transaksi ────────────────────────────────────────────────────────────────

const getTransaksiList = async (
  id_user,
  {
    page = 1,
    limit = 10,
    status = null,
    tanggal_mulai = null,
    tanggal_akhir = null,
  },
) => {
  const { id_outlet } = await getAdminData(id_user);
  const skip = (page - 1) * limit;

  const where = { pemesanan: { id_outlet } };
  if (status) where.status_pembayaran = status;
  if (tanggal_mulai || tanggal_akhir) {
    where.tanggal_pembayaran = {};
    if (tanggal_mulai) where.tanggal_pembayaran.gte = new Date(tanggal_mulai);
    if (tanggal_akhir) where.tanggal_pembayaran.lte = new Date(tanggal_akhir);
  }

  const [data, total] = await Promise.all([
    prisma.transaksi.findMany({
      where,
      include: {
        pemesanan: {
          include: {
            customer: { include: { user: { select: { nama: true } } } },
          },
        },
      },
      skip,
      take: limit,
      orderBy: { tanggal_pembayaran: "desc" },
    }),
    prisma.transaksi.count({ where }),
  ]);

  return {
    data,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
};

const createTransaksi = async (id_user, data) => {
  const { id_outlet } = await getAdminData(id_user);

  const pemesanan = await prisma.pemesanan.findFirst({
    where: { id_pemesanan: data.id_pemesanan, id_outlet },
  });
  if (!pemesanan) throw new Error("Pemesanan tidak ditemukan");
  if (pemesanan.status_terkini !== "SELESAI") {
    throw new Error("Pesanan harus berstatus SELESAI untuk membuat transaksi");
  }

  const existing = await prisma.transaksi.findUnique({
    where: { id_pemesanan: data.id_pemesanan },
  });
  if (existing) throw new Error("Transaksi untuk pesanan ini sudah ada");

  const transaksi = await prisma.transaksi.create({
    data: {
      id_transaksi: randomUUID(),
      id_pemesanan: data.id_pemesanan,
      tanggal_pembayaran: new Date(),
      nominal_pembayaran: data.nominal_pembayaran,
      status_pembayaran: "UNPAID",
    },
  });
  return transaksi;
};

const updateStatusTransaksi = async (id_user, id_transaksi, status) => {
  const { id_outlet } = await getAdminData(id_user);

  const transaksi = await prisma.transaksi.findFirst({
    where: { id_transaksi },
    include: { pemesanan: true },
  });
  if (!transaksi) throw new Error("Transaksi tidak ditemukan");
  if (transaksi.pemesanan.id_outlet !== id_outlet)
    throw new Error("Transaksi tidak ditemukan");

  const updated = await prisma.transaksi.update({
    where: { id_transaksi },
    data: { status_pembayaran: status },
  });
  return updated;
};

// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  getProfile,
  updateProfile,
  getOutlet,
  updateOutlet,
  getKurirList,
  getKurirById,
  createKurir,
  updateKurir,
  toggleKurirStatus,
  getSlotList,
  createSlot,
  updateSlot,
  deleteSlot,
  toggleSlot,
  createLayanan,
  updateLayanan,
  toggleLayanan,
  getPemesananList,
  getPemesananById,
  verifikasiPesanan,
  updateStatusPesanan,
  getPengantaranList,
  createPengantaran,
  assignKurir,
  getTransaksiList,
  createTransaksi,
  updateStatusTransaksi,
};