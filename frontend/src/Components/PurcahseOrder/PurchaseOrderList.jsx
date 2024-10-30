// PurchaseOrderList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { handleExportAllExcel, handleExportIndividualExcel } from '../../utils/ExportToExcel';

const PurchaseOrderList = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);

  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/purchase-orders');
        setPurchaseOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching purchase orders:", error);
      }
    };
    fetchPurchaseOrders();
  }, []);

  const renderOrderItems = (items) => (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          <b>Item Name:</b> {item.itemName}<br />
          <b>Stock Unit:</b> {item.stockUnit}<br />
          <b>Unit Price:</b> ${item.unitPrice}<br />
          <b>Quantity:</b> {item.orderQty}<br />
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <h2 style={{ fontSize: "34px" }}>Purchase Order List</h2>
      <button onClick={() => handleExportAllExcel(purchaseOrders)}
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px 20px',
          marginTop: '20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
      >
        Download All Orders as Excel
      </button>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
        {purchaseOrders.map((order) => (
          <div
            key={order._id}
            style={{
              border: '1px solid #ddd',
              padding: '1rem',
              borderRadius: '8px',
              width: '300px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#fff',
            }}
          >
            <h3>Order No: {order.orderNo}</h3>
            <p><strong>Supplier:</strong> {order.supplier.supplierName}</p>
            <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
            <p><strong>Item Total:</strong> ${order.itemTotal}</p>
            <p><strong>Discount:</strong> ${order.discountTotal}</p>
            <p><strong>Net Amount:</strong> ${order.netAmount}</p>
            <div>
              <h4>Items:</h4>
              {renderOrderItems(order.items)}
            </div>
            <button
              onClick={() => handleExportIndividualExcel(order)}
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '10px 20px',
                marginTop: '20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              Download this Order as Excel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseOrderList;
