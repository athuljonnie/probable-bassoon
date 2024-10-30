// redux/purchaseOrderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const purchaseOrderSlice = createSlice({
  name: 'purchaseOrder',
  initialState: {
    itemList: [],
    selectedSupplierId: '',
  },
  reducers: {
    setSupplier(state, action) {
      state.selectedSupplierId = action.payload;
    },
    clearItems(state) {
      state.itemList = [];
    },
  },
});

export const { setSupplier, addItems, clearItems } = purchaseOrderSlice.actions;
export default purchaseOrderSlice.reducer;
