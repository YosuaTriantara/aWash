const router = require('express').Router()
const layananController = require('../controllers/layanan.controller')
const authenticate = require('../middleware/authenticate')

// semua role bisa akses, hanya butuh login
router.use(authenticate)

// GET /layanan
router.get('/', layananController.getAllLayanan)

// GET /layanan/:id_layanan
router.get('/:id_layanan', layananController.getLayananById)

module.exports = router