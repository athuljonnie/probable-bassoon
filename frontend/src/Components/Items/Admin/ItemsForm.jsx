import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, MenuItem } from '@mui/material';
import axios from 'axios';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const ItemForm = () => {
  const [suppliers, setSuppliers] = useState([]);

  const schema = Yup.object().shape({
    itemName: Yup.string().required('Item name is required'),
    inventoryLocation: Yup.string().required('Inventory location is required'),
    brand: Yup.string().required('Brand is required'),
    category: Yup.string().required('Category is required'),
    supplier: Yup.string().required('Supplier is required'),
    stockUnit: Yup.string().required('Stock unit is required'),
    unitPrice: Yup.number().positive().required('Unit price is required'),
    itemImages: Yup.array().min(1, 'At least one image is required'),
    status: Yup.string().required('Status is required'),
    packingUnit: Yup.string().required('Packing unit is required'), // New validation
  });

  const { reset, register, handleSubmit, formState: { errors } } = useForm({
    // resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/suppliers');
        setSuppliers(response.data.suppliers || []);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };
    fetchSuppliers();
  }, []);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('itemName', data.itemName);
      formData.append('inventoryLocation', data.inventoryLocation);
      formData.append('brand', data.brand);
      formData.append('category', data.category);
      formData.append('supplier', data.supplier);
      formData.append('stockUnit', data.stockUnit);
      formData.append('unitPrice', data.unitPrice);
      formData.append('status', data.status);
      formData.append('packingUnit', data.packingUnit); 

      if (data.itemImages.length > 0) {
        for (let i = 0; i < data.itemImages.length; i++) {
          formData.append('itemImages', data.itemImages[i]);
        }
      }

      const response = await axios.post('http://localhost:7000/api/item', formData);
      alert("Item added");
      reset();
    } catch (error) {
      console.error('Error creating item', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "20px" }}>
      <TextField
        {...register('itemName')}
        label="Item Name"
        error={!!errors.itemName}
        helperText={errors.itemName?.message}
      />
      <TextField
        {...register('inventoryLocation')}
        label="Inventory Location"
        error={!!errors.inventoryLocation}
        helperText={errors.inventoryLocation?.message}
      />
      <TextField
        {...register('brand')}
        label="Brand"
        error={!!errors.brand}
        helperText={errors.brand?.message}
      />
      <TextField
        {...register('category')}
        label="Category"
        error={!!errors.category}
        helperText={errors.category?.message}
      />
      <TextField
        {...register('supplier')}
        label="Supplier"
        select
        error={!!errors.supplier}
        helperText={errors.supplier?.message}
      >
        {suppliers
          .filter(supplier => supplier.status === 'Active')
          .map((supplier) => (
            <MenuItem key={supplier._id} value={supplier._id}>
              {supplier.supplierName}
            </MenuItem>
          ))}
      </TextField>
      <TextField
        {...register('stockUnit')}
        label="Stock Unit"
        select
        error={!!errors.stockUnit}
        helperText={errors.stockUnit?.message}
      >
        <MenuItem value="Box">Box</MenuItem>
        <MenuItem value="Piece">Piece</MenuItem>
      </TextField>
      <TextField
        {...register('unitPrice')}
        label="Unit Price"
        type="number"
        error={!!errors.unitPrice}
        helperText={errors.unitPrice?.message}
      />
      <input
        type="file"
        {...register("itemImages")}
        multiple
      />
      <TextField
        {...register('status')}
        label="Status"
        select
        error={!!errors.status}
        helperText={errors.status?.message}
      >
        <MenuItem value="Enabled">Enabled</MenuItem>
        <MenuItem value="Disabled">Disabled</MenuItem>
      </TextField>

      {/* New Packing Unit Field */}
      <TextField
        {...register('packingUnit')}
        label="Packing Unit"
        select
        error={!!errors.packingUnit}
        helperText={errors.packingUnit?.message}
      >
        <MenuItem value="Carton">Carton</MenuItem>
        <MenuItem value="Pallet">Pallet</MenuItem>
        <MenuItem value="Crate">Crate</MenuItem>
        <MenuItem value="Bag">Bag</MenuItem>
      </TextField>

      <Button type="submit" variant="contained" color="primary">Add Item</Button>
    </form>
  );
};

export default ItemForm;
