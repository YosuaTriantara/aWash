const { errorResponse } = require('../utils/response')

const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      const message = result.error.issues
        .map(e => e.message)
        .join(', ')

      return errorResponse(res, message, 400)
    }

    req.body = result.data
    next()
  }
}

module.exports = validate