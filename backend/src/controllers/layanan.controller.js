const layananService = require("../services/layanan.service");
const { successResponse, errorResponse } = require("../utils/response");

const getAllLayanan = async (req, res) => {
  try {
    const { page, limit, kategori } = req.query;
    const result = await layananService.getAllLayanan({
      page,
      limit,
      kategori,
    });
    return successResponse(res, result, "Data layanan berhasil diambil");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const getLayananById = async (req, res) => {
  try {
    const result = await layananService.getLayananById(req.params.id_layanan);
    return successResponse(res, result, "Detail layanan berhasil diambil");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const createLayanan = async (req, res) => {
  try {
    const result = await layananService.createLayanan(req.body);
    return successResponse(res, result, "Layanan berhasil dibuat", 201);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const updateLayanan = async (req, res) => {
  try {
    const result = await layananService.updateLayanan(
      req.params.id_layanan,
      req.body,
    );
    return successResponse(res, result, "Layanan berhasil diperbarui");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const toggleLayanan = async (req, res) => {
  try {
    const result = await layananService.toggleLayanan(req.params.id_layanan);
    return successResponse(res, result, "Status layanan berhasil diubah");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

module.exports = {
  getAllLayanan,
  getLayananById,
  createLayanan,
  updateLayanan,
  toggleLayanan,
};
