// src/components/PurchaseOrderForm.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, Box } from '@mui/material';
import SupplierSelect from './SupplierSelect';
import ItemSelect from './ItemSelect';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setSupplier, clearItems } from '../../redux/slices/purchaseOrderSlice';
import { addSelectedItems, clearSelectedItems } from '../../redux/slices/selectedItemSlice';

const PurchaseOrderForm = () => {
  const { control, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const selectedItems = useSelector(state => state.selectedItems.items);
  const selectedSupplierId = useSelector(state => state.purchaseOrder.selectedSupplierId);
  const onSubmit = async (data) => {
    try {
      const purchaseOrderData = {
        orderDate: new Date(),
        supplier: selectedSupplierId,
        itemList: selectedItems,
        itemTotal: calculateItemTotal(),
        discount: calculateDiscount(),
        netAmount: calculateNetAmount(),
      };

    const response =  await axios.post('http://localhost:7000/api/purchase-orders', purchaseOrderData);
      alert('Purchase Order created successfully!');  
      reset(); 
      dispatch(clearSelectedItems()); 
    } catch (error) {
      console.error('Error creating purchase order', error);
    }
  };

  const calculateItemTotal = () => {
    return selectedItems.reduce((total, item) => {
      const amount = item.unitPrice || 0; 
      return total + amount;
    }, 0);
  };
  
  const calculateDiscount = () => {
    return selectedItems.reduce((total, item) => {
      const discount = item.discount || 0; 
      return total + discount;
    }, 0);
  };
  
  const calculateNetAmount = () => {
    const itemTotal = calculateItemTotal();
    const discount = calculateDiscount();
    return itemTotal - discount; 
  };
  
  const addItemsToList = (selectedItems) => {
    dispatch(addSelectedItems(selectedItems)); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4">Create Purchase Order</Typography>
      <Box marginBottom={2}>
        <SupplierSelect control={control} onSupplierChange={(id) => dispatch(setSupplier(id))} />
      </Box>
      <Box marginBottom={2}>
        <ItemSelect control={control} supplierId={selectedSupplierId} onAddItems={addItemsToList} />
      </Box>
      <Box marginBottom={2}>
        <Button type="submit" variant="contained" color="primary">
          Create Purchase Order
        </Button>
      </Box>
    </form>
  );
};

export default PurchaseOrderForm;
