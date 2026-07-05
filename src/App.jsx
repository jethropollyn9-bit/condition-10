import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { featuredSneakers } from './products';
import CountdownBanner from './components/CountdownBanner';
import HoverSlideshow from './components/HoverSlideshow';
import RecentlyViewedShelf from './components/RecentlyViewedShelf';
import AutoSlideshow from './components/AutoSlideshow';
import Shop from './components/Shop';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function QuickViewModal({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const availableSizes = ['UK 5', 'UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12'];

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300 max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-white rounded-full text-zinc-900 font-bold hover:bg-zinc-100 shadow-md transition-colors">✕</button>
        <div className="w-full md:w-1/2 bg-zinc-100 flex items-center justify-center p-8">
           <img src={product.images[0]} alt={product.name} className="w-full h-auto object-cover rounded-xl shadow-sm mix-blend-multiply" />
        </div>
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center overflow-y-auto">
           <span className="text-purple-600 font-black text-xs uppercase tracking-widest mb-2 block">{product.brand}</span>
           <h2 className="text-3xl font-black tracking-tighter mb-2 leading-tight">{product.name}</h2>
           <p className="text-xl font-medium text-purple-600 mb-6">£{product.price}</p>
           
           <div className="mb-8">
             <h3 className="text-xs font-bold tracking-widest uppercase text-zinc-900 mb-3">Select Size</h3>
             <div className="grid grid-cols-4 gap-2">
                {availableSizes.map(size => (
                   <button key={size} onClick={() => setSelectedSize(size)} className={`py-3 rounded-lg border font-bold text-xs tracking-widest uppercase transition-all ${selectedSize === size ? 'border-purple-600 bg-purple-600 text-white shadow-md' : 'border-zinc-200 text-zinc-900 hover:border-purple-600'}`}>{size}</button>
                ))}
             </div>
           </div>
           <button disabled={!selectedSize} onClick={() => { onAddToCart({ ...product, selectedSize }); onClose(); }} className={`py-4 rounded-full font-bold uppercase tracking-widest transition-all shadow-xl ${selectedSize ? 'bg-zinc-900 text-white hover:bg-purple-600 hover:shadow-2xl active:scale-95 cursor-pointer' : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'}`}>
              {selectedSize ? 'Add to Cart' : 'Select a Size'}
           </button>
        </div>
      </div>
    </div>
  );
}

function Home({ onAddToCart, recentlyViewed }) {
  return (
    <div className="w-full pt-[76px] min-h-screen flex flex-col">
      <CountdownBanner />
      <div className="px-6 max-w-[1400px] mx-auto w-full flex-1 flex flex-col pt-12 pb-24">
        <div className="text-center mb-16 md:mb-24">
          <h1 className="text-6xl md:text-8xl lg:text-[100px] font-black tracking-tighter mb-6 uppercase text-zinc-900 leading-none">
            The Vault <span className="text-purple-600">1</span>s <span className="text-purple-600">0</span>pen
          </h1>
          <p className="text-zinc-500 max-w-2xl mx-auto text-lg md:text-xl">Premium deadstock sneakers. Authenticated, perfectly preserved, and ready for your collection.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          <div className="flex flex-col justify-center lg:col-span-5 pr-0 md:pr-8">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-6 leading-tight">Organ<span className="text-purple-600">1</span>sed Dr<span className="text-purple-600">0</span>ps updated weekly.</h2>
            <p className="text-zinc-500 text-lg leading-relaxed mb-8">Condition <span className="text-purple-600">10</span> provides access to the most exclusive sneakers on the market. We skip the noise and focus strictly on top-tier inventory.</p>
            <div className="flex flex-col sm:flex-row gap-6 text-sm font-bold tracking-widest uppercase text-zinc-900">
              <div className="flex items-center gap-3"><span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600">✓</span> Verified Authentic</div>
              <div className="flex items-center gap-3"><span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600">✓</span> Pristine Condition</div>
            </div>
          </div>
          <div className="lg:col-span-7 w-full shadow-2xl rounded-2xl overflow-hidden border border-zinc-100 aspect-square md:aspect-[16/10]">
            <AutoSlideshow sneakers={featuredSneakers} onAddToCart={onAddToCart} />
          </div>
        </div>
        <RecentlyViewedShelf items={recentlyViewed} />
      </div>
    </div>
  );
}

function ProductDetail({ onAddToCart, onTrackView }) {
  const { id } = useParams();
  const product = featuredSneakers.find(shoe => shoe.id === parseInt(id));
  const [selectedSize, setSelectedSize] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const availableSizes = ['UK 5', 'UK 5.5', 'UK 6', 'UK 6.5', 'UK 7', 'UK 7.5', 'UK 8', 'UK 8.5', 'UK 9', 'UK 9.5', 'UK 10', 'UK 10.5', 'UK 11', 'UK 11.5', 'UK 12'];

  useEffect(() => {
    if (product) {
      onTrackView(product);
    }
  }, [product?.id]);

  if (!product) return <div className="pt-40 text-center font-bold text-2xl">Product not found.</div>;

  const maxLength = 150;
  const shouldTruncate = product.description.length > maxLength;
  const displayText = shouldTruncate && !isExpanded ? product.description.slice(0, maxLength) + '...' : product.description;

  return (
    <div className="pt-32 pb-24 px-6 max-w-[1400px] mx-auto min-h-screen">
      <Link to="/shop" className="text-sm font-bold text-zinc-400 hover:text-purple-600 mb-8 inline-block uppercase tracking-widest cursor-pointer">← Back to Inventory</Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        <div className="bg-zinc-100 rounded-2xl overflow-hidden aspect-square shadow-lg">
          <HoverSlideshow images={product.images} altText={product.name} />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-purple-600 font-black text-sm uppercase tracking-widest mb-2">{product.brand}</span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 leading-tight">{product.name}</h1>
          <p className="text-2xl font-medium text-purple-600 mb-8">£{product.price}</p>
          <div className="mb-10">
            <p className="text-zinc-500 text-lg leading-relaxed inline">{displayText}</p>
            {shouldTruncate && (
              <button onClick={() => setIsExpanded(!isExpanded)} className="text-purple-600 font-bold text-[10px] tracking-widest uppercase ml-2 hover:text-zinc-900 transition-colors cursor-pointer">{isExpanded ? 'Read Less' : 'Read More'}</button>
            )}
          </div>
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold tracking-widest uppercase text-zinc-900">Select Size</h3>
              <span className="text-xs font-bold tracking-widest uppercase text-zinc-400 hover:text-purple-600 cursor-pointer">Size Guide</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {availableSizes.map(size => (
                <button key={size} onClick={() => setSelectedSize(size)} className={`py-4 rounded-xl border font-bold text-sm tracking-widest uppercase transition-all cursor-pointer ${selectedSize === size ? 'border-purple-600 bg-purple-600 text-white shadow-md' : 'border-zinc-200 text-zinc-900 hover:border-purple-600'}`}>{size}</button>
              ))}
            </div>
          </div>
          <button disabled={!selectedSize} onClick={() => onAddToCart({ ...product, selectedSize })} className={`py-5 rounded-full font-bold uppercase tracking-widest transition-all shadow-xl ${selectedSize ? 'bg-zinc-900 text-white hover:bg-purple-600 hover:shadow-2xl active:scale-95 cursor-pointer' : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'}`}>
            {selectedSize ? 'Add to Cart' : 'Select a Size'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Security() {
  return (
    <div className="pt-40 pb-24 px-6 max-w-[1200px] mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4">The Vault is <span className="text-purple-600">Secure</span></h1>
        <p className="text-zinc-500 font-bold tracking-widest uppercase text-sm">Our 3-Step Authentication Process</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-zinc-100 p-10 rounded-2xl flex flex-col items-start shadow-sm">
          <span className="text-4xl font-black text-purple-600 mb-6">01</span>
          <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Visual Inspection</h3>
          <p className="text-zinc-500 leading-relaxed">Our experts examine the overall shape, stitching patterns, and manufacturing tolerances. We check the box label fonts, date codes, and retail packaging against our database of verified retail releases.</p>
        </div>
        <div className="bg-zinc-100 p-10 rounded-2xl flex flex-col items-start shadow-sm">
          <span className="text-4xl font-black text-purple-600 mb-6">02</span>
          <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Material Verification</h3>
          <p className="text-zinc-500 leading-relaxed">Using UV technology, we inspect for hidden stamps, glue marks, and counterfeit signatures. We verify the texture, smell, and flexibility of the leathers, suedes, and outsoles.</p>
        </div>
        <div className="bg-zinc-100 p-10 rounded-2xl flex flex-col items-start shadow-sm">
          <span className="text-4xl font-black text-purple-600 mb-6">03</span>
          <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Condition <span className="text-purple-600">10</span> Tagging</h3>
          <p className="text-zinc-500 leading-relaxed">Once a sneaker passes our rigorous checklist and is confirmed as deadstock (unworn and flawless), it is secured with our tamper-evident Condition <span className="text-purple-600">10</span> holographic tag. Your absolute guarantee of authenticity.</p>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="pt-40 pb-24 px-6 max-w-[1200px] mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4">About <span className="text-purple-600">Us</span></h1>
        <p className="text-zinc-500 font-bold tracking-widest uppercase text-sm">The Story of Condition <span className="text-purple-600">10</span></p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter">Built for the <span className="text-purple-600">Purists</span></h2>
          <p className="text-zinc-500 text-lg leading-relaxed">Founded in 2026, Condition <span className="text-purple-600">10</span> was born out of frustration. The sneaker aftermarket had become too noisy, too risky, and too crowded. We wanted a place where collectors didn't have to second-guess what they were buying.</p>
          <p className="text-zinc-500 text-lg leading-relaxed">We bypass the standard aftermarket to provide a curated, high-end experience for collectors who demand pristine condition and absolute authenticity. No fakes. No damaged boxes. Just Condition <span className="text-purple-600">10</span>.</p>
        </div>
        <div className="bg-zinc-100 rounded-2xl overflow-hidden shadow-2xl aspect-square"><img src="https://media.istockphoto.com/id/1818455456/photo/shopping-travel-dubai-united-arab-emirates.jpg?s=612x612&w=0&k=20&c=FQkdZYxwvN_ynl56ZJDJBWR9OKe8D8UaFBdcLfsvCG4=" alt="Sneaker Collection" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105" /></div>
      </div>
    </div>
  );
}

function Auth({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin({ email: email, name: email.split('@')[0] || 'Sneakerhead' });
      setIsLoading(false);
      navigate('/'); 
    }, 2000);
  };

  return (
    <div className="pt-40 pb-24 px-6 max-w-[500px] mx-auto min-h-screen flex flex-col justify-center">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">
          {isSignUp ? 'Create Vault Access' : 'Enter The Vault'}
        </h1>
        <p className="text-zinc-500 text-sm font-bold tracking-widest uppercase">
          {isSignUp ? <span className="text-purple-600">Join Condition 10</span> : <span className="text-purple-600">Secure Login</span>}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-zinc-100 p-8 rounded-2xl shadow-sm">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold tracking-widest uppercase text-zinc-500">Email Address</label>
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white px-5 py-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-600 transition-all font-medium text-sm border border-zinc-200"
            placeholder="collector@example.com"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold tracking-widest uppercase text-zinc-500">Password</label>
          <input 
            type="password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white px-5 py-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-600 transition-all font-medium text-sm border border-zinc-200"
            placeholder="••••••••"
          />
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className="w-full bg-zinc-900 text-white py-4 rounded-full font-bold uppercase tracking-wide hover:bg-purple-600 transition-colors shadow-md mt-2 cursor-pointer flex justify-center items-center gap-3"
        >
          {isLoading ? 'Securing Connection...' : isSignUp ? 'Create Account' : 'Sign In'}
          <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full border border-white/30 tracking-widest">DEMO</span>
        </button>
      </form>

      <div className="mt-8 text-center">
        <button 
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-xs font-bold tracking-widest uppercase text-zinc-400 hover:text-purple-600 transition-colors cursor-pointer"
        >
          {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
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
    if (amount === 1) { setGlowingItemIndex(index); setTimeout(() => setGlowingItemIndex(null), 300); }
    setCartItems(prev => {
      const newCart = [...prev];
      const newQuantity = newCart[index].quantity + amount; 
      return newQuantity < 1 ? prev.filter((_, i) => i !== index) : Object.assign(newCart, { [index]: { ...newCart[index], quantity: newQuantity }});
    });
  };

  const handleCheckout = () => {
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

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home onAddToCart={handleAddToCart} recentlyViewed={recentlyViewed} />}/>            
            <Route path="/shop" element={<Shop onQuickView={(shoe) => { setQuickViewItem(shoe); handleTrackView(shoe); }} recentlyViewed={recentlyViewed} />}/>
            <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} onTrackView={handleTrackView} />} />               
            <Route path="/security" element={<Security />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Auth onLogin={(userData) => setCurrentUser(userData)} />} />
          </Routes>
        </div>

        <QuickViewModal product={quickViewItem} onClose={() => setQuickViewItem(null)} onAddToCart={handleAddToCart} />

        {isCartOpen && <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-[110] transition-opacity" onClick={handleCloseDrawer}></div>}

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
              <button aria-label="Close cart" onClick={handleCloseDrawer} className="text-zinc-400 hover:text-purple-600 font-bold text-sm uppercase tracking-widest cursor-pointer">close</button>
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