import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addSelectedItems } from '../../redux/slices/selectedItemSlice';

const ItemSelect = ({ control, supplierId }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [quantities, setQuantities] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchItems = async () => {
      if (supplierId) {
        setLoading(true);
        setError('');
        try {
          const response = await axios.get(`http://localhost:7000/api/items/${supplierId}`);
          setItems(response.data.items);
        } catch (err) {
          setError('Failed to fetch items');
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchItems();
  }, [supplierId]);

  const handleAddItem = (item) => {

    const orderQty = Math.min(quantities[item._id] || 1, 1000);
    console.log(quantities[item._id])
    console.log(orderQty)
    const itemAmount = orderQty * item.unitPrice;
    const netAmount = itemAmount - (item.discount ? item.discount : 0);

    dispatch(addSelectedItems([{
      _id: item._id,
      ...item,
      orderQty: orderQty, 
      itemAmount,
      netAmount,
    }])); 
  };

  const handleQuantityChange = (itemId, value) => {
    const newValue = Math.min(Math.max(value, 1), 1000);
      console.log(newValue)
      console.log(itemId)
    setQuantities((prev) => ({
      ...prev,
      [itemId]: newValue,
    }));
  };

  return (
    <Box display="flex" flexDirection="column">
      {loading && <Typography>Loading items...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Box display="flex" flexWrap="wrap">
        {items
          .filter(item => item.status ==="Enabled") 
          .map((item) => (
            <Box item xs={12} sm={6} md={4} key={item._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{item.itemName}</Typography>
                  <Typography>Item No: {item.itemNo}</Typography>
                  <Typography>Price: ${item.unitPrice}</Typography>
                  <Typography> Stock Unit: {item.stockUnit}</Typography>
                  
                  <TextField
                    type="number"
                    value={quantities[item._id] || 1}
                    onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                    inputProps={{ min: 1 }} 
                    fullWidth
                    margin="normal"
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddItem(item)} 
                    fullWidth
                  >
                    Add to List
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default ItemSelect;
