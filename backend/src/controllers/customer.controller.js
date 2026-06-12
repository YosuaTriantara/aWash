const customerService = require('../services/customer.service')
const { successResponse, errorResponse } = require('../utils/response')

const getProfile = async (req, res) => {
  try {
    const result = await customerService.getProfile(req.user.id_user)
    return successResponse(res, result, 'Profile berhasil diambil')
  } catch (error) {
    return errorResponse(res, error.message, 400)
  }
}

const updateProfile = async (req, res) => {
  try {
    const result = await customerService.updateProfile(req.user.id_user, req.body)
    return successResponse(res, result, 'Profile berhasil diupdate')
  } catch (error) {
    return errorResponse(res, error.message, 400)
  }
}

module.exports = { getProfile, updateProfile }