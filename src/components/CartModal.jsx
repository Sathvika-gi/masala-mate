import React from 'react';

const CartModal = ({ isOpen, cartItems, onClose, onUpdateQuantity, onCheckout }) => {
  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    // Placeholder for backend API call
    console.log('API Call: Processing checkout', { 
      items: cartItems,
      total,
      timestamp: Date.now()
    });
    onCheckout(cartItems);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    // Placeholder for backend API call
    console.log('API Call: Update cart item quantity', { itemId, newQuantity });
    onUpdateQuantity(itemId, newQuantity);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '80vh',
        overflow: 'auto'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h2>🛒 Your Cart</h2>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛒</div>
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '20px' }}>
              {cartItems.map(item => (
                <div key={item.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid var(--border)'
                }}>
                  <div>
                    <div style={{ fontWeight: '600' }}>{item.name}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                      ₹{item.price}/{item.unit}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      style={{
                        background: 'var(--border)',
                        border: 'none',
                        borderRadius: '4px',
                        width: '28px',
                        height: '28px',
                        cursor: 'pointer'
                      }}
                    >
                      -
                    </button>
                    <span style={{ minWidth: '20px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      style={{
                        background: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        width: '28px',
                        height: '28px',
                        cursor: 'pointer'
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 'var(--font-size-lg)',
              fontWeight: 'bold',
              marginBottom: '20px',
              paddingTop: '12px',
              borderTop: '2px solid var(--border)'
            }}>
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <button
              className="btn btn-primary"
              onClick={handleCheckout}
              style={{ width: '100%', padding: '12px' }}
            >
              🚚 Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;