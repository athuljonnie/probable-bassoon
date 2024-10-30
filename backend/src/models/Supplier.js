const mongoose = require('mongoose');

// Define Supplier schema
const supplierSchema = new mongoose.Schema({
  supplierNo: {
    type: String,
    required: true,
    unique: true,
    default: () => `SUP-${Math.floor(1000 + Math.random() * 9000)}` 
  },
  supplierName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  taxNo: {
    type: String,
    required: true,
    unique: true,
  },
  country: {
    type: String,
    enum: ['India', 'USA', 'UK', 'Australia', 'Canada'],
    required: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Blocked'],
    default: 'Active'
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Supplier', supplierSchema);
