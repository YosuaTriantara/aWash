const router = require('express').Router()
const adminController = require('../controllers/admin.controller')
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')
const validate = require('../middleware/validate')
const { updateAdminSchema } = require('../validators/auth.validator')

router.use(authenticate, authorize('ADMIN'))

// GET /admin/profile
router.get('/profile', adminController.getProfile)

// PUT /admin/profile
router.put('/profile', validate(updateAdminSchema), adminController.updateProfile)

module.exports = router