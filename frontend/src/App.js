import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';


import SuppliersPage from '../src/Pages/UserPages/SupplierPage';
import ItemsUserPage from '../src/Pages/UserPages/ItemsPage';
import PurchaseOrdersPage from '../src/Pages/PurcahseOrderPage';
import Navbar from '../src/Components/Navbar';

import Login from './Components/Admin/Login';
import Dashboard from './Components/Admin/Dashboard';
import ItemsAdminPage from './Pages/AdminPages/ItemsAdminPage'
import SuppliersAdminPage from './Pages/AdminPages/SupplierAdminPage';
import LogItemsButton from './Components/LogItems';



const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('jwtToken');
  return token ? children : <Navigate to="/" />;
};
const App = () => {
  return (
    <Router>
      <Navbar /> 
      <Routes>
      <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-items"
          element={
            <ProtectedRoute>
              <ItemsAdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-suppliers"
          element={
            <ProtectedRoute>
              <SuppliersAdminPage />
            </ProtectedRoute>
          }
        />
        <Route path="/suppliers" element={<SuppliersPage />} />
        <Route path="/items" element={<ItemsUserPage />} />
        <Route path="/purchase-orders" element={<PurchaseOrdersPage />} />
      </Routes>
    </Router>
  );
};

export default App;
