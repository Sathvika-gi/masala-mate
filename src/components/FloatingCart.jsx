import React from 'react';

const FloatingCart = ({ cartItems, onClick }) => {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button className="floating-cart" onClick={onClick}>
      🛒
      {totalItems > 0 && (
        <span className="cart-badge">{totalItems}</span>
      )}
    </button>
  );
};

export default FloatingCart;