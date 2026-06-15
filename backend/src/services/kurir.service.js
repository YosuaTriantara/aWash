const prisma = require("../config/database");

const getKurirFromUser = async (id_user) => {
  const kurir = await prisma.kurir.findUnique({ where: { id_user } });
  if (!kurir) throw new Error("Data kurir tidak ditemukan");
  return kurir;
};

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
          outlet: { select: { nama_outlet: true, alamat_outlet: true } },
        },
      },
    },
  });
  if (!user) throw new Error("User tidak ditemukan");
  return user;
};

const updateProfile = async (id_user, data) => {
  await prisma.user.update({
    where: { id_user },
    data: { nama: data.nama, no_telepon: data.no_telepon },
  });
  const kurir = await prisma.kurir.update({
    where: { id_user },
    data: {
      jenis_kendaraan: data.jenis_kendaraan,
      nomor_kendaraan: data.nomor_kendaraan,
    },
  });
  return kurir;
};

const getPengantaranList = async (
  id_user,
  { page = 1, limit = 10, status = null } = {},
) => {
  const { id_kurir } = await getKurirFromUser(id_user);

  const where = { id_kurir };
  if (status) where.status_pengantaran = status;

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.pengantaran.findMany({
      where,
      skip,
      take: limit,
      orderBy: { tanggal_pengantaran: "asc" },
      include: {
        pemesanan: {
          include: {
            customer: {
              include: {
                user: { select: { nama: true, no_telepon: true } },
              },
            },
            outlet: { select: { nama_outlet: true, alamat_outlet: true } },
          },
        },
        slot: true,
      },
    }),
    prisma.pengantaran.count({ where }),
  ]);

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      total_pages: Math.ceil(total / limit),
    },
  };
};

const getPengantaranById = async (id_user, id_pengantaran) => {
  const { id_kurir } = await getKurirFromUser(id_user);

  const pengantaran = await prisma.pengantaran.findFirst({
    where: { id_pengantaran, id_kurir },
    include: {
      pemesanan: {
        include: {
          customer: {
            include: {
              user: { select: { nama: true, no_telepon: true } },
            },
          },
          outlet: {
            select: {
              nama_outlet: true,
              alamat_outlet: true,
              nomor_telepon_outlet: true,
            },
          },
          detail_pemesanan: true,
        },
      },
      slot: true,
    },
  });

  if (!pengantaran) throw new Error("Pengantaran tidak ditemukan");
  return pengantaran;
};

const ALLOWED_TRANSITIONS = {
  DITUGASKAN: ["MENUJU_LOKASI", "DIBATALKAN"],
  MENUJU_LOKASI: ["SAMPAI_LOKASI"],
  SAMPAI_LOKASI: ["SELESAI"],
};

const updateStatusPengantaran = async (id_user, id_pengantaran, status) => {
  const { id_kurir } = await getKurirFromUser(id_user);

  const pengantaran = await prisma.pengantaran.findFirst({
    where: { id_pengantaran, id_kurir },
  });
  if (!pengantaran) throw new Error("Pengantaran tidak ditemukan");

  const allowed = ALLOWED_TRANSITIONS[pengantaran.status_pengantaran] ?? [];
  if (!allowed.includes(status)) throw new Error("Transisi status tidak valid");

  const updateData = { status_pengantaran: status };
  if (status === "MENUJU_LOKASI") updateData.waktu_mulai = new Date();
  if (status === "SELESAI") updateData.waktu_selesai = new Date();

  const updated = await prisma.pengantaran.update({
    where: { id_pengantaran },
    data: updateData,
  });
  return updated;
};

const updateBuktiFoto = async (id_user, id_pengantaran, bukti_foto) => {
  const { id_kurir } = await getKurirFromUser(id_user);

  const pengantaran = await prisma.pengantaran.findFirst({
    where: { id_pengantaran, id_kurir },
  });
  if (!pengantaran) throw new Error("Pengantaran tidak ditemukan");

  const updated = await prisma.pengantaran.update({
    where: { id_pengantaran },
    data: { bukti_foto },
  });
  return updated;
};

module.exports = {
  getProfile,
  updateProfile,
  getPengantaranList,
  getPengantaranById,
  updateStatusPengantaran,
  updateBuktiFoto,
};
