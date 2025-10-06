import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeItem, updateQuantity } from '../redux/CartSlice'
import '../styles/CartItem.css'

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items)
  const dispatch = useDispatch()

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const cost = parseFloat(item.cost.substring(1))
      return total + (cost * item.quantity)
    }, 0).toFixed(2)
  }

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ 
      name: item.name, 
      amount: item.quantity + 1 
    }))
  }

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ 
        name: item.name, 
        amount: item.quantity - 1 
      }))
    } else {
      dispatch(removeItem(item.name))
    }
  }

  const handleRemove = (item) => {
    dispatch(removeItem(item.name))
  }

  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.substring(1))
    return (cost * item.quantity).toFixed(2)
  }

  const getTotalCartQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const handleCheckout = () => {
    alert('Thank you for your order! This functionality will be fully implemented in the future.')
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <h3>Total Items: {getTotalCartQuantity()}</h3>
      <h3>Total Cart Amount: ${calculateTotalAmount()}</h3>
      
      <div className="cart-items">
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          cart.map(item => (
            <div className="cart-item" key={item.name}>
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">{item.cost} each</div>
                <div className="cart-item-quantity">
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>
                <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="cart-actions">
        <button className="continue-shopping-btn" onClick={onContinueShopping}>
          Continue Shopping
        </button>
        <button 
          className="checkout-btn" 
          onClick={handleCheckout}
          disabled={cart.length === 0}
        >
          Checkout
        </button>
      </div>
    </div>
  )
}

export default CartItem
