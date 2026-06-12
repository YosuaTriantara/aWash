const { errorResponse } = require('../utils/response')

const errorHandler = (err, req, res, next) => {
  console.error(err.stack)
  return errorResponse(res, err.message || 'Terjadi kesalahan pada server', 500)
}

module.exports = errorHandler