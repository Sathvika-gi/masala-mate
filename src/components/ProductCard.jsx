import React from 'react';

const ProductCard = ({ product, onAddToCart, onViewSupplier }) => {
  const {
    id,
    name,
    supplier,
    price,
    unit,
    rating,
    reviewCount,
    image,
    verified,
    distance,
    available
  } = product;

  const handleAddToCart = () => {
    // Placeholder for backend API call
    console.log('API Call: Adding to cart', { productId: id, quantity: 1 });
    onAddToCart(product);
  };

  const handleViewSupplier = () => {
    // Placeholder for backend API call
    console.log('API Call: Fetching supplier details', { supplierId: supplier.id });
    onViewSupplier(supplier);
  };

  return (
    <div className="product-card fade-in">
      <div className="product-image" style={{ 
        backgroundImage: image ? `url(${image})` : 'none',
        backgroundColor: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '48px'
      }}>
        {!image && getProductEmoji(name)}
      </div>
      
      <div className="product-info">
        {verified && (
          <div className="verified-badge">
            ✅ Verified by {verified.count} vendors
          </div>
        )}
        
        <div className="product-header">
          <div>
            <h3 className="product-name">{name}</h3>
            <p className="supplier-name">{supplier.name}</p>
          </div>
          <div className="price">₹{price}/{unit}</div>
        </div>
        
        <div className="rating">
          <span>⭐ {rating}</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
            ({reviewCount} reviews)
          </span>
          {distance && (
            <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
              • {distance} km
            </span>
          )}
        </div>
        
        <div className="product-actions">
          <button 
            className="btn btn-primary" 
            onClick={handleAddToCart}
            disabled={!available}
          >
            🛒 Add to Cart
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={handleViewSupplier}
          >
            👁️ View Shop
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function to get emoji for products
const getProductEmoji = (productName) => {
  const name = productName.toLowerCase();
  if (name.includes('potato')) return '🥔';
  if (name.includes('onion')) return '🧅';
  if (name.includes('tomato')) return '🍅';
  if (name.includes('oil')) return '🛢️';
  if (name.includes('masala') || name.includes('spice')) return '🌶️';
  if (name.includes('flour') || name.includes('wheat')) return '🌾';
  if (name.includes('rice')) return '🍚';
  if (name.includes('dal') || name.includes('lentil')) return '🫘';
  return '🛒';
};

export default ProductCard;