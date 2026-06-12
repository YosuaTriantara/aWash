const router = require('express').Router()
const customerController = require('../controllers/customer.controller')
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')
const validate = require('../middleware/validate')
const { updateCustomerSchema } = require('../validators/auth.validator')

router.use(authenticate, authorize('CUSTOMER'))

// GET /customer/profile
router.get('/profile', customerController.getProfile)

// PUT /customer/profile
router.put('/profile', validate(updateCustomerSchema), customerController.updateProfile)

module.exports = router