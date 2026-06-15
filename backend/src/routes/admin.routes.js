const router = require("express").Router();
const adminController = require("../controllers/admin.controller");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const validate = require("../middleware/validate");

const { updateAdminSchema } = require("../validators/auth.validator");
const {createKurirSchema, updateKurirByAdminSchema,} = require("../validators/kurir.validator");
const {createLayananSchema,updateLayananSchema,} = require("../validators/layanan.validator");
const {updateOutletSchema,createSlotSchema,updateSlotSchema,} = require("../validators/outlet.validator");
const {verifikasiPesananSchema,updateStatusPesananSchema,} = require("../validators/pemesanan.validator");
const {createPengantaranSchema,assignKurirSchema,} = require("../validators/pengantaran.validator");
const {createTransaksiSchema,updateStatusTransaksiSchema,} = require("../validators/transaksi.validator");

router.use(authenticate, authorize("ADMIN"));

// ─── Profile ──────────────────────────────────────────────────────────────────

router.get("/profile", adminController.getProfile);
router.put("/profile",validate(updateAdminSchema),adminController.updateProfile,);

// ─── Outlet ───────────────────────────────────────────────────────────────────

router.get("/outlet", adminController.getOutlet);
router.put(
  "/outlet",validate(updateOutletSchema),adminController.updateOutlet,);

// ─── Kurir ────────────────────────────────────────────────────────────────────

router.get("/kurir", adminController.getKurirList);
router.post("/kurir", validate(createKurirSchema), adminController.createKurir);
router.get("/kurir/:id_kurir", adminController.getKurirById);
router.put("/kurir/:id_kurir",validate(updateKurirByAdminSchema),adminController.updateKurir,);
router.patch("/kurir/:id_kurir/status", adminController.toggleKurirStatus);

// ─── Layanan ──────────────────────────────────────────────────────────────────

router.post("/layanan",validate(createLayananSchema),adminController.createLayanan,);
router.put("/layanan/:id_layanan",validate(updateLayananSchema),adminController.updateLayanan,);
router.patch("/layanan/:id_layanan/toggle", adminController.toggleLayanan);

// ─── Slot Operasional ─────────────────────────────────────────────────────────

router.get("/slot", adminController.getSlotList);
router.post("/slot", validate(createSlotSchema), adminController.createSlot);
router.put("/slot/:id_slot",validate(updateSlotSchema),adminController.updateSlot,);
router.delete("/slot/:id_slot", adminController.deleteSlot);
router.patch("/slot/:id_slot/toggle", adminController.toggleSlot);

// ─── Pemesanan ────────────────────────────────────────────────────────────────

router.get("/pemesanan", adminController.getPemesananList);
router.get("/pemesanan/:id_pemesanan", adminController.getPemesananById);
router.patch("/pemesanan/:id_pemesanan/verifikasi",validate(verifikasiPesananSchema),adminController.verifikasiPesanan,);
router.patch("/pemesanan/:id_pemesanan/status",validate(updateStatusPesananSchema),adminController.updateStatusPesanan,);

// ─── Pengantaran ──────────────────────────────────────────────────────────────

router.get("/pengantaran", adminController.getPengantaranList);
router.post("/pengantaran", validate(createPengantaranSchema),adminController.createPengantaran,);
router.patch("/pengantaran/:id_pengantaran/assign",validate(assignKurirSchema),adminController.assignKurir,);

// ─── Transaksi ────────────────────────────────────────────────────────────────

router.get("/transaksi", adminController.getTransaksiList);
router.post("/transaksi",validate(createTransaksiSchema),adminController.createTransaksi,);
router.patch("/transaksi/:id_transaksi/status",validate(updateStatusTransaksiSchema),adminController.updateStatusTransaksi,);

module.exports = router;
