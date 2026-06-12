const { verifyToken } = require('../utils/jwt')
const { errorResponse } = require('../utils/response')

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'Token tidak ditemukan', 401)
    }

    const token = authHeader.split(' ')[1]
    const decoded = verifyToken(token)

    // decoded berisi { id_user, role } yang disimpan saat login
    req.user = decoded
    next()
  } catch (error) {
    return errorResponse(res, 'Token tidak valid atau sudah expired', 401)
  }
}

module.exports = authenticate