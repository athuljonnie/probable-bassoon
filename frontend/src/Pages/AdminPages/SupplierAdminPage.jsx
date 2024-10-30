import React from 'react';
import SupplierForm from '../../Components/Suppliers/SupplierForm';
import SupplierList from '../../Components/Suppliers/SupplierList';

const SuppliersPage = () => {
  return (
    <div className='m-10 auto'>
      <SupplierForm />
      <SupplierList />
    </div>
  );
};

export default SuppliersPage;
