import React, { useContext } from 'react';
import { PRODUCTS } from '../../products';
import { ShopContext } from '../../context/shop-context';
import { CartItem } from './cart-items';
import './cart.css';

import { useNavigate } from 'react-router-dom';

export const Cart = () => {
  const { cartItems, getTotalCartItemCount, getTotalCartAmount, handleCheckout } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cartItems">
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem data={product} key={product.id} />;
          }
          return null; // Added an explicit return statement for the else case
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <p>Subtotal: N{totalAmount}</p>
          <button onClick={() => navigate('/')}>Continue Shopping</button>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      ) : (
        <h1>Your Cart is Empty</h1>
      )}
    </div>
  );
};
