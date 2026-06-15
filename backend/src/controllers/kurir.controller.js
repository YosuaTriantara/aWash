const kurirService = require("../services/kurir.service");
const { successResponse, errorResponse } = require("../utils/response");

const getProfile = async (req, res) => {
  try {
    const result = await kurirService.getProfile(req.user.id_user);
    return successResponse(res, result, "Profile berhasil diambil");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const updateProfile = async (req, res) => {
  try {
    const result = await kurirService.updateProfile(req.user.id_user, req.body);
    return successResponse(res, result, "Profile berhasil diupdate");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const getPengantaranList = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status || null;
    const result = await kurirService.getPengantaranList(req.user.id_user, {
      page,
      limit,
      status,
    });
    return successResponse(res, result, "Daftar pengantaran berhasil diambil");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const getPengantaranById = async (req, res) => {
  try {
    const result = await kurirService.getPengantaranById(
      req.user.id_user,
      req.params.id_pengantaran,
    );
    return successResponse(res, result, "Detail pengantaran berhasil diambil");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const updateStatusPengantaran = async (req, res) => {
  try {
    const result = await kurirService.updateStatusPengantaran(
      req.user.id_user,
      req.params.id_pengantaran,
      req.body.status,
    );
    return successResponse(res, result, "Status pengantaran berhasil diupdate");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const updateBuktiFoto = async (req, res) => {
  try {
    const result = await kurirService.updateBuktiFoto(
      req.user.id_user,
      req.params.id_pengantaran,
      req.body.bukti_foto,
    );
    return successResponse(res, result, "Bukti foto berhasil diupdate");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getPengantaranList,
  getPengantaranById,
  updateStatusPengantaran,
  updateBuktiFoto,
};
