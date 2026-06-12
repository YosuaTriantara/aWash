const authService = require('../services/auth.service')
const { successResponse, errorResponse } = require('../utils/response')

const register = async (req, res) => {
  try {
    const result = await authService.register(req.body)
    return successResponse(res, result, 'Registrasi berhasil', 201)
  } catch (error) {
    return errorResponse(res, error.message, 400)
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const result = await authService.login(email, password)
    return successResponse(res, result, 'Login berhasil')
  } catch (error) {
    return errorResponse(res, error.message, 401)
  }
}

const getMe = async (req, res) => {
  try {
    const result = await authService.getMe(req.user.id_user, req.user.role)
    return successResponse(res, result, 'Data user berhasil diambil')
  } catch (error) {
    return errorResponse(res, error.message, 400)
  }
}

module.exports = { register, login, getMe }