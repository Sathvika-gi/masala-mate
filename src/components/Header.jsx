import React from 'react';

const Header = ({ location, onLocationChange }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            🌶️ Masala Mate
          </div>
          <div className="location-picker" onClick={onLocationChange}>
            📍 {location}
            <span style={{ marginLeft: '4px' }}>▼</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;