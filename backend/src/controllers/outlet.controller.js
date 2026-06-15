const outletService = require("../services/outlet.service");
const { successResponse, errorResponse } = require("../utils/response");

const getAllOutlet = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const result = await outletService.getAllOutlet({ page, limit });
    return successResponse(res, result, "Data outlet berhasil diambil");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const getOutletById = async (req, res) => {
  try {
    const result = await outletService.getOutletById(req.params.id_outlet);
    return successResponse(res, result, "Detail outlet berhasil diambil");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const getSlotsByOutlet = async (req, res) => {
  try {
    const { id_outlet } = req.params;
    const { jenis } = req.query;
    const result = await outletService.getSlotsByOutlet(
      id_outlet,
      jenis || null,
    );
    return successResponse(
      res,
      result,
      "Data slot operasional berhasil diambil",
    );
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

module.exports = {
  getAllOutlet,
  getOutletById,
  getSlotsByOutlet,
};
