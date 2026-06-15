const router = require("express").Router();
const transaksiController = require("../controllers/transaksi.controller");
const authenticate = require("../middleware/authenticate");

router.use(authenticate);

// GET /transaksi/:id_transaksi  — customer lihat miliknya, admin lihat outlet
router.get("/:id_transaksi", transaksiController.getTransaksiById);

module.exports = router;
