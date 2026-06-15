const prisma = require("../config/database");

const getAllOutlet = async ({ page = 1, limit = 10 } = {}) => {
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  const [data, total] = await Promise.all([
    prisma.outlet.findMany({
      skip,
      take: limitNum,
      orderBy: { nama_outlet: "asc" },
    }),
    prisma.outlet.count(),
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

const getOutletById = async (id_outlet) => {
  const outlet = await prisma.outlet.findUnique({
    where: { id_outlet },
  });
  if (!outlet) throw new Error("Outlet tidak ditemukan");
  return outlet;
};

const updateOutlet = async (id_outlet, data) => {
  const existing = await prisma.outlet.findUnique({ where: { id_outlet } });
  if (!existing) throw new Error("Outlet tidak ditemukan");

  const outlet = await prisma.outlet.update({
    where: { id_outlet },
    data,
  });
  return outlet;
};

const getSlotsByOutlet = async (id_outlet, jenis_pengantaran = null) => {
  const where = {
    id_outlet,
    is_active: true,
  };
  if (jenis_pengantaran) where.jenis_pengantaran = jenis_pengantaran;

  const slots = await prisma.slotOperasional.findMany({
    where,
    orderBy: [{ hari: "asc" }, { jam_mulai: "asc" }],
  });
  return slots;
};

const createSlot = async (id_outlet, data) => {
  const outlet = await prisma.outlet.findUnique({ where: { id_outlet } });
  if (!outlet) throw new Error("Outlet tidak ditemukan");

  const slot = await prisma.slotOperasional.create({
    data: {
      id_outlet,
      ...data,
    },
  });
  return slot;
};

const updateSlot = async (id_slot, id_outlet, data) => {
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

const deleteSlot = async (id_slot, id_outlet) => {
  const existing = await prisma.slotOperasional.findFirst({
    where: { id_slot, id_outlet },
  });
  if (!existing) throw new Error("Slot tidak ditemukan");

  await prisma.slotOperasional.delete({
    where: { id_slot },
  });
};

const toggleSlot = async (id_slot, id_outlet) => {
  const existing = await prisma.slotOperasional.findFirst({
    where: { id_slot, id_outlet },
  });
  if (!existing) throw new Error("Slot tidak ditemukan");

  const slot = await prisma.slotOperasional.update({
    where: { id_slot },
    data: { is_active: !existing.is_active },
  });
  return slot;
};

module.exports = {
  getAllOutlet,
  getOutletById,
  updateOutlet,
  getSlotsByOutlet,
  createSlot,
  updateSlot,
  deleteSlot,
  toggleSlot,
};
