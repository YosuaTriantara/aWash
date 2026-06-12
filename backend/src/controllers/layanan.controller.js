const layananService = require('../services/layanan.service')
const { successResponse, errorResponse } = require('../utils/response')

const getAllLayanan = async (req, res) => {
  try {
    const result = await layananService.getAllLayanan()
    return successResponse(res, result, 'Data layanan berhasil diambil')
  } catch (error) {
    return errorResponse(res, error.message, 400)
  }
}

const getLayananById = async (req, res) => {
  try {
    const result = await layananService.getLayananById(req.params.id_layanan)
    return successResponse(res, result, 'Detail layanan berhasil diambil')
  } catch (error) {
    return errorResponse(res, error.message, 400)
  }
}

module.exports = { getAllLayanan, getLayananById }