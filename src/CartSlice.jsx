import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Each item will have { name, image, description, cost, quantity }
  },
  reducers: {
    addItem: (state, action) => {
      const plant = action.payload;
      const existingItem = state.items.find(item => item.name === plant.name);

      if (existingItem) {
        // If already in cart, just increase quantity
        existingItem.quantity += 1;
      } else {
        // Otherwise, add new item with quantity = 1
        state.items.push({ ...plant, quantity: 1 });
      }
    },

    
    removeItem: (state, action) => {
      const plantName = action.payload; // Expecting the plant name
      state.items = state.items.filter(item => item.name !== plantName);
    },

    updateQuantity: (state, action) => {
      const { name, amount } = action.payload; 
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity = amount;

        // Optional: If amount is 0, remove the item automatically
        if (existingItem.quantity <= 0) {
          state.items = state.items.filter(item => item.name !== name);
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
