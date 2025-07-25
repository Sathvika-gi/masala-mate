import React from 'react';

const Filters = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', label: 'All Items' },
    { id: 'vegetables', label: 'Vegetables' },
    { id: 'oils', label: 'Oils & Ghee' },
    { id: 'masala', label: 'Masala & Spices' },
    { id: 'flour', label: 'Flour & Grains' },
    { id: 'groceries', label: 'Groceries' },
    { id: 'verified', label: '✅ Verified Only' },
    { id: 'nearby', label: '📍 Nearby' }
  ];

  return (
    <section className="filters">
      <div className="container">
        <div className="filter-chips">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-chip ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => onFilterChange(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Filters;