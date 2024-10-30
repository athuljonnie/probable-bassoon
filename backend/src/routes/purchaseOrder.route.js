const express = require('express');
const router = express.Router();
const purchaseOrderController = require('../controllers/purchaseOrder.controller');



router.post('/purchase-orders',  purchaseOrderController.createPurchaseOrder);
router.get('/purchase-orders', purchaseOrderController.getAllPurchaseOrders);

module.exports = router;
