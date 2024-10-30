import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const SupplierSelect = ({ control, onSupplierChange }) => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/suppliers');
        setSuppliers(response.data.suppliers);
      } catch (error) {
        console.error('Error fetching suppliers', error);
      }
    };

    fetchSuppliers();
  }, []);

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>Supplier</InputLabel>
      <Controller
        name="supplierId"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select
            {...field}
            onChange={(e) => {
              field.onChange(e); 
              onSupplierChange(e.target.value); 
            }}
          >
            {suppliers.map((supplier) => (
              <MenuItem key={supplier._id} value={supplier._id}>
                {supplier.supplierName}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default SupplierSelect;
