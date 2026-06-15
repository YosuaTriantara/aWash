const pemesananService = require("../services/pemesanan.service");
const { successResponse, errorResponse } = require("../utils/response");

const createPemesanan = async (req, res) => {
  try {
    const result = await pemesananService.createPemesanan(
      req.user.id_user,
      req.body,
    );
    return successResponse(res, result, "Pemesanan berhasil dibuat", 201);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const getPemesananList = async (req, res) => {
  try {
    const { page, limit, status, tanggal_mulai, tanggal_akhir } = req.query;
    const result = await pemesananService.getPemesananByCustomer(
      req.user.id_user,
      {
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 10,
        status: status || null,
        tanggal_mulai: tanggal_mulai || null,
        tanggal_akhir: tanggal_akhir || null,
      },
    );
    return successResponse(res, result, "Daftar pemesanan berhasil diambil");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const getPemesananById = async (req, res) => {
  try {
    const result = await pemesananService.getPemesananById(
      req.params.id_pemesanan,
      req.user.id_user,
    );
    return successResponse(res, result, "Detail pemesanan berhasil diambil");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const cancelPemesanan = async (req, res) => {
  try {
    const result = await pemesananService.cancelPemesanan(
      req.params.id_pemesanan,
      req.user.id_user,
    );
    return successResponse(res, result, "Pemesanan berhasil dibatalkan");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const getRiwayat = async (req, res) => {
  try {
    const result = await pemesananService.getRiwayat(
      req.params.id_pemesanan,
      req.user.id_user,
    );
    return successResponse(res, result, "Riwayat pesanan berhasil diambil");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

module.exports = {
  createPemesanan,
  getPemesananList,
  getPemesananById,
  cancelPemesanan,
  getRiwayat,
};
