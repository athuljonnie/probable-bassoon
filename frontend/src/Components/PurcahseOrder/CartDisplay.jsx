import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';
import { removeSelectedItem } from '../../redux/slices/selectedItemSlice'; 

const CartDisplay = () => {
  const dispatch = useDispatch();
  const itemList = useSelector((state) => state.selectedItems.items); 
  console.log(itemList,"'🎊")
  const handleRemove = (itemId) => {
    dispatch(removeSelectedItem(itemId));
  };

  return (
    <Box marginTop={4}>
      <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
        Items in Cart
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
        {itemList.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No items in the cart.
          </Typography>
        ) : (
          itemList.map((item) => (
            <Card key={item.id} sx={{ maxWidth: 300, boxShadow: 2, borderRadius: 2 }}>
              <CardMedia
                component="img"
                height="140"
                image={`http://localhost:7000/${item.itemImages[0]}`} 
                alt={item.itemName}
                sx={{ objectFit: 'cover', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {item.itemName}
                </Typography>
                <Typography variant="body2">Quantity: {item.orderQty}</Typography>
                <Typography variant="body2">Price: ${item.unitPrice.toFixed(2)}</Typography>
                <Typography variant="body2">Amount: ${item.itemAmount.toFixed(2)}</Typography>
              </CardContent>
              <Box display="flex" justifyContent="center" marginBottom={1}>
                <Button size="small" color="primary" onClick={() => handleRemove(item.id)}>
                  Remove
                </Button>
              </Box>
            </Card>
          ))
        )}
      </Box>
    </Box>
  );
};

export default CartDisplay;
