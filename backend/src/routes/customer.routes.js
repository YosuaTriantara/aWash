const router = require("express").Router();
const customerController = require("../controllers/customer.controller");
const pemesananController = require("../controllers/pemesanan.controller");
const ulasanController = require("../controllers/ulasan.controller");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const validate = require("../middleware/validate");
const { updateCustomerSchema } = require("../validators/auth.validator");
const { createPemesananSchema } = require("../validators/pemesanan.validator");
const { createUlasanSchema } = require("../validators/ulasan.validator");

router.use(authenticate, authorize("CUSTOMER"));

// ─── Profile ──────────────────────────────────────────────────────────────────

router.get("/profile", customerController.getProfile);
router.put("/profile", validate(updateCustomerSchema), customerController.updateProfile,);

// ─── Pemesanan ────────────────────────────────────────────────────────────────

router.post("/pemesanan", validate(createPemesananSchema), pemesananController.createPemesanan,);
router.get("/pemesanan", pemesananController.getPemesananList);
router.get("/pemesanan/:id_pemesanan", pemesananController.getPemesananById);
router.patch("/pemesanan/:id_pemesanan/cancel",pemesananController.cancelPemesanan,);
router.get("/pemesanan/:id_pemesanan/riwayat", pemesananController.getRiwayat);

// ─── Ulasan ───────────────────────────────────────────────────────────────────

router.post("/ulasan",validate(createUlasanSchema),ulasanController.createUlasan,);
router.get("/ulasan/:id_pemesanan", ulasanController.getUlasan);

module.exports = router;
