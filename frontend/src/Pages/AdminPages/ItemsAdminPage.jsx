import React from 'react';
import ItemForm from '../../Components/Items/Admin/ItemsForm';
import ItemList from '../../Components/Items/User/ItemsList';

const ItemsPage = () => {
  return (
    <div className='m-10 auto'>
      <ItemForm />
      <ItemList />
    </div>
  );
};

export default ItemsPage;
