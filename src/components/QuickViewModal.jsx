import { useState } from 'react';

export default function QuickViewModal({ product, cartItems = [], onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const availableSizes = ['UK 5', 'UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12'];

  if (!product) return null;
  const qtyInCart = cartItems.filter(item => item.id === product.id).reduce((sum, item) => sum + item.quantity, 0);
  const isMaxStockReached = qtyInCart >= product.stockLevel;

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
           
           {/* UPGRADED QUICK VIEW ADD TO CART BUTTON */}
           <button 
             disabled={product.stockLevel === 0 || !selectedSize || isMaxStockReached} 
             onClick={() => { onAddToCart({ ...product, selectedSize }); onClose(); }} 
             className={`py-4 rounded-full font-bold uppercase tracking-widest transition-all shadow-xl ${
               product.stockLevel === 0 || isMaxStockReached
                 ? 'bg-zinc-200 text-zinc-500 cursor-not-allowed' 
                 : selectedSize 
                   ? 'bg-zinc-900 text-white hover:bg-purple-600 hover:shadow-2xl active:scale-95 cursor-pointer' 
                   : 'bg-zinc-200 text-zinc-400 cursor-not-allowed' 
             }`}
           >
              {product.stockLevel === 0 
                ? 'Out of Stock' 
                : isMaxStockReached 
                  ? 'Vault Limit Reached' 
                  : selectedSize 
                    ? 'Add to Cart' 
                    : 'Select a Size'}
           </button>
        </div>
      </div>
    </div>
  );
}