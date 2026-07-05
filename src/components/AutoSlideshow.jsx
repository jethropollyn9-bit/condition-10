import { useState, useEffect } from 'react';

function AutoSlideshow({ sneakers, onAddToCart }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentIndex((prev) => (prev + 1) % sneakers.length), 3000); 
    return () => clearInterval(timer);
  }, [sneakers.length]);

  const currentShoe = sneakers[currentIndex];

  return (
    <div className="w-full h-full relative overflow-hidden bg-zinc-100 group">
      <img key={currentIndex} src={currentShoe.images[0]} alt={currentShoe.name} className="w-full h-full object-cover animate-in fade-in duration-700" />
      <div className="absolute inset-0 bg-zinc-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center z-20">
        <button onClick={(e) => { e.preventDefault(); onAddToCart(currentShoe); }} className="pointer-events-auto bg-white text-zinc-900 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-purple-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 shadow-2xl cursor-pointer">
          Quick Add
        </button>
      </div>
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-30">
        {sneakers.map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-8 bg-purple-600' : 'w-2 bg-white/50'}`} />
        ))}
      </div>
    </div>
  );
}

export default AutoSlideshow;