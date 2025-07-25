// Mock data for development - Replace with real API calls

export const mockProducts = [
  {
    id: 1,
    name: "Premium Potatoes",
    supplier: { id: 101, name: "Sharma Vegetables", lat: 28.6139, lng: 77.2090 },
    price: 25,
    unit: "kg",
    rating: 4.5,
    reviewCount: 127,
    category: "vegetables",
    verified: { count: 23 },
    distance: 1.2,
    available: true
  },
  {
    id: 2,
    name: "Fresh Red Onions",
    supplier: { id: 102, name: "Kumar Fresh Mart", lat: 28.6129, lng: 77.2095 },
    price: 30,
    unit: "kg",
    rating: 4.3,
    reviewCount: 89,
    category: "vegetables",
    verified: { count: 18 },
    distance: 0.8,
    available: true
  },
  {
    id: 3,
    name: "Mustard Oil",
    supplier: { id: 103, name: "Singh Oil Mills", lat: 28.6149, lng: 77.2085 },
    price: 150,
    unit: "liter",
    rating: 4.7,
    reviewCount: 234,
    category: "oils",
    verified: { count: 45 },
    distance: 2.1,
    available: true
  },
  {
    id: 4,
    name: "Garam Masala Powder",
    supplier: { id: 104, name: "Spice King", lat: 28.6135, lng: 77.2100 },
    price: 80,
    unit: "250g",
    rating: 4.6,
    reviewCount: 156,
    category: "masala",
    verified: { count: 31 },
    distance: 1.5,
    available: true
  },
  {
    id: 5,
    name: "Wheat Flour",
    supplier: { id: 105, name: "Grain House", lat: 28.6125, lng: 77.2110 },
    price: 45,
    unit: "kg",
    rating: 4.4,
    reviewCount: 198,
    category: "flour",
    verified: { count: 27 },
    distance: 1.8,
    available: true
  },
  {
    id: 6,
    name: "Fresh Tomatoes",
    supplier: { id: 106, name: "Green Valley Farm", lat: 28.6145, lng: 77.2080 },
    price: 35,
    unit: "kg",
    rating: 4.2,
    reviewCount: 76,
    category: "vegetables",
    verified: { count: 15 },
    distance: 2.3,
    available: true
  },
  {
    id: 7,
    name: "Basmati Rice",
    supplier: { id: 107, name: "Rice Depot", lat: 28.6120, lng: 77.2105 },
    price: 120,
    unit: "kg",
    rating: 4.8,
    reviewCount: 312,
    category: "groceries",
    verified: { count: 52 },
    distance: 0.9,
    available: true
  },
  {
    id: 8,
    name: "Turmeric Powder",
    supplier: { id: 108, name: "Organic Spices Co.", lat: 28.6155, lng: 77.2075 },
    price: 60,
    unit: "200g",
    rating: 4.5,
    reviewCount: 89,
    category: "masala",
    verified: { count: 22 },
    distance: 2.7,
    available: true
  }
];

export const mockBulkDeals = [
  {
    id: 1,
    supplier: "Sharma Vegetables",
    items: ["Potatoes 5kg", "Onions 3kg", "Tomatoes 2kg"],
    savings: 73,
    originalPrice: 320,
    dealPrice: 247
  },
  {
    id: 2,
    supplier: "Singh Oil Mills",
    items: ["Mustard Oil 2L", "Coconut Oil 1L", "Ghee 500ml"],
    savings: 95,
    originalPrice: 480,
    dealPrice: 385
  }
];

export const mockSuppliers = [
  {
    id: 101,
    name: "Sharma Vegetables",
    distance: 1.2,
    rating: 4.5,
    lat: 28.6139,
    lng: 77.2090
  },
  {
    id: 102,
    name: "Kumar Fresh Mart",
    distance: 0.8,
    rating: 4.3,
    lat: 28.6129,
    lng: 77.2095
  },
  {
    id: 103,
    name: "Singh Oil Mills",
    distance: 2.1,
    rating: 4.7,
    lat: 28.6149,
    lng: 77.2085
  }
];

// API simulation functions
export const apiSimulation = {
  // Simulate search products
  searchProducts: async (query, filters) => {
    console.log('API Call: Search products', { query, filters });
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    
    let results = [...mockProducts];
    
    if (query) {
      results = results.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (filters.category && filters.category !== 'all') {
      results = results.filter(product => product.category === filters.category);
    }
    
    if (filters.verified) {
      results = results.filter(product => product.verified);
    }
    
    return results;
  },

  // Simulate add to cart
  addToCart: async (productId, quantity = 1) => {
    console.log('API Call: Add to cart', { productId, quantity });
    await new Promise(resolve => setTimeout(resolve, 200));
    return { success: true, message: 'Added to cart' };
  },

  // Simulate get supplier details
  getSupplierDetails: async (supplierId) => {
    console.log('API Call: Get supplier details', { supplierId });
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockSuppliers.find(s => s.id === supplierId);
  },

  // Simulate get bulk deals
  getBulkDeals: async (vendorLocation) => {
    console.log('API Call: Get bulk deals', { vendorLocation });
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockBulkDeals;
  },

  // Simulate checkout
  processCheckout: async (cartItems) => {
    console.log('API Call: Process checkout', { cartItems });
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { 
      success: true, 
      orderId: 'ORD' + Date.now(),
      message: 'Order placed successfully'
    };
  }
};