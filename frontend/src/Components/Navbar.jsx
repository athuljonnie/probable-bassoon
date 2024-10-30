import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';

const Navbar = () => {
  const [anchorElSuppliers, setAnchorElSuppliers] = useState(null);
  const [anchorElItems, setAnchorElItems] = useState(null);

  const handleOpenSuppliersMenu = (event) => {
    setAnchorElSuppliers(event.currentTarget);
  };
  
  const handleCloseSuppliersMenu = () => {
    setAnchorElSuppliers(null);
  };

  const handleOpenItemsMenu = (event) => {
    setAnchorElItems(event.currentTarget);
  };

  const handleCloseItemsMenu = () => {
    setAnchorElItems(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Procurement Application</Link>
        </Typography>

        <Button color="inherit" onClick={handleOpenSuppliersMenu}>Suppliers</Button>
        <Menu
          anchorEl={anchorElSuppliers}
          open={Boolean(anchorElSuppliers)}
          onClose={handleCloseSuppliersMenu}
        >
          <MenuItem onClick={handleCloseSuppliersMenu} component={Link} to="/suppliers">View Suppliers</MenuItem>
          <MenuItem onClick={handleCloseSuppliersMenu} component={Link} to="/admin/add-suppliers">Add Supplier</MenuItem>
        </Menu>

        <Button color="inherit" onClick={handleOpenItemsMenu}>Items</Button>
        <Menu
          anchorEl={anchorElItems}
          open={Boolean(anchorElItems)}
          onClose={handleCloseItemsMenu}
        >
          <MenuItem onClick={handleCloseItemsMenu} component={Link} to="/items">View Items</MenuItem>
          <MenuItem onClick={handleCloseItemsMenu} component={Link} to="/admin/add-items">Add Item</MenuItem>
        </Menu>
        <Button color="inherit" component={Link} to="/purchase-orders">Purchase Orders</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
