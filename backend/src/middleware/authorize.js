const { errorResponse } = require('../utils/response')

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return errorResponse(res, 'Anda tidak memiliki akses', 403)
    }
    next()
  }
}

module.exports = authorize