const transaksiService = require("../services/transaksi.service");
const { successResponse, errorResponse } = require("../utils/response");

const getTransaksiById = async (req, res) => {
  try {
    const result = await transaksiService.getTransaksiById(
      req.params.id_transaksi,
      req.user.id_user,
      req.user.role,
    );
    return successResponse(res, result, "Detail transaksi berhasil diambil");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

module.exports = { getTransaksiById };
