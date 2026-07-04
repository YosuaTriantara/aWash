const adminService = require("../services/admin.service");
const { successResponse, errorResponse } = require("../utils/response");

// ─── Profile ──────────────────────────────────────────────────────────────────

const getProfile = async (req, res) => {
  try {
    const result = await adminService.getProfile(req.user.id_user);
    return successResponse(res, result, "Profile berhasil diambil");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const updateProfile = async (req, res) => {
  try {
    const result = await adminService.updateProfile(req.user.id_user, req.body);
    return successResponse(res, result, "Profile berhasil diupdate");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

// ─── Outlet ───────────────────────────────────────────────────────────────────

const getOutlet = async (req, res) => {
  try {
    const result = await adminService.getOutlet(req.user.id_user);
    return successResponse(res, result, "Data outlet berhasil diambil");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const updateOutlet = async (req, res) => {
  try {
    const result = await adminService.updateOutlet(req.user.id_user, req.body);
    return successResponse(res, result, "Outlet berhasil diupdate");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

// ─── Kurir ────────────────────────────────────────────────────────────────────

const getKurirList = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status || null;
    const result = await adminService.getKurirList(req.user.id_user, {
      page,
      limit,
      status,
    });
    return successResponse(res, result, "Daftar kurir berhasil diambil");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const getKurirById = async (req, res) => {
  try {
    const result = await adminService.getKurirById(
      req.user.id_user,
      req.params.id_kurir,
    );
    return successResponse(res, result, "Data kurir berhasil diambil");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const createKurir = async (req, res) => {
  try {
    const result = await adminService.createKurir(req.user.id_user, req.body);
    return successResponse(res, result, "Kurir berhasil dibuat", 201);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const updateKurir = async (req, res) => {
  try {
    const result = await adminService.updateKurir(
      req.user.id_user,
      req.params.id_kurir,
      req.body,
    );
    return successResponse(res, result, "Kurir berhasil diupdate");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const toggleKurirStatus = async (req, res) => {
  try {
    const result = await adminService.toggleKurirStatus(
      req.user.id_user,
      req.params.id_kurir,
    );
    return successResponse(res, result, "Status kurir berhasil diubah");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

// ─── Slot Operasional ─────────────────────────────────────────────────────────

const getSlotList = async (req, res) => {
  try {
    const result = await adminService.getSlotList(req.user.id_user);
    return successResponse(res, result, "Daftar slot berhasil diambil");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const createSlot = async (req, res) => {
  try {
    const result = await adminService.createSlot(req.user.id_user, req.body);
    return successResponse(res, result, "Slot berhasil dibuat", 201);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const updateSlot = async (req, res) => {
  try {
    const result = await adminService.updateSlot(
      req.user.id_user,
      req.params.id_slot,
      req.body,
    );
    return successResponse(res, result, "Slot berhasil diupdate");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const deleteSlot = async (req, res) => {
  try {
    await adminService.deleteSlot(req.user.id_user, req.params.id_slot);
    return successResponse(res, null, "Slot berhasil dihapus");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const toggleSlot = async (req, res) => {
  try {
    const result = await adminService.toggleSlot(
      req.user.id_user,
      req.params.id_slot,
    );
    return successResponse(res, result, "Status slot berhasil diubah");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

// ─── Layanan ──────────────────────────────────────────────────────────────────

const createLayanan = async (req, res) => {
  try {
    const result = await adminService.createLayanan(req.body);
    return successResponse(res, result, "Layanan berhasil dibuat", 201);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const updateLayanan = async (req, res) => {
  try {
    const result = await adminService.updateLayanan(
      req.params.id_layanan,
      req.body,
    );
    return successResponse(res, result, "Layanan berhasil diupdate");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const toggleLayanan = async (req, res) => {
  try {
    const result = await adminService.toggleLayanan(req.params.id_layanan);
    return successResponse(res, result, "Status layanan berhasil diubah");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

// ─── Pemesanan ────────────────────────────────────────────────────────────────

const getPemesananList = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { status, tanggal_mulai, tanggal_akhir } = req.query;
    const result = await adminService.getPemesananList(req.user.id_user, {
      page,
      limit,
      status: status || null,
      tanggal_mulai: tanggal_mulai || null,
      tanggal_akhir: tanggal_akhir || null,
    });
    return successResponse(res, result, "Daftar pemesanan berhasil diambil");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const getPemesananById = async (req, res) => {
  try {
    const result = await adminService.getPemesananById(
      req.user.id_user,
      req.params.id_pemesanan,
    );
    return successResponse(res, result, "Data pemesanan berhasil diambil");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const verifikasiPesanan = async (req, res) => {
  try {
    const result = await adminService.verifikasiPesanan(
      req.user.id_user,
      req.params.id_pemesanan,
      req.body
    );

    return successResponse(res, result, "Pesanan berhasil diverifikasi");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const updateStatusPesanan = async (req, res) => {
  try {
    const result = await adminService.updateStatusPesanan(
      req.user.id_user,
      req.params.id_pemesanan,
      req.body.status,
    );
    return successResponse(res, result, "Status pesanan berhasil diupdate");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

// ─── Pengantaran ──────────────────────────────────────────────────────────────

const getPengantaranList = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { status } = req.query;
    const result = await adminService.getPengantaranList(req.user.id_user, {
      page,
      limit,
      status: status || null,
    });
    return successResponse(res, result, "Daftar pengantaran berhasil diambil");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const getPengantaranById = async (req, res) => {
  try {
    const result = await adminService.getPengantaranById(
      req.user.id_user,
      req.params.id_pengantaran,
    );
    return successResponse(res, result, "Detail pengantaran berhasil diambil");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const createPengantaran = async (req, res) => {
  try {
    const result = await adminService.createPengantaran(
      req.user.id_user,
      req.body,
    );
    return successResponse(res, result, "Pengantaran berhasil dibuat", 201);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const assignKurir = async (req, res) => {
  try {
    const result = await adminService.assignKurir(
      req.user.id_user,
      req.params.id_pengantaran,
      req.body.id_kurir,
    );
    return successResponse(res, result, "Kurir berhasil ditugaskan");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

// ─── Transaksi ────────────────────────────────────────────────────────────────

const getTransaksiList = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { status, tanggal_mulai, tanggal_akhir } = req.query;
    const result = await adminService.getTransaksiList(req.user.id_user, {
      page,
      limit,
      status: status || null,
      tanggal_mulai: tanggal_mulai || null,
      tanggal_akhir: tanggal_akhir || null,
    });
    return successResponse(res, result, "Daftar transaksi berhasil diambil");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const createTransaksi = async (req, res) => {
  try {
    const result = await adminService.createTransaksi(
      req.user.id_user,
      req.body,
    );
    return successResponse(res, result, "Transaksi berhasil dibuat", 201);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const updateStatusTransaksi = async (req, res) => {
  try {
    const result = await adminService.updateStatusTransaksi(
      req.user.id_user,
      req.params.id_transaksi,
      req.body.status,
    );
    return successResponse(res, result, "Status transaksi berhasil diupdate");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
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
  getPengantaranById,
  createPengantaran,
  assignKurir,
  getTransaksiList,
  createTransaksi,
  updateStatusTransaksi,
};
