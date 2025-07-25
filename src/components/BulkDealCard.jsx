import React from 'react';

const BulkDealCard = ({ deal, onApplyDeal }) => {
  const handleApplyDeal = () => {
    // Placeholder for backend API call
    console.log('API Call: Applying bulk deal', { dealId: deal.id });
    onApplyDeal(deal);
  };

  return (
    <div className="sidebar-card bulk-deal">
      <h3>💰 Bulk Deal Alert!</h3>
      <div className="deal-savings">Save ₹{deal.savings}</div>
      <p style={{ opacity: 0.9, margin: '8px 0' }}>
        Buy combo from {deal.supplier}:
      </p>
      <ul className="deal-items">
        {deal.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button 
        className="btn" 
        onClick={handleApplyDeal}
        style={{ 
          background: 'rgba(255, 255, 255, 0.2)', 
          color: 'white',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          width: '100%',
          marginTop: '12px'
        }}
      >
        Apply Deal
      </button>
    </div>
  );
};

export default BulkDealCard;