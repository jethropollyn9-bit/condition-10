import { useState } from 'react';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartGlowing, setIsCartGlowing] = useState(false);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);

  const featuredSneakers = [
    {
      id: 1,
      brand: "Nike ACG",
      name: "Phassad 'Black/Yellow'",
      price: 110, 
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      brand: "New Balance",
      name: "2002R Protection Pack x BAPE",
      price: 450,
      image: "https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      brand: "Adidas",
      name: "Samba Classic",
      price: 110,
      image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  /**
   * Handles adding products to the cart array.
   */
  const handleQuickAdd = (shoeData) => {
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
  };

  /**
   * Removes a specific item from the cart state based on its array index.
   */
  const handleRemoveItem = (indexToRemove) => {
    setCartItems(prevItems => prevItems.filter((_, index) => index !== indexToRemove));
  };

  /**
   * Handles the mock checkout process.
   * Wipes the cart and triggers the success UI state.
   */
  const handleCheckout = () => {
    setCartItems([]);
    setIsCheckoutSuccess(true);
  };

  /**
   * Safely closes the drawer and resets checkout UI after the slide animation.
   */
  const handleCloseDrawer = () => {
    setIsCartOpen(false);
    setTimeout(() => setIsCheckoutSuccess(false), 300);
  };

  const totalCartUnits = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans overflow-x-hidden relative">
      
      <nav className="fixed top-0 w-full z-30 bg-white/90 backdrop-blur-md flex justify-between items-center p-6 border-b border-zinc-200">
        <div className="text-2xl font-black tracking-tighter uppercase">
          Condition<span className="text-purple-600">10</span>
        </div>
        <button 
          onClick={() => setIsCartOpen(true)}
          className={`font-bold text-sm tracking-wide transition-all duration-300 ${
            isCartGlowing 
              ? 'text-purple-600 scale-125 drop-shadow-[0_0_12px_rgba(147,51,234,0.6)]' 
              : 'text-zinc-900 hover:text-purple-600'
          }`}
        >
          CART ({totalCartUnits})
        </button>
      </nav>

      <main className="flex flex-col items-center justify-center pt-40 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase text-zinc-900">
          The Vault is <span className="text-purple-600">Open.</span>
        </h1>
        <p className="text-zinc-500 max-w-lg mb-10 text-lg">
          Premium deadstock sneakers. Authenticated and perfectly preserved.
        </p>
        <button className="bg-purple-600 text-white px-8 py-3 rounded-full font-bold hover:bg-purple-500 transition-colors shadow-lg hover:shadow-xl">
          SHOP NEW DROPS
        </button>
      </main>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex justify-between items-end mb-10 border-b border-zinc-200 pb-4">
          <h2 className="text-3xl font-black tracking-tighter uppercase">Latest Arrivals</h2>
          <a href="#" className="text-purple-600 font-bold text-sm hover:underline">VIEW ALL</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featuredSneakers.map((shoe) => (
            <div key={shoe.id} className="group cursor-pointer">
              
              <div className="bg-zinc-100 aspect-square overflow-hidden rounded-lg mb-4 relative">
                <img 
                  src={shoe.image} 
                  alt={shoe.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button 
                    onClick={() => handleQuickAdd(shoe)}
                    className="bg-zinc-900 text-white px-6 py-3 rounded-full font-bold uppercase text-sm shadow-xl hover:bg-purple-600 transition-colors"
                  >
                    Quick Add
                  </button>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-zinc-500 font-bold text-xs uppercase tracking-widest">{shoe.brand}</span>
                <h3 className="font-bold text-lg leading-tight mt-1">{shoe.name}</h3>
                <span className="font-medium text-purple-600 mt-2">£{shoe.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

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
            className="text-zinc-400 hover:text-zinc-900 font-bold text-sm uppercase tracking-widest"
          >
            close
          </button>
        </div>

        {/* Conditional Rendering: Success Screen vs Active Cart */}
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
                      <div className="w-20 h-20 bg-zinc-100 rounded-md overflow-hidden flex-shrink-0 relative">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
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

            {/* Only show checkout footer if there are items in the cart */}
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

      <footer className="border-t border-zinc-200 py-10 text-center text-zinc-400 text-sm mt-20">
        <p>© 2026 Condition 10. Educational portfolio project. Not a real store.</p>
      </footer>

    </div>
  )
}

export default App