import { useState } from 'react';

function App() {
  // Global state management
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false); // Tracks if the drawer is visible

  // Mock data payload representing featured storefront inventory
  const featuredSneakers = [
    {
      id: 1,
      brand: "Nike ACG",
      name: "Phassad 'Black/Yellow'",
      price: "£110",
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      brand: "New Balance",
      name: "2002R Protection Pack x BAPE",
      price: "£450",
      image: "https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      brand: "Adidas",
      name: "Samba Classic",
      price: "£110",
      image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  /**
   * Handles adding an item to the global cart state.
   */
  const handleQuickAdd = () => {
    setCartCount(prevCount => prevCount + 1);
    // Optional: You could also automatically open the drawer here by adding setIsCartOpen(true)
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans overflow-x-hidden">
      
      {/* Top Navigation */}
      <nav className="flex justify-between items-center p-6 border-b border-zinc-200">
        <div className="text-2xl font-black tracking-tighter uppercase">
          Condition<span className="text-purple-600">10</span>
        </div>
        {/* Wire up the cart button to open the drawer */}
        <button 
          onClick={() => setIsCartOpen(true)}
          className="font-bold text-sm tracking-wide hover:text-purple-600 transition-colors"
        >
          CART ({cartCount})
        </button>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center pt-24 px-6 text-center">
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

      {/* Featured Products Grid */}
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
                    onClick={handleQuickAdd}
                    className="bg-zinc-900 text-white px-6 py-3 rounded-full font-bold uppercase text-sm shadow-xl hover:bg-purple-600 transition-colors"
                  >
                    Quick Add
                  </button>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-zinc-500 font-bold text-xs uppercase tracking-widest">{shoe.brand}</span>
                <h3 className="font-bold text-lg leading-tight mt-1">{shoe.name}</h3>
                <span className="font-medium text-purple-600 mt-2">{shoe.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CART DRAWER UI --- */}
      
      {/* 1. Dark Background Overlay (Only shows if isCartOpen is true) */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsCartOpen(false)} // Clicking the background closes the drawer
        ></div>
      )}

      {/* 2. The Sliding Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center p-6 border-b border-zinc-200">
          <h2 className="text-xl font-black uppercase tracking-tighter">Your Vault</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="text-zinc-400 hover:text-zinc-900 font-bold text-xl"
          >
            ✕
          </button>
        </div>

        {/* Drawer Body (Where items will go later) */}
        <div className="flex-1 p-6 flex flex-col items-center justify-center text-zinc-500">
          <p className="mb-4">You have {cartCount} items in your cart.</p>
          {cartCount === 0 && <p className="text-sm">Your vault is currently empty.</p>}
        </div>

        {/* Drawer Footer (Checkout Button) */}
        <div className="p-6 border-t border-zinc-200">
          <button className="w-full bg-zinc-900 text-white py-4 rounded-full font-bold uppercase tracking-wide hover:bg-purple-600 transition-colors">
            Checkout Securely
          </button>
        </div>
      </div>

      <footer className="border-t border-zinc-200 py-10 text-center text-zinc-400 text-sm mt-20">
        <p>© 2026 Condition 10. Educational portfolio project. Not a real store.</p>
      </footer>

    </div>
  )
}

export default App