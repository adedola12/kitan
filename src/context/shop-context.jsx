import React, { createContext, useState } from 'react';
import { PRODUCTS } from '../products';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i <= PRODUCTS.length; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const handleCheckout = () => {
    const orderDetails = generateOrderDetails();
    const whatsappURL = `https://wa.me/message/HS7PK467KV53I1?text=${encodeURIComponent(orderDetails)}`;
    window.open(whatsappURL, '_blank');
  };

  const generateOrderDetails = () => {
    let orderText = 'Order Details:\n';
    PRODUCTS.forEach((product) => {
      if (cartItems[product.id] !== 0) {
        orderText += `${product.productName} - Quantity: ${cartItems[product.id]}\n`;
      }
    });
    const totalAmount = getTotalCartAmount();
    orderText += `\nTotal Amount: N${totalAmount}`;

    return orderText;
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getTotalCartAmount,
    handleCheckout,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
