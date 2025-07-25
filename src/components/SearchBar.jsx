import React from 'react';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <section className="search-section">
      <div className="container">
        <div className="search-container">
          <div className="search-icon">🔍</div>
          <input
            type="text"
            className="search-input"
            placeholder="Search for potatoes, oil, masala, groceries..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </section>
  );
};

export default SearchBar;