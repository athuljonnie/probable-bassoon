// src/components/SupplierList.js
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axios from 'axios';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const apiKey = "http://localhost:7000/api"

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(`${apiKey}/suppliers`);
        setSuppliers(response.data.suppliers);
      } catch (err) {
        setError('Error fetching suppliers');
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Typography variant="h6" align="center" sx={{ margin: 2 }}>
        Supplier List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Supplier No</strong></TableCell>
            <TableCell><strong>Supplier Name</strong></TableCell>
            <TableCell><strong>Address</strong></TableCell>
            <TableCell><strong>TAX No</strong></TableCell>
            <TableCell><strong>Country</strong></TableCell>
            <TableCell><strong>Mobile No</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {suppliers.map((supplier) => (
            <TableRow key={supplier._id}>
              <TableCell>{supplier.supplierNo}</TableCell>
              <TableCell>{supplier.supplierName}</TableCell>
              <TableCell>{supplier.address}</TableCell>
              <TableCell>{supplier.taxNo}</TableCell>
              <TableCell>{supplier.country}</TableCell>
              <TableCell>{supplier.mobileNo}</TableCell>
              <TableCell>{supplier.email}</TableCell>
              <TableCell>{supplier.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  
};

export default SupplierList;
