const router = require('express').Router()
const kurirController = require('../controllers/kurir.controller')
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')
const validate = require('../middleware/validate')
const { updateKurirSchema } = require('../validators/auth.validator')

router.use(authenticate, authorize('KURIR'))

// GET /kurir/profile
router.get('/profile', kurirController.getProfile)

// PUT /kurir/profile
router.put('/profile', validate(updateKurirSchema), kurirController.updateProfile)

module.exports = router