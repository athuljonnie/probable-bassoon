import { createSlice } from '@reduxjs/toolkit';

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState: {
    items: [],
  },
  reducers: {

    addSelectedItems: (state, action) => {
      action.payload.forEach(item => {
        const existingItem = state.items.find(existingItem => existingItem._id === item._id);
        if (existingItem) {
          existingItem.orderQty += 1;
        } else {
          state.items.push({ ...item });
        }
      });
    },

    removeSelectedItem: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
    },

    clearSelectedItems: (state) => {
      state.items = [];
    },
  },
});

export const { addSelectedItems, removeSelectedItem, clearSelectedItems } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
