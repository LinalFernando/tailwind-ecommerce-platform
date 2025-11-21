
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../constants';
import { Product } from '../types';
import { Plus, SlidersHorizontal, Check, RotateCcw, ChevronDown, Filter, X, ShoppingBag, Minus, ZoomIn } from 'lucide-react';

interface StoreProps {
  addToCart: (product: Product) => void;
}

const Store: React.FC<StoreProps> = ({ addToCart }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  
  // Advanced Filter States
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>([]);

  // Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Accordion States
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    badges: true,
    origin: true
  });

  // Handle Deep Linking
  useEffect(() => {
    const productId = searchParams.get('product');
    if (productId) {
      const product = PRODUCTS.find(p => p.id === productId);
      if (product) {
        setSelectedProduct(product);
        setActiveImageIndex(0);
      }
    }
  }, [searchParams]);

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setActiveImageIndex(0);
    setSearchParams({ product: product.id });
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    setSearchParams({});
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Derived Data for Filter Options
  const allBadges = useMemo(() => Array.from(new Set(PRODUCTS.flatMap(p => p.badges))).sort(), []);
  const allOrigins = useMemo(() => Array.from(new Set(PRODUCTS.map(p => p.details.origin))).sort(), []);
  const maxProductPrice = useMemo(() => Math.ceil(Math.max(...PRODUCTS.map(p => p.price))), []);

  // Filtering Logic
  const filteredProducts = PRODUCTS.filter(product => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    const originMatch = selectedOrigins.length === 0 || selectedOrigins.includes(product.details.origin);
    const badgeMatch = selectedBadges.length === 0 || selectedBadges.every(b => product.badges.includes(b));
    return categoryMatch && priceMatch && originMatch && badgeMatch;
  });

  // Handlers
  const toggleBadge = (badge: string) => {
    setSelectedBadges(prev => 
      prev.includes(badge) ? prev.filter(b => b !== badge) : [...prev, badge]
    );
  };

  const toggleOrigin = (origin: string) => {
    setSelectedOrigins(prev => 
      prev.includes(origin) ? prev.filter(o => o !== origin) : [...prev, origin]
    );
  };

  const resetFilters = () => {
    setPriceRange([0, 100]);
    setSelectedBadges([]);
    setSelectedOrigins([]);
    setSelectedCategory('All');
  };

  const hasActiveFilters = selectedCategory !== 'All' || selectedBadges.length > 0 || selectedOrigins.length > 0 || priceRange[0] > 0 || priceRange[1] < 100;

  return (
    <div className="min-h-screen bg-heritage-cream py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 border-b border-gray-200 pb-6 opacity-0 animate-slideUp">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-heritage-green">Our Products</h1>
            <p className="text-gray-600 mt-2">Premium organic products for your well-being.</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
             <p className="text-sm text-gray-500 whitespace-nowrap hidden md:block">
               Showing {filteredProducts.length} results
             </p>
             <button 
               onClick={() => setShowFilters(!showFilters)}
               className={`flex items-center justify-center gap-2 px-4 py-2 border rounded-lg font-medium transition-all w-full md:w-auto lg:hidden ${
                 showFilters 
                   ? 'bg-heritage-green text-white border-heritage-green' 
                   : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-heritage-green'
               }`}
             >
               <Filter size={18} /> {showFilters ? 'Hide Filters' : 'Filter Products'}
             </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sidebar Filters */}
          <aside className={`w-full lg:w-64 flex-shrink-0 space-y-4 transition-all duration-500 ease-in-out ${showFilters ? 'block animate-slideDown' : 'hidden lg:block'} lg:animate-slideRight`}>
            
            {/* Filter Header (Desktop) */}
            <div className="hidden lg:flex items-center justify-between mb-2">
              <h3 className="font-serif font-bold text-xl text-gray-900 flex items-center gap-2">
                <SlidersHorizontal size={20} className="text-heritage-green" /> Filters
              </h3>
              {hasActiveFilters && (
                <button onClick={resetFilters} className="text-xs text-red-500 hover:text-red-700 font-medium hover:underline transition-all">
                  Reset All
                </button>
              )}
            </div>

            {/* Categories Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-shadow hover:shadow-md">
              <button 
                onClick={() => toggleSection('categories')}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-heritage-green hover:bg-gray-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  Categories
                  {selectedCategory !== 'All' && <span className="w-2 h-2 rounded-full bg-heritage-accent animate-pulse" />}
                </span>
                <ChevronDown size={20} className={`transition-transform duration-300 ${expandedSections.categories ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`grid transition-all duration-300 ease-in-out ${expandedSections.categories ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                  <div className="p-5 pt-0 space-y-1">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 flex justify-between items-center group ${
                          selectedCategory === cat
                            ? 'bg-heritage-light text-heritage-green font-semibold translate-x-1'
                            : 'text-gray-600 hover:bg-gray-50 hover:translate-x-1 hover:text-heritage-green'
                        }`}
                      >
                        {cat}
                        {selectedCategory === cat && <Check size={14} className="animate-popIn text-heritage-green" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Price Range Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-shadow hover:shadow-md">
               <button 
                onClick={() => toggleSection('price')}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-heritage-green hover:bg-gray-50 transition-colors"
              >
                <span>Price Range</span>
                <ChevronDown size={20} className={`transition-transform duration-300 ${expandedSections.price ? 'rotate-180' : ''}`} />
              </button>

              <div className={`grid transition-all duration-300 ease-in-out ${expandedSections.price ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                  <div className="p-5 pt-0 space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                        <input
                          type="number"
                          min="0"
                          max={priceRange[1]}
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                          className="w-full pl-6 pr-2 py-1.5 text-sm bg-white border border-gray-300 rounded-md focus:border-heritage-green focus:ring-1 focus:ring-heritage-green outline-none transition-all text-gray-900 shadow-sm"
                        />
                      </div>
                      <span className="text-gray-400">-</span>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                        <input
                          type="number"
                          min={priceRange[0]}
                          max="1000"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                          className="w-full pl-6 pr-2 py-1.5 text-sm bg-white border border-gray-300 rounded-md focus:border-heritage-green focus:ring-1 focus:ring-heritage-green outline-none transition-all text-gray-900 shadow-sm"
                        />
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={maxProductPrice + 20}
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-heritage-green"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>$0</span>
                      <span>Max: ${maxProductPrice + 20}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Badges Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-shadow hover:shadow-md">
              <button 
                onClick={() => toggleSection('badges')}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-heritage-green hover:bg-gray-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  Dietary Badges
                  {selectedBadges.length > 0 && <span className="w-2 h-2 rounded-full bg-heritage-accent animate-pulse" />}
                </span>
                <ChevronDown size={20} className={`transition-transform duration-300 ${expandedSections.badges ? 'rotate-180' : ''}`} />
              </button>

              <div className={`grid transition-all duration-300 ease-in-out ${expandedSections.badges ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                 <div className="overflow-hidden">
                   <div className="p-5 pt-0 space-y-2">
                    {allBadges.map((badge) => (
                      <label key={badge} className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-1.5 rounded transition-colors -mx-1.5">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                          selectedBadges.includes(badge) 
                            ? 'bg-heritage-green border-heritage-green text-white scale-100' 
                            : 'border-gray-300 bg-white group-hover:border-heritage-green'
                        }`}>
                          {selectedBadges.includes(badge) && <Check size={12} className="animate-popIn" />}
                        </div>
                        <input 
                          type="checkbox" 
                          className="hidden"
                          checked={selectedBadges.includes(badge)}
                          onChange={() => toggleBadge(badge)}
                        />
                        <span className={`text-sm transition-colors ${selectedBadges.includes(badge) ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-heritage-green'}`}>
                          {badge}
                        </span>
                      </label>
                    ))}
                    {selectedBadges.length > 0 && (
                      <button onClick={() => setSelectedBadges([])} className="text-xs text-red-500 hover:text-red-700 hover:underline mt-2 pl-1.5">
                        Clear Badges
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Origin Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-shadow hover:shadow-md">
               <button 
                onClick={() => toggleSection('origin')}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-heritage-green hover:bg-gray-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  Origin
                  {selectedOrigins.length > 0 && <span className="w-2 h-2 rounded-full bg-heritage-accent animate-pulse" />}
                </span>
                <ChevronDown size={20} className={`transition-transform duration-300 ${expandedSections.origin ? 'rotate-180' : ''}`} />
              </button>

              <div className={`grid transition-all duration-300 ease-in-out ${expandedSections.origin ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                  <div className="p-5 pt-0 space-y-2">
                    {allOrigins.map((origin) => (
                      <label key={origin} className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-1.5 rounded transition-colors -mx-1.5">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                          selectedOrigins.includes(origin) 
                            ? 'bg-heritage-green border-heritage-green text-white scale-100' 
                            : 'border-gray-300 bg-white group-hover:border-heritage-green'
                        }`}>
                          {selectedOrigins.includes(origin) && <Check size={12} className="animate-popIn" />}
                        </div>
                        <input 
                          type="checkbox" 
                          className="hidden"
                          checked={selectedOrigins.includes(origin)}
                          onChange={() => toggleOrigin(origin)}
                        />
                        <span className={`text-sm transition-colors ${selectedOrigins.includes(origin) ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-heritage-green'}`}>
                          {origin}
                        </span>
                      </label>
                    ))}
                     {selectedOrigins.length > 0 && (
                      <button onClick={() => setSelectedOrigins([])} className="text-xs text-red-500 hover:text-red-700 hover:underline mt-2 pl-1.5">
                        Clear Origins
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Reset All Button (Mobile/Tablet primarily) */}
            <button 
              onClick={resetFilters}
              className="w-full py-3 px-4 border border-gray-200 rounded-xl text-gray-600 text-sm font-medium hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow lg:hidden bg-white"
            >
              <RotateCcw size={14} /> Reset All Filters
            </button>

          </aside>

          {/* Product Grid */}
          <div className="flex-1 w-full">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center border border-gray-100 shadow-sm animate-fadeIn">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4 text-gray-400">
                  <SlidersHorizontal size={24} />
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters to find what you're looking for.</p>
                <button 
                  onClick={resetFilters}
                  className="inline-flex items-center text-heritage-green font-semibold hover:underline bg-heritage-light px-6 py-2 rounded-full transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <div 
                    key={product.id} 
                    onClick={() => openProductModal(product)}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col opacity-0 animate-popIn hover:-translate-y-1 cursor-pointer border border-transparent hover:border-gray-100"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      {/* Badge Overlay */}
                      {product.badges.length > 0 && (
                        <div className="absolute top-3 left-3 flex flex-col gap-1">
                          {product.badges.slice(0, 2).map(badge => (
                            <span key={badge} className="bg-white/90 backdrop-blur-sm text-heritage-green text-[10px] font-bold px-2 py-1 rounded shadow-sm animate-fadeIn delay-200">
                              {badge}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {/* Hover Action */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                        <button 
                          className="w-full bg-white text-heritage-green font-bold py-3 rounded-lg hover:bg-heritage-accent hover:text-white transition-colors flex items-center justify-center gap-2 shadow-lg"
                        >
                          <ZoomIn size={18} /> View Details
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="mb-2">
                        <p className="text-xs font-bold text-heritage-accent uppercase tracking-wider">{product.category}</p>
                        <h3 className="font-serif font-bold text-lg text-gray-900 leading-tight mt-1 group-hover:text-heritage-green transition-colors">{product.name}</h3>
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10">{product.description}</p>
                      
                      <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-400">Price</span>
                          <span className="font-bold text-xl text-heritage-green">${product.price.toFixed(2)}</span>
                        </div>
                        <div className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                          {product.details.weight}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fadeIn"
            onClick={closeProductModal}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row animate-popIn">
            <button 
              onClick={closeProductModal}
              className="absolute top-4 right-4 z-20 bg-white/80 hover:bg-white p-2 rounded-full shadow-sm transition-all hover:scale-110 text-gray-500 hover:text-red-500"
            >
              <X size={24} />
            </button>

            {/* Left: Image Gallery */}
            <div className="w-full md:w-1/2 bg-gray-50 p-6 md:p-10 flex flex-col">
              <div className="relative flex-1 aspect-square bg-white rounded-xl overflow-hidden shadow-sm mb-4 group cursor-zoom-in border border-gray-100">
                 <img 
                   src={selectedProduct.images[activeImageIndex]} 
                   alt={selectedProduct.name} 
                   className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-150 origin-center"
                 />
                 <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-500 shadow-sm flex items-center gap-1">
                   <ZoomIn size={12} /> Hover to Zoom
                 </div>
              </div>
              
              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide justify-center">
                {selectedProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg border-2 flex-shrink-0 overflow-hidden transition-all bg-white ${
                      activeImageIndex === idx 
                        ? 'border-heritage-green shadow-md scale-105' 
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Details */}
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col">
              <div className="mb-1">
                <span className="text-sm font-bold text-heritage-accent uppercase tracking-wider">{selectedProduct.category}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2 leading-tight">
                {selectedProduct.name}
              </h2>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex text-heritage-accent text-sm">
                  {'★'.repeat(Math.floor(selectedProduct.rating))}
                  <span className="text-gray-300">{'★'.repeat(5 - Math.floor(selectedProduct.rating))}</span>
                </div>
                <span className="text-sm text-gray-500 border-l border-gray-300 pl-4">{selectedProduct.reviews} Customer Reviews</span>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                {selectedProduct.description}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedProduct.badges.map(badge => (
                  <span key={badge} className="bg-green-50 text-heritage-green px-3 py-1 rounded-full text-xs font-bold border border-green-100">
                    {badge}
                  </span>
                ))}
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-4 mb-8 border-t border-b border-gray-100 py-6">
                 <div>
                   <span className="block text-xs text-gray-400 uppercase mb-1">Origin</span>
                   <span className="font-medium text-gray-900">{selectedProduct.details.origin}</span>
                 </div>
                 <div>
                   <span className="block text-xs text-gray-400 uppercase mb-1">Weight/Volume</span>
                   <span className="font-medium text-gray-900">{selectedProduct.details.weight}</span>
                 </div>
                 <div className="col-span-2">
                   <span className="block text-xs text-gray-400 uppercase mb-1">Ingredients</span>
                   <span className="font-medium text-gray-900">{selectedProduct.details.ingredients}</span>
                 </div>
              </div>

              {/* Actions */}
              <div className="mt-auto pt-4 flex items-center gap-6">
                 <div>
                   <p className="text-sm text-gray-500 mb-1">Total Price</p>
                   <p className="text-4xl font-bold text-heritage-green">${selectedProduct.price.toFixed(2)}</p>
                 </div>
                 <button 
                   onClick={() => {
                     addToCart(selectedProduct);
                     closeProductModal();
                   }}
                   className="flex-1 bg-heritage-green text-white font-bold text-lg py-4 px-8 rounded-xl hover:bg-green-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2"
                 >
                   <ShoppingBag size={24} /> Add to Cart
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Store;
