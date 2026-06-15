const router = require("express").Router();
const kurirController = require("../controllers/kurir.controller");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const validate = require("../middleware/validate");
const { updateKurirSchema } = require("../validators/auth.validator");
const {
  updateStatusPengantaranSchema,
  updateBuktiSchema,
} = require("../validators/pengantaran.validator");

router.use(authenticate, authorize("KURIR"));

router.get("/profile", kurirController.getProfile);
router.put("/profile", validate(updateKurirSchema), kurirController.updateProfile,);

router.get("/pengantaran", kurirController.getPengantaranList);
router.get("/pengantaran/:id_pengantaran", kurirController.getPengantaranById);
router.patch("/pengantaran/:id_pengantaran/status", validate(updateStatusPengantaranSchema), kurirController.updateStatusPengantaran,);
router.patch("/pengantaran/:id_pengantaran/bukti", validate(updateBuktiSchema), kurirController.updateBuktiFoto,);

module.exports = router;
