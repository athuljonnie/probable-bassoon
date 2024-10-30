const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  itemNo: {
    type: String,
    required: true
  },
  itemName: {
    type: String,
    required: true
  },
  stockUnit: {
    type: String,
    required: true
  },
  unitPrice: {
    type: Number,
    required: true,
    min: [0, 'Unit price cannot be negative']
  },
  packingUnit: {
    type: String,
    enum: ['Carton', 'Pallet', 'Crate', 'Bag'], 
    required: true
  },
  orderQty: {
    type: Number,
    required: true,
    min: [1, 'Order quantity must be at least 1']
  },
  itemAmount: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'Discount cannot be negative']
  },
  netAmount: {
    type: Number,
    required: true
  }
});

// Define Purchase Order Schema
const purchaseOrderSchema = new mongoose.Schema({
  orderNo: {
    type: String,
    required: true,
    unique: true,
    default: () => `ORD-${Math.floor(1000 + Math.random() * 9000)}` 
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true
  },
  itemTotal: {
    type: Number,
    required: true,
    default: 0
  },
  discountTotal: {
    type: Number,
    required: true,
    default: 0
  },
  netAmount: {
    type: Number,
    required: true,
    default: 0
  },
  items: [orderItemSchema] 
}, {
  timestamps: true
});

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema);
