import * as XLSX from 'xlsx';

export const handleExportAllExcel = (purchaseOrders) => {
  const ws = XLSX.utils.json_to_sheet(
    purchaseOrders.map((order) => ({
      OrderNo: order.orderNo,
      Supplier: order.supplier.supplierName,
      OrderDate: new Date(order.orderDate).toLocaleDateString(),
      ItemTotal: order.itemTotal,
      DiscountTotal: order.discountTotal,
      NetAmount: order.netAmount,
      Items: order.items.map(item => `${item.itemName} (${item.unitPrice} x ${item.orderQty})`).join(', '),
    }))
  );

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Purchase Orders');
  XLSX.writeFile(wb, 'All_PurchaseOrders.xlsx');
};

export const handleExportIndividualExcel = (order) => {
  const ws = XLSX.utils.json_to_sheet([{
    OrderNo: order.orderNo,
    Supplier: order.supplier.supplierName,
    OrderDate: new Date(order.orderDate).toLocaleDateString(),
    ItemTotal: order.itemTotal,
    DiscountTotal: order.discountTotal,
    NetAmount: order.netAmount,
    Items: order.items.map(item => `${item.itemName} (${item.unitPrice} x ${item.orderQty})`).join(', '),
  }]);

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, `Order_${order.orderNo}`);
  XLSX.writeFile(wb, `Order_${order.orderNo}.xlsx`);
};
