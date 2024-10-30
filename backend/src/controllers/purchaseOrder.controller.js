const PurchaseOrder = require('../models/PurchaseOrder');
const Item = require('../models/Item');

const createPurchaseOrder = async (req, res) => {
  try {
    const {
      supplier,
      itemList,
      discount = 0 
    } = req.body;

    if (!supplier || !itemList || itemList.length === 0) {
      return res.status(400).json({ error: 'Please provide supplier and item list.' });
    }

    let itemTotal = 0;
    const items = itemList.map(item => {
      const itemAmount = item.orderQty * item.unitPrice;
      itemTotal += itemAmount;

      return {
        item: item._id,
        itemNo: item.itemNo,
        itemName: item.itemName,
        stockUnit: item.stockUnit,
        unitPrice: item.unitPrice,
        packingUnit: item.packingUnit,
        orderQty: item.orderQty,
        itemAmount,
        discount: item.discount || 0,
        netAmount: itemAmount - (item.discount || 0)
      };
    });

    const netAmount = itemTotal - discount;

    const newOrder = new PurchaseOrder({
      supplier,
      itemTotal,
      discountTotal: discount,
      netAmount,
      items 
    });

    await newOrder.save();

    return res.status(201).json({
      message: 'Purchase order created successfully',
      purchaseOrder: newOrder
    });

  } catch (error) {
    console.error('Error creating purchase order:', error);
    res.status(500).json({ error: 'Server error while creating purchase order' });
  }
};


const getAllPurchaseOrders = async (req, res) => {
  try {
    const orders = await PurchaseOrder.find()
      .populate('supplier') 
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching purchase orders:', error);
    res.status(500).json({ error: 'Server error while fetching purchase orders' });
  }
};

module.exports = {
  createPurchaseOrder,
  getAllPurchaseOrders,
};

