
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Camera, Image as ImageIcon, Menu, X, Search } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [navQuery, setNavQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Helper to determine active state with enhanced visual cues
  const isActive = (path: string) => location.pathname === path;

  const handleNavSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (navQuery.trim()) {
      // Navigate to assistant page with query param
      navigate(`/assistant?q=${encodeURIComponent(navQuery)}`);
      setNavQuery(''); // Clear input after search
    }
  };

  // Custom Link Component for consistent styling
  const NavLink = ({ to, label, icon: Icon }: { to: string, label: string, icon?: React.ElementType }) => {
    const active = isActive(to);
    return (
      <Link to={to} className="group relative flex items-center gap-2 px-1 py-2">
        <span className={`text-base font-semibold font-opensans tracking-wider transition-colors duration-300 flex items-center gap-2 ${
          active ? 'text-heritage-green' : 'text-gray-800 hover:text-heritage-green'
        }`}>
          {Icon && <Icon size={18} className={active ? "stroke-[2.5px]" : ""} />}
          {label}
        </span>
        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-heritage-green transform origin-left transition-transform duration-300 ease-out ${
          active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`} />
      </Link>
    );
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300 border-b border-gray-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24"> 
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3 group transition-transform duration-300 hover:scale-105">
               {/* Primary Logo Image */}
               <img 
                 src="https://heritageorganic.ae/wp-content/uploads/2022/01/logo.png" 
                 alt="Heritage Nature Organics" 
                 className="h-20 w-auto object-contain py-2"
                 onError={(e) => {
                   e.currentTarget.style.display = 'none';
                   const fallback = document.getElementById('logo-fallback');
                   if (fallback) fallback.style.display = 'flex';
                 }}
               />
               
               {/* Fallback Logo */}
               <div id="logo-fallback" className="hidden items-center gap-3">
                 <div className="h-10 w-10 bg-heritage-green rounded-full flex items-center justify-center text-white font-serif text-xl font-bold shadow-lg">H</div>
                 <div className="flex flex-col">
                   <span className="font-serif text-xl font-bold text-heritage-green leading-tight">Heritage</span>
                   <span className="text-[10px] uppercase tracking-[0.2em] text-heritage-brown font-semibold">Nature Organics</span>
                 </div>
               </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8 xl:space-x-10 absolute left-1/2 transform -translate-x-1/2">
            <NavLink to="/" label="HOME" />
            <NavLink to="/store" label="STORE" />
            
            {/* Refined AI Search Bar */}
            <form onSubmit={handleNavSearch} className="relative group mx-2 translate-y-2">
              <div className="relative">
                <input
                  type="text"
                  value={navQuery}
                  onChange={(e) => setNavQuery(e.target.value)}
                  placeholder="Ask AI..."
                  className="w-48 focus:w-64 transition-all duration-500 ease-out bg-white border-2 border-heritage-green text-gray-900 text-base font-normal font-opensans rounded-full pl-10 pr-4 py-2 outline-none focus:border-heritage-accent hover:border-heritage-accent focus:ring-0 shadow-sm hover:shadow-md focus:shadow-md placeholder-gray-400"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-heritage-green group-hover:text-heritage-accent group-focus-within:text-heritage-accent transition-colors duration-300">
                  <Search size={16} />
                </div>
              </div>
            </form>

            <NavLink to="/analysis" label="PRODUCT ANALYZE"/>
            <NavLink to="/studio" label="STUDIO"/>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/cart" className="relative group flex flex-col items-center justify-center gap-0.5 text-gray-800 hover:text-heritage-green transition-colors duration-300 px-2">
              <div className="relative">
                <ShoppingBag size={24} strokeWidth={2.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold leading-none text-white transform bg-heritage-accent rounded-full animate-popIn shadow-sm border border-white font-opensans">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-bold tracking-widest uppercase font-opensans">Cart</span>
            </Link>
            
            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 hover:text-heritage-green p-2 rounded-full hover:bg-gray-50 transition-all duration-300">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 animate-slideDown shadow-xl">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-4 py-4 rounded-xl text-base font-semibold font-opensans tracking-wide text-gray-800 hover:text-heritage-green hover:bg-heritage-light transition-all duration-200">Home</Link>
            <Link to="/store" onClick={() => setIsOpen(false)} className="block px-4 py-4 rounded-xl text-base font-semibold font-opensans tracking-wide text-gray-800 hover:text-heritage-green hover:bg-heritage-light transition-all duration-200">Store</Link>
            
            <div className="py-2">
              <form onSubmit={(e) => { handleNavSearch(e); setIsOpen(false); }}>
                <div className="relative">
                  <input
                    type="text"
                    value={navQuery}
                    onChange={(e) => setNavQuery(e.target.value)}
                    placeholder="Ask AI Assistant..."
                    className="w-full bg-white border-2 border-heritage-green text-gray-900 text-base font-opensans rounded-xl pl-12 pr-4 py-3 outline-none focus:border-heritage-accent hover:border-heritage-accent focus:ring-0 placeholder-gray-400"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-heritage-green">
                    <Search size={20} />
                  </div>
                </div>
              </form>
            </div>

            <Link to="/assistant" onClick={() => setIsOpen(false)} className="block px-4 py-4 rounded-xl text-base font-semibold font-opensans tracking-wide text-gray-800 hover:text-heritage-green hover:bg-heritage-light transition-all duration-200">AI Assistant</Link>
            <Link to="/analysis" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-4 rounded-xl text-base font-semibold font-opensans tracking-wide text-gray-800 hover:text-heritage-green hover:bg-heritage-light transition-all duration-200">
              <Camera size={20} /> Analyze Product
            </Link>
            <Link to="/studio" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-4 rounded-xl text-base font-semibold font-opensans tracking-wide text-gray-800 hover:text-heritage-green hover:bg-heritage-light transition-all duration-200">
              <ImageIcon size={20} /> Marketing Studio
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
