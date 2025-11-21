import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';
import Store from './pages/Store';
import { Cart } from './pages/Cart';
import Assistant from './pages/Assistant';
import Analysis from './pages/Analysis';
import Studio from './pages/Studio';
import { Product, CartItem } from './types';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('heritageCart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save cart to local storage on change
  useEffect(() => {
    localStorage.setItem('heritageCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prevCart => 
      prevCart.map(item => {
        if (item.id === id) {
          return { ...item, quantity: Math.max(1, item.quantity + delta) };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans text-gray-800">
        <Navbar cartCount={cartCount} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} clearCart={clearCart} />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/studio" element={<Studio />} />
          </Routes>
        </main>
        
        {/* Floating Chat Bot */}
        <ChatBot />

        <footer className="bg-neutral-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-serif text-xl font-bold mb-4">Heritage</h3>
                <p className="text-neutral-400 text-sm">Nature care products sourced sustainably from Sri Lanka for the world.</p>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-heritage-accent">Shop</h4>
                <ul className="space-y-2 text-sm text-neutral-400 hover:text-neutral-200">
                  <li>Beverages</li>
                  <li>Superfoods</li>
                  <li>Oils</li>
                  <li>Spices</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-heritage-accent">Legal</h4>
                <ul className="space-y-2 text-sm text-neutral-400">
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                  <li>Refund Policy</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-heritage-accent">Contact</h4>
                <p className="text-sm text-neutral-400">Dubai, UAE</p>
                <p className="text-sm text-neutral-400 mt-2">support@heritageorganic.ae</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-neutral-700 text-center text-sm text-neutral-500">
              © {new Date().getFullYear()} Heritage Nature Organics. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;