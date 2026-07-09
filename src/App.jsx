import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { featuredSneakers } from './products';

import ScrollToTop from './components/ScrollToTop';
import QuickViewModal from './components/QuickViewModal';
import Home from './components/Home';
import Shop from './components/Shop';
import ProductDetail from './components/ProductDetail';
import Security from './components/Security';
import About from './components/About';
import Auth from './components/Auth';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [inventory, setInventory] = useState(featuredSneakers);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('condition10_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartGlowing, setIsCartGlowing] = useState(false);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [glowingItemIndex, setGlowingItemIndex] = useState(null);
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('condition10_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleTrackView = (shoe) => setRecentlyViewed((prev) => [shoe, ...prev.filter(item => item.id !== shoe.id)].slice(0, 4));

const handleAddToCart = (shoeData) => {
    const itemSize = shoeData.selectedSize || 'UK 9';
    
    setCartItems(prev => {
      const totalQtyInCart = prev.filter(item => item.id === shoeData.id).reduce((sum, item) => sum + item.quantity, 0);
      const trueStock = inventory.find(shoe => shoe.id === shoeData.id)?.stockLevel || 0;
      if (totalQtyInCart >= trueStock) {
        return prev;
      }
      const index = prev.findIndex(item => item.id === shoeData.id && item.selectedSize === itemSize);
      if (index >= 0) {
        const newCart = [...prev];
        newCart[index] = { ...newCart[index], quantity: newCart[index].quantity + 1 };
        return newCart;
      }
      return [...prev, { ...shoeData, quantity: 1, selectedSize: itemSize }];
    });
    setIsCartGlowing(true);
    setTimeout(() => setIsCartGlowing(false), 300);
  };

  const handleRemoveItem = (indexToRemove) => {
    setCartItems(prevItems => prevItems.filter((_, index) => index !== indexToRemove));
  };

const handleUpdateQuantity = (index, amount) => {
    if (amount === 1) { 
      setGlowingItemIndex(index); 
      setTimeout(() => setGlowingItemIndex(null), 300); 
    }
    setCartItems(prev => {
      const newCart = [...prev];
      const currentItem = newCart[index];
      const trueStock = inventory.find(shoe => shoe.id === currentItem.id)?.stockLevel || 0;
      if (amount === 1 && currentItem.quantity >= trueStock) {
        return prev;
      }
      const newQuantity = currentItem.quantity + amount; 
      
      if (newQuantity < 1) {
        return prev.filter((_, i) => i !== index);
      }
      newCart[index] = { ...currentItem, quantity: newQuantity };
      return newCart;
    });
  };

  const handleCheckout = () => {
    setInventory(prevInventory => {
      return prevInventory.map(shoe => {
        const amountInCart = cartItems.filter(item => item.id === shoe.id).reduce((sum, item) => sum + item.quantity, 0);
        
        if (amountInCart > 0 && shoe.stockLevel !== undefined) {
          return { ...shoe, stockLevel: Math.max(0, shoe.stockLevel - amountInCart) };
        }
        return shoe;
      });
    });

    setCartItems([]);
    setIsCheckoutSuccess(true);
  };

  const handleCloseDrawer = () => {
    setIsCartOpen(false);
    setTimeout(() => setIsCheckoutSuccess(false), 300);
  };

  const totalCartUnits = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0); 

  return (
    <BrowserRouter>
      <ScrollToTop /> 
      
      <div className="min-h-screen bg-white text-zinc-900 font-sans overflow-x-hidden relative flex flex-col">
        
        {/* NAVIGATION */}
        <nav className="fixed top-0 w-full z-[100] bg-white/90 backdrop-blur-md flex justify-between items-center p-4 md:p-6 shadow-xl shadow-zinc-900/10">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-black tracking-tighter uppercase cursor-pointer z-[110]">Condition<span className="text-purple-600">10</span></Link>
          
          <div className="hidden md:flex items-center gap-12 text-[10px] font-bold tracking-widest uppercase text-zinc-400">
            <button aria-label="Toggle mobile menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="group md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1 cursor-pointer ml-2"></button>
            <Link to="/shop" className="hover:text-purple-600 cursor-pointer">Inventory</Link>
            <Link to="/security" className="hover:text-purple-600 cursor-pointer">Security</Link>
            <Link to="/about" className="hover:text-purple-600 cursor-pointer">About Us</Link>
          </div>

          <div className="flex items-center gap-4 md:gap-6 z-[110]">
            {currentUser ? (
              <div className="hidden sm:flex items-center gap-4">
                <span className="font-bold text-[10px] tracking-widest uppercase text-purple-600">Hello, {currentUser.name}</span>
                <button onClick={() => setCurrentUser(null)} className="text-[10px] font-bold tracking-widest uppercase text-zinc-400 hover:text-red-500 cursor-pointer">Logout</button>
              </div>
            ) : (
              <Link to="/auth" className="hidden sm:block font-bold text-[10px] tracking-widest uppercase text-zinc-400 hover:text-purple-600 cursor-pointer">Log In</Link>
            )}
            
            <button onClick={() => setIsCartOpen(true)} className={`font-bold text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer ${isCartGlowing ? 'text-purple-600 scale-125 drop-shadow-[0_0_12px_rgba(147,51,234,0.6)]' : 'text-zinc-900 hover:text-purple-600'}`}>CART ({totalCartUnits})</button>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="group md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1 cursor-pointer ml-2">
              <span className={`block w-5 h-0.5 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5 bg-zinc-900 group-hover:bg-red-500 group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'bg-zinc-900 group-hover:bg-purple-600 group-hover:drop-shadow-[0_0_8px_rgba(147,51,234,0.8)]'}`}></span>
              <span className={`block w-5 h-0.5 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 bg-zinc-900' : 'bg-zinc-900 group-hover:bg-purple-600 group-hover:drop-shadow-[0_0_8px_rgba(147,51,234,0.8)]'}`}></span>
              <span className={`block w-5 h-0.5 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5 bg-zinc-900 group-hover:bg-red-500 group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'bg-zinc-900 group-hover:bg-purple-600 group-hover:drop-shadow-[0_0_8px_rgba(147,51,234,0.8)]'}`}></span>
            </button>
          </div>
        </nav>

        {/* MOBILE MENU */}
        <div className={`fixed inset-0 bg-white z-[90] flex flex-col justify-center items-center gap-8 transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-black uppercase tracking-tighter hover:text-purple-600">Inventory</Link>
          <Link to="/security" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-black uppercase tracking-tighter hover:text-purple-600">Security</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-black uppercase tracking-tighter hover:text-purple-600">About Us</Link>
          
          <div className="mt-8 flex flex-col items-center gap-4">
            {!currentUser ? (
              <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-purple-600">Log In / Register</Link>
            ) : (
              <>
                <span className="font-bold text-xs tracking-widest uppercase text-purple-600">Vault Access: {currentUser.name}</span>
                <button onClick={() => { setCurrentUser(null); setIsMobileMenuOpen(false); }} className="text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-red-500">Logout</button>
              </>
            )}
          </div>
        </div>

        {/* PAGE ROUTES */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home inventory={inventory} onAddToCart={handleAddToCart} recentlyViewed={recentlyViewed} />}/>            
            <Route path="/shop" element={<Shop inventory={inventory} onQuickView={(shoe) => { setQuickViewItem(shoe); handleTrackView(shoe); }} recentlyViewed={recentlyViewed} />}/>
            <Route path="/product/:id" element={<ProductDetail inventory={inventory} cartItems={cartItems} onAddToCart={handleAddToCart} onTrackView={handleTrackView} />} />       
            <Route path="/security" element={<Security />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Auth onLogin={(userData) => setCurrentUser(userData)} />} />
            <Route path="/product/:id" element={<ProductDetail inventory={inventory} cartItems={cartItems} onAddToCart={handleAddToCart} onTrackView={handleTrackView} />} />
          </Routes>
        </div>

        {/* MODALS & OVERLAYS */}
        <QuickViewModal product={quickViewItem} cartItems={cartItems} onClose={() => setQuickViewItem(null)} onAddToCart={handleAddToCart} />

        {isCartOpen && <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-[110] transition-opacity" onClick={handleCloseDrawer}></div>}

        {/* CART DRAWER */}
        <div className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-white z-[120] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center p-6 border-b border-zinc-200">
            <h2 className="text-xl font-black uppercase tracking-tighter">Your Vault</h2>
            <button onClick={handleCloseDrawer} className="text-zinc-400 hover:text-purple-600 font-bold text-sm uppercase tracking-widest cursor-pointer">close</button>
          </div>

          {isCheckoutSuccess ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
              <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 text-zinc-900">Order Confirmed</h3>
              <p className="text-zinc-500 mb-10 text-sm">Your vault has been secured. We will email your receipt and tracking details shortly.</p>
              <button onClick={handleCloseDrawer} className="w-full bg-zinc-900 text-white py-4 rounded-full font-bold uppercase tracking-wide hover:bg-purple-600 transition-colors cursor-pointer">Continue Shopping</button>
            </div>
          ) : (
            <>
              <div className="flex-1 p-6 overflow-y-auto">
                  {cartItems.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-zinc-500"><p>Your vault is currently empty.</p></div>
                  ) : (
                    <div className="flex flex-col gap-6">
                      {cartItems.map((item, i) => (
                        <div key={i} className="flex gap-4 items-center group/item">
                          <div className="w-20 h-20 bg-zinc-100 rounded-sm overflow-hidden flex-shrink-0 relative">
                            <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex flex-col flex-1">
                            <div className="flex justify-between items-start">
                              <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">{item.brand}</span>
                              <button aria-label={`Remove ${item.name} from cart`} onClick={() => handleRemoveItem(i)} className="text-zinc-300 hover:text-red-500 transition-colors font-bold text-xs cursor-pointer" title="Remove item">✕</button>
                            </div>
                            <h4 className="font-bold text-sm leading-tight mt-1 pr-4">{item.name}</h4>
                            
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex flex-col">
                                <span className="font-medium text-purple-600 text-sm">£{item.price}</span>
                                <span className="text-xs font-bold text-zinc-400 mt-0.5">Size: {item.selectedSize}</span>
                              </div>
                              
                              <div className="flex items-center gap-3 bg-zinc-100 rounded-full p-1 border border-zinc-200">
                                <button onClick={() => handleUpdateQuantity(i, -1)} className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white text-zinc-500 hover:text-zinc-900 transition-colors text-xs font-black cursor-pointer">-</button>
                                <span className={`text-xs w-3 text-center transition-all duration-300 font-bold ${glowingItemIndex === i ? 'text-purple-600 scale-150 drop-shadow-md' : 'text-zinc-900'}`}>{item.quantity}</span>
                                <button onClick={() => handleUpdateQuantity(i, 1)} className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white text-zinc-500 hover:text-zinc-900 transition-colors text-xs font-black cursor-pointer">+</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-6 border-t border-zinc-200">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-zinc-500 uppercase tracking-widest text-sm">Subtotal</span>
                    <span className="font-black text-xl text-zinc-900">£{cartSubtotal}</span>
                  </div>
                  <button onClick={handleCheckout} className="w-full bg-zinc-900 text-white py-4 rounded-full font-bold uppercase tracking-wide hover:bg-purple-600 transition-colors cursor-pointer flex justify-center items-center gap-3">
                    Checkout Securely
                    <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full border border-white/30 tracking-widest">DEMO</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* FOOTER */}
        <footer className="border-t border-zinc-200 py-10 px-6 flex flex-col md:flex-row justify-between items-center text-xs font-bold tracking-widest uppercase text-zinc-400 mt-auto">
          <span className="mb-4 md:mb-0">© 2026 Condition 10. Educational Project.</span>
          <div className="flex gap-6 md:gap-10">
            <a href="#" className="hover:text-purple-600 text-zinc-900 cursor-pointer">Behance</a>
            <a href="#" className="hover:text-purple-600 text-zinc-900 cursor-pointer">Instagram</a>
          </div>
        </footer>

      </div>
    </BrowserRouter>
  );
}