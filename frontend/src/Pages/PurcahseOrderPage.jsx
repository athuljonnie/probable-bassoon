import React from 'react';
import PurchaseOrderForm from '../Components/PurcahseOrder/PurchaseOrderForm';
import CartDisplay from '../Components/PurcahseOrder/CartDisplay';
import PurchaseOrderList from '../Components/PurcahseOrder/PurchaseOrderList';

const PurchaseOrdersPage = () => {
  return (
    <div className='m-10 auto'>
      <PurchaseOrderForm />
      <CartDisplay/>
      <PurchaseOrderList />
    </div>
  );
};

export default PurchaseOrdersPage;
