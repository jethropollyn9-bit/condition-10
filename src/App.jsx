import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

const featuredSneakers = [
  {
    id: 1,
    brand: "Nike ACG",
    name: "Phassad 'Black/Yellow'",
    price: 110, 
    description: "Built for the elements. The ACG Phassad delivers rugged utility with a striking high-vis colorway. Perfect for the trail or the concrete jungle.",
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584735174965-48c48d7028a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 2,
    brand: "New Balance",
    name: "2002R Protection Pack x BAPE",
    price: 450,
    description: "A highly coveted collaboration. Features the signature deconstructed 'Protection Pack' suede overlays combined with BAPE's iconic camo motifs.",
    images: [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 3,
    brand: "Adidas",
    name: "Samba Classic",
    price: 110,
    description: "The timeless classic. Originally designed for indoor football, the Samba has evolved into an absolute essential for everyday lifestyle wear.",
    images: [
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  }
];

function HoverSlideshow({ images, altText }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval;
    if (isHovered && images.length > 1) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 800); 
    } else {
      setCurrentIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  return (
    <div 
      className="w-full h-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={images[currentIndex]} 
        alt={altText}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {isHovered && images.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
          {images.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'w-4 bg-purple-600' : 'w-1.5 bg-white/60'
              }`} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

// UPGRADED: Now accepts the full 'sneakers' data and the 'onAddToCart' function
function AutoSlideshow({ sneakers, onAddToCart }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sneakers.length);
    }, 3000); 
    return () => clearInterval(timer);
  }, [sneakers.length]);

  const currentShoe = sneakers[currentIndex];

  return (
    // Added 'group' so the Magic Cloak works here
    <div className="w-full h-full relative overflow-hidden bg-zinc-100 group">
      <img 
        key={currentIndex}
        src={currentShoe.images[0]} 
        alt={currentShoe.name}
        className="w-full h-full object-cover animate-in fade-in duration-700"
      />
      
      {/* THE MAGIC CLOAK & DOORBELL */}
      <div className="absolute inset-0 bg-zinc-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center z-20">
        <button 
          onClick={(e) => {
            e.preventDefault(); 
            onAddToCart(currentShoe);
          }}
          className="pointer-events-auto bg-zinc-900 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-purple-600 transition-all transform translate-y-4 group-hover:translate-y-0 shadow-2xl"
        >
          Quick Add
        </button>
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-30">
        {sneakers.map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === currentIndex ? 'w-8 bg-purple-600' : 'w-2 bg-white/50'
            }`} 
          />
        ))}
      </div>
    </div>
  );
}

// Passed the onAddToCart prop into the Home page
function Home({ onAddToCart }) {
  return (
    <div className="pt-32 pb-24 px-6 max-w-[1400px] mx-auto min-h-screen flex flex-col justify-center">
      
      <div className="text-center mb-16 md:mb-24">
        <h1 className="text-6xl md:text-8xl lg:text-[100px] font-black tracking-tighter mb-6 uppercase text-zinc-900 leading-none">
          The Vault <span className="text-purple-600">1</span>s <span className="text-purple-600">0</span>pen
        </h1>
        <p className="text-zinc-500 max-w-2xl mx-auto text-lg md:text-xl">
          Premium deadstock sneakers. Authenticated, perfectly preserved, and ready for your collection.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
        
        <div className="flex flex-col justify-center lg:col-span-5 pr-0 md:pr-8">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-6 leading-tight">
            Organ<span className="text-purple-600">1</span>sed Dr<span className="text-purple-600">0</span>ps updated weekly.
          </h2>
          <p className="text-zinc-500 text-lg leading-relaxed mb-8">
            Condition <span className="text-purple-600">10</span> provides access to the most exclusive sneakers on the market. We skip the noise and focus strictly on top-tier inventory.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 text-sm font-bold tracking-widest uppercase text-zinc-900">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600">✓</span> 
              Verified Authentic
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600">✓</span> 
              Pristine Condition
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-7 w-full shadow-2xl rounded-2xl overflow-hidden border border-zinc-100 aspect-square md:aspect-[16/10]">
          {/* Passed sneakers array and logic down into the slideshow */}
          <AutoSlideshow sneakers={featuredSneakers} onAddToCart={onAddToCart} />
        </div>
      </div>

      <div className="w-full">
        <Link 
          to="/shop" 
          className="block w-full bg-zinc-900 text-white text-center py-6 md:py-8 rounded-2xl font-black text-xl md:text-2xl uppercase tracking-widest hover:bg-purple-600 transition-colors shadow-xl hover:shadow-2xl active:scale-95 transition-all"
        >
          Enter The Vault
        </Link>
      </div>

    </div>
  );
}

// Removed onAddToCart from Shop page as requested
function Shop() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-[1400px] mx-auto min-h-screen">
      <div className="flex justify-between items-end mb-10 border-b border-zinc-200 pb-4">
        <h1 className="text-4xl font-black tracking-tighter uppercase">The Inventory</h1>
        <span className="text-zinc-400 font-bold text-sm tracking-widest uppercase">{featuredSneakers.length} Items</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {featuredSneakers.map((shoe) => (
          <Link to={`/product/${shoe.id}`} key={shoe.id} className="group cursor-pointer block">
            <div className="bg-zinc-100 aspect-square overflow-hidden rounded-xl mb-4 relative shadow-sm hover:shadow-md transition-shadow">
              <HoverSlideshow images={shoe.images} altText={shoe.name} />
              <div className="absolute inset-0 bg-zinc-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-zinc-500 font-bold text-xs uppercase tracking-widest">{shoe.brand}</span>
              <h3 className="font-bold text-lg leading-tight mt-1 group-hover:text-purple-600 transition-colors">{shoe.name}</h3>
              <span className="font-medium text-purple-600 mt-2">£{shoe.price}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const product = featuredSneakers.find(shoe => shoe.id === parseInt(id));

  if (!product) {
    return <div className="pt-40 text-center font-bold text-2xl">Product not found.</div>;
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-[1400px] mx-auto min-h-screen">
      <Link to="/shop" className="text-sm font-bold text-zinc-400 hover:text-purple-600 mb-8 inline-block uppercase tracking-widest">
        ← Back to Inventory
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        <div className="bg-zinc-100 rounded-2xl overflow-hidden aspect-square shadow-lg">
          <HoverSlideshow images={product.images} altText={product.name} />
        </div>
        
        <div className="flex flex-col justify-center">
          <span className="text-purple-600 font-black text-sm uppercase tracking-widest mb-2">{product.brand}</span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 leading-tight">{product.name}</h1>
          <p className="text-2xl font-medium text-purple-600 mb-6">£{product.price}</p>
          <p className="text-zinc-500 text-lg leading-relaxed mb-10">{product.description}</p>
          
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-zinc-900 text-white py-5 rounded-full font-bold uppercase tracking-widest hover:bg-purple-600 transition-all shadow-xl hover:shadow-2xl active:scale-95"
          >
            Add to Cart
          </button>
          
          <div className="mt-8 pt-8 border-t border-zinc-200 text-sm text-zinc-400 flex flex-col gap-2">
            <p>✓ Authenticated Deadstock</p>
            <p>✓ Ships within 24 hours</p>
            <p>✓ Final Sale</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartGlowing, setIsCartGlowing] = useState(false);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);

  const handleAddToCart = (shoeData) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === shoeData.id);
      if (existingItemIndex >= 0) {
        const newCart = [...prevItems];
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity + 1
        };
        return newCart;
      } else {
        return [...prevItems, { ...shoeData, quantity: 1 }];
      }
    });
    
    setIsCartGlowing(true);
    setTimeout(() => setIsCartGlowing(false), 300);
    setIsCartOpen(true); 
  };

  const handleRemoveItem = (indexToRemove) => {
    setCartItems(prevItems => prevItems.filter((_, index) => index !== indexToRemove));
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
      <div className="min-h-screen bg-white text-zinc-900 font-sans overflow-x-hidden relative flex flex-col">
        
        <nav className="fixed top-0 w-full z-30 bg-white/90 backdrop-blur-md flex justify-between items-center p-6 border-b border-zinc-100">
          <Link to="/" className="text-xl font-black tracking-tighter uppercase">
            Condition<span className="text-purple-600">10</span>
          </Link>
          <div className="hidden md:flex items-center gap-12 text-[10px] font-bold tracking-widest uppercase text-zinc-400">
            <Link to="/shop" className="hover:text-purple-600">Inventory</Link>
            <span className="hover:text-purple-600 cursor-pointer">Security</span>
            <span className="hover:text-purple-600 cursor-pointer">About Us</span>
          </div>
          <button 
            onClick={() => setIsCartOpen(true)}
            className={`font-bold text-xs tracking-widest uppercase transition-all duration-300 ${
              isCartGlowing 
                ? 'text-purple-600 scale-125 drop-shadow-[0_0_12px_rgba(147,51,234,0.6)]' 
                : 'text-zinc-900 hover:text-purple-600'
            }`}
          >
            CART ({totalCartUnits})
          </button>
        </nav>

        <div className="flex-1">
          <Routes>
            {/* Added onAddToCart to the Home Route */}
            <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
            {/* Reverted Shop Route */}
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
          </Routes>
        </div>

        {isCartOpen && (
          <div 
            className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-40 transition-opacity"
            onClick={handleCloseDrawer}
          ></div>
        )}

        <div 
          className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
            isCartOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex justify-between items-center p-6 border-b border-zinc-200">
            <h2 className="text-xl font-black uppercase tracking-tighter">Your Vault</h2>
            <button 
              onClick={handleCloseDrawer}
              className="text-zinc-400 hover:text-purple-600 font-bold text-sm uppercase tracking-widest"
            >
              close
            </button>
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
              <button 
                onClick={handleCloseDrawer}
                className="w-full bg-zinc-900 text-white py-4 rounded-full font-bold uppercase tracking-wide hover:bg-purple-600 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 p-6 overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-500">
                    <p>Your vault is currently empty.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {cartItems.map((item, index) => (
                      <div key={index} className="flex gap-4 items-center group/item">
                        <div className="w-20 h-20 bg-zinc-100 rounded-sm overflow-hidden flex-shrink-0 relative">
                          <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                          {item.quantity > 1 && (
                            <div className="absolute top-1 left-1 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                              x{item.quantity}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col flex-1">
                          <div className="flex justify-between items-start">
                            <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">{item.brand}</span>
                            <button 
                              onClick={() => handleRemoveItem(index)}
                              className="text-zinc-300 hover:text-red-500 transition-colors font-bold text-xs"
                              title="Remove item"
                            >
                              ✕
                            </button>
                          </div>
                          <h4 className="font-bold text-sm leading-tight mt-1 pr-4">{item.name}</h4>
                          <div className="flex items-center justify-between mt-1">
                            <span className="font-medium text-purple-600 text-sm">£{item.price}</span>
                            <span className="text-xs font-bold text-zinc-400">Qty: {item.quantity}</span>
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
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-zinc-900 text-white py-4 rounded-full font-bold uppercase tracking-wide hover:bg-purple-600 transition-colors"
                  >
                    Checkout Securely
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <footer className="border-t border-zinc-200 py-10 px-6 flex flex-col md:flex-row justify-between items-center text-xs font-bold tracking-widest uppercase text-zinc-400 mt-auto">
          <span className="mb-4 md:mb-0">© 2026 Condition 10. Educational Project.</span>
          <div className="flex gap-6 md:gap-10">
            <a href="#" className="hover:text-purple-600 text-zinc-900">Behance</a>
            <a href="#" className="hover:text-purple-600 text-zinc-900">Instagram</a>
          </div>
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;