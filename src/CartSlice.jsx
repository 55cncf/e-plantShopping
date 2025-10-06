import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.name === action.payload.name)
      
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        const newItem = {
          ...action.payload,
          quantity: 1
        }
        state.items.push(newItem)
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload)
    },
    updateQuantity: (state, action) => {
      const { name, amount } = action.payload
      const item = state.items.find(item => item.name === name)
      
      if (item) {
        item.quantity = amount
        if (item.quantity <= 0) {
          state.items = state.items.filter(i => i.name !== name)
        }
      }
    }
  },
})

export const { addItem, removeItem, updateQuantity } = cartSlice.actions
export default cartSlice.reducer
