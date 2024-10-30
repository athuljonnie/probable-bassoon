const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemNo: {
    type: String,
    required: true,
    unique: true,
    default: () => `ITEM-${Math.floor(1000 + Math.random() * 9000)}` 
  },
  itemName: {
    type: String,
    required: true,
  },
  inventoryLocation: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier', 
    required: true
  },
  stockUnit: {
    type: String,
    enum: ['Piece', 'Box', 'Kg', 'Liter', 'Packet'], 
    required: true,
  },
  packingUnit: {
    type: String,
    enum: ['Carton', 'Pallet', 'Crate', 'Bag'],
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
    min: [0, 'Unit price cannot be negative']
  },
  itemImages: [
    {
      type: String 
    }
  ],
  status: {
    type: String,
    enum: ['Enabled', 'Disabled'],
    default: 'Enabled'
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Item', itemSchema);
