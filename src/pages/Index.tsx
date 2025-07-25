import React, { useState, useEffect } from 'react';
import '../styles/App.css';

// Components
import Header from '../components/Header.jsx';
import SearchBar from '../components/SearchBar.jsx';
import Filters from '../components/Filters.jsx';
import ProductCard from '../components/ProductCard.jsx';
import BulkDealCard from '../components/BulkDealCard.jsx';
import MapView from '../components/MapView.jsx';
import FloatingCart from '../components/FloatingCart.jsx';
import CartModal from '../components/CartModal.jsx';

// Mock data and API simulation
import { mockProducts, mockBulkDeals, mockSuppliers, apiSimulation } from '../data/mockData.js';

const Index = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [products, setProducts] = useState(mockProducts);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [location, setLocation] = useState('Delhi, India');
  const [bulkDeals, setBulkDeals] = useState(mockBulkDeals);

  // Load products based on search and filters
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const filters = {
          category: activeFilter === 'all' ? null : activeFilter,
          verified: activeFilter === 'verified',
          nearby: activeFilter === 'nearby'
        };
        
        const results = await apiSimulation.searchProducts(searchQuery, filters);
        setProducts(results);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(loadProducts, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, activeFilter]);

  // Handle cart operations
  const handleAddToCart = async (product) => {
    try {
      await apiSimulation.addToCart(product.id, 1);
      
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === product.id);
        if (existingItem) {
          return prevItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prevItems, { ...product, quantity: 1 }];
        }
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleCheckout = async (items) => {
    try {
      const result = await apiSimulation.processCheckout(items);
      if (result.success) {
        alert(`Order placed successfully! Order ID: ${result.orderId}`);
        setCartItems([]);
        setCartModalOpen(false);
      }
    } catch (error) {
      console.error('Error processing checkout:', error);
      alert('Error processing checkout. Please try again.');
    }
  };

  // Handle supplier view
  const handleViewSupplier = async (supplier) => {
    try {
      const supplierDetails = await apiSimulation.getSupplierDetails(supplier.id);
      alert(`Viewing ${supplierDetails.name}\nRating: ${supplierDetails.rating}/5\nDistance: ${supplierDetails.distance}km`);
    } catch (error) {
      console.error('Error fetching supplier details:', error);
    }
  };

  // Handle bulk deal application
  const handleApplyDeal = (deal) => {
    alert(`Bulk deal applied!\nYou saved ₹${deal.savings}\nItems will be added to your cart.`);
  };

  // Handle location change
  const handleLocationChange = () => {
    const newLocation = prompt('Enter your location:', location);
    if (newLocation && newLocation.trim()) {
      setLocation(newLocation.trim());
      // Reload products for new location
      console.log('API Call: Update vendor location', { location: newLocation });
    }
  };

  return (
    <div className="app">
      <Header location={location} onLocationChange={handleLocationChange} />
      
      <SearchBar 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
      />
      
      <Filters 
        activeFilter={activeFilter} 
        onFilterChange={setActiveFilter} 
      />

      <main className="main-content">
        <div className="container">
          <div className="content-grid">
            {/* Products Section */}
            <section className="products-section">
              <h2>
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="loading-spinner"></div>
                    Loading products...
                  </span>
                ) : (
                  `${products.length} products found`
                )}
              </h2>
              
              <div className="products-grid">
                {products.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onViewSupplier={handleViewSupplier}
                  />
                ))}
              </div>
              
              {products.length === 0 && !loading && (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '60px 20px',
                  color: 'var(--text-secondary)'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
                  <h3>No products found</h3>
                  <p>Try adjusting your search or filters</p>
                </div>
              )}
            </section>

            {/* Sidebar */}
            <aside className="sidebar">
              {/* Bulk Deals */}
              {bulkDeals.map(deal => (
                <BulkDealCard
                  key={deal.id}
                  deal={deal}
                  onApplyDeal={handleApplyDeal}
                />
              ))}

              {/* Map View */}
              <MapView
                vendorLocation={location}
                suppliers={mockSuppliers}
              />
            </aside>
          </div>
        </div>
      </main>

      {/* Floating Cart */}
      <FloatingCart
        cartItems={cartItems}
        onClick={() => setCartModalOpen(true)}
      />

      {/* Cart Modal */}
      <CartModal
        isOpen={cartModalOpen}
        cartItems={cartItems}
        onClose={() => setCartModalOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default Index;
