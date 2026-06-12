const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const validate = require('../middleware/validate')
const { registerSchema, loginSchema } = require('../validators/auth.validator')

// POST /api/auth/register
router.post('/register', validate(registerSchema), authController.register)

// POST /api/auth/login
router.post('/login', validate(loginSchema), authController.login)

module.exports = router