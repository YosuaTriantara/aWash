const router = require("express").Router();
const outletController = require("../controllers/outlet.controller");
const authenticate = require("../middleware/authenticate");

// Semua route butuh login, semua role bisa akses
router.use(authenticate);

// GET /outlet
router.get("/", outletController.getAllOutlet);

// GET /outlet/:id_outlet
router.get("/:id_outlet", outletController.getOutletById);

// GET /outlet/:id_outlet/slot?jenis=DIJEMPUT
router.get("/:id_outlet/slot", outletController.getSlotsByOutlet);

module.exports = router;
