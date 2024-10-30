const express = require('express');
const router = express.Router();
const supplierController = require("../controllers/supplier.controller");



router.post('/suppliers', supplierController.createSupplier);
router.get('/suppliers', supplierController.getSuppliers);


module.exports = router;
