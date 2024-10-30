const express = require("express");
const router = express.Router();

router.use("/", require("./supplier.route"));
router.use("/", require("./item.route"));
router.use("/", require("./purchaseOrder.route"));
router.use("/", require("./admin.route"));


module.exports = router;
