const ulasanService = require("../services/ulasan.service");
const { successResponse, errorResponse } = require("../utils/response");

const createUlasan = async (req, res) => {
  try {
    const result = await ulasanService.createUlasan(req.user.id_user, req.body);
    return successResponse(res, result, "Ulasan berhasil dibuat", 201);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const getUlasan = async (req, res) => {
  try {
    const result = await ulasanService.getUlasanByPemesanan(
      req.params.id_pemesanan,
      req.user.id_user,
      req.user.role,
    );
    return successResponse(res, result, "Ulasan berhasil diambil");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

module.exports = { createUlasan, getUlasan };
