import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, MenuItem, Typography, Paper } from '@mui/material';
import axios from 'axios';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const SupplierForm = ({ addSupplier }) => {
  const schema = Yup.object().shape({
    supplierName: Yup.string().required('Supplier name is required'),
    address: Yup.string().required('Address is required'),
    taxNo: Yup.string().required('Tax number is required'),
    country: Yup.string().required('Country is required'),
    mobileNo: Yup.string().required('Mobile number is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    status: Yup.string().required('Status is required'),
  });

  const { reset, register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:7000/api/suppliers', data);
      reset();       
      alert('Supplier created successfully!'); 
      addSupplier(response.data.supplier);
    } catch (error) {
      console.error('Error creating supplier', error);
      alert('Error creating supplier: ' + error.message);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 500, margin: 'auto', borderRadius: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Add Supplier
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column" }}>
        <TextField
          {...register('supplierName')}
          label="Supplier Name"
          error={!!errors.supplierName}
          helperText={errors.supplierName?.message}
          margin="normal"
        />
        <TextField
          {...register('address')}
          label="Address"
          error={!!errors.address}
          helperText={errors.address?.message}
          margin="normal"
        />
        <TextField
          {...register('taxNo')}
          label="TAX No"
          error={!!errors.taxNo}
          helperText={errors.taxNo?.message}
          margin="normal"
        />
        <TextField
          {...register('country')}
          label="Country"
          select
          error={!!errors.country}
          helperText={errors.country?.message}
          margin="normal"
        >
          <MenuItem value="India">India</MenuItem>
          <MenuItem value="USA">USA</MenuItem>
        </TextField>
        <TextField
          {...register('mobileNo')}
          label="Mobile No"
          error={!!errors.mobileNo}
          helperText={errors.mobileNo?.message}
          margin="normal"
        />
        <TextField
          {...register('email')}
          label="Email"
          error={!!errors.email}
          helperText={errors.email?.message}
          margin="normal"
        />
        <TextField
          {...register('status')}
          label="Status"
          select
          error={!!errors.status}
          helperText={errors.status?.message}
          margin="normal"
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
          <MenuItem value="Blocked">Blocked</MenuItem>
        </TextField>
        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: 2 }}>
          Add Supplier
        </Button>
      </form>
    </Paper>
  );
};

export default SupplierForm;
