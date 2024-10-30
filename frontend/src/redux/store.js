// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import purchaseOrderReducer from './slices/purchaseOrderSlice';
import selectedItemsReducer from './slices/selectedItemSlice';

const store = configureStore({
  reducer: {
    purchaseOrder: purchaseOrderReducer,
    selectedItems: selectedItemsReducer,
  },
});

export default store;
