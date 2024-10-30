

const Item = require('../models/Item');

const ItemModel = require('../models/Item'); 

const createItem = async (req, res) => {
    const { itemName, inventoryLocation, brand, category, supplier, stockUnit, unitPrice, status, packingUnit } = req.body;
    const itemImages = req.files.map(file => file.path); 

    const newItem = new ItemModel({
        itemName,
        inventoryLocation,
        brand,
        category,
        supplier,
        stockUnit,
        unitPrice,
        packingUnit,
        itemImages, 
        status,
    });

    try {
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        console.error('Error saving item:', error);
        res.status(500).json({ error: 'Failed to save item' });
    }
};

const getItems = async (req, res) => {
  try {
    const items = await Item.find().populate('supplier');

    res.status(200).json({
      message: "Items fetched successfully",
      items: items
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Server error while fetching items' });
  }
};


const getItemsBySupplier = async (req, res) => {
  const { supplierId } = req.params; 
  try {
    const items = await Item.find({ supplier: supplierId }).populate('supplier');
    res.status(200).json({
      message: "Items fetched successfully",
      items: items,
    });
  } catch (error) {
    console.error('Error fetching items by supplier:', error);
    res.status(500).json({ error: 'Server error while fetching items by supplier' });
  }
};



module.exports = { createItem, getItems, getItemsBySupplier};
