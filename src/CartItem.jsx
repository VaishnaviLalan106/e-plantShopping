import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      const quantity = item.quantity;
      const cost = parseFloat(item.cost.substring(1));
      total += cost * quantity;
    });
    return total.toFixed(2);
  };
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e); // ✅ Call parent function to go back to plant listing
  };
  const handleCheckoutShopping = () => {
  alert('Functionality to be added for future reference');
};
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // ➖ Decrement quantity (with check)
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      // Decrease quantity by 1
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // Quantity would become 0 → remove item completely
      dispatch(removeItem(item.name));
    }
  };

  // 🗑️ Remove item from cart directly
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  // 🧮 Calculate subtotal for this item
const calculateTotalCost = (item) => {
  const cost = parseFloat(item.cost.substring(1)); // remove "$" and convert to number
  return (cost * item.quantity).toFixed(2);        // multiply by quantity and format
};
const totalItems = useSelector((state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
);
  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


