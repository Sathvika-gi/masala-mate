import React from 'react';

const MapView = ({ vendorLocation, suppliers }) => {
  // Placeholder for Google Maps integration
  const initializeMap = () => {
    console.log('API Call: Initialize Google Maps', { 
      vendorLocation, 
      suppliers: suppliers.map(s => ({ id: s.id, lat: s.lat, lng: s.lng }))
    });
  };

  React.useEffect(() => {
    initializeMap();
  }, [vendorLocation, suppliers]);

  return (
    <div className="sidebar-card">
      <h3>📍 Nearby Suppliers</h3>
      <div className="map-container">
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗺️</div>
          <p>Google Maps Integration</p>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
            Showing suppliers within 5km
          </p>
        </div>
      </div>
      <div style={{ marginTop: '16px' }}>
        {suppliers.slice(0, 3).map(supplier => (
          <div key={supplier.id} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            padding: '8px 0',
            borderBottom: '1px solid var(--border)'
          }}>
            <span>{supplier.name}</span>
            <span style={{ color: 'var(--text-secondary)' }}>{supplier.distance}km</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapView;