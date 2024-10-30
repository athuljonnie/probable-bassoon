// src/components/ItemList.js
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axios from 'axios';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/items'); 
        setItems(response.data.items);
      } catch (err) {
        setError('Error fetching items');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item No</TableCell>
            <TableCell>Item Supplier</TableCell>
            <TableCell>Item Name</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Stock Unit</TableCell>
            <TableCell>Unit Price</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.itemNo}</TableCell>
              <TableCell>{item.supplier.supplierName}</TableCell>
              <TableCell>{item.itemName}</TableCell>
              <TableCell>{item.brand}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.stockUnit}</TableCell>
              <TableCell>{item.unitPrice}</TableCell>
              <TableCell>{item.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemList;