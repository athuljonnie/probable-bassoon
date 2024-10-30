const Supplier = require('../models/Supplier.js');

const createSupplier = async (req, res) => {
  try {
    const {
      supplierName,
      address,
      taxNo,
      country,
      mobileNo,
      email,
      status 
    } = req.body;
    if (!supplierName || !address || !taxNo || !country || !mobileNo || !email) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const newSupplier = new Supplier({
      supplierName,
      address,
      taxNo,
      country,
      mobileNo,
      email,
      status: status || 'Active' 
    });

    await newSupplier.save();

    res.status(201).json({
      message: 'Supplier created successfully',
      supplier: newSupplier
    });

  } catch (error) {
    console.error('Error creating supplier:', error);
    res.status(500).json({ error: 'Server error while creating supplier' });
  }
};


const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    
    res.status(200).json({
      message: "Suppliers fetched successfully",
      suppliers: suppliers
    });
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    res.status(500).json({ error: 'Server error while fetching suppliers' });
  }
};
module.exports = { createSupplier, getSuppliers };
