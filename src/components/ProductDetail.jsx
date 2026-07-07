import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import HoverSlideshow from './HoverSlideshow';

export default function ProductDetail({ inventory, onAddToCart, onTrackView }) {
  const { id } = useParams();
  const product = inventory.find(shoe => shoe.id === parseInt(id));
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
          
          {/* REPAIRED ADD TO CART BUTTON */}
          <button 
            disabled={product.stockLevel === 0 || !selectedSize} 
            onClick={() => onAddToCart({ ...product, selectedSize })} 
            className={`py-5 rounded-full font-bold uppercase tracking-widest transition-all shadow-xl ${
              product.stockLevel === 0
                ? 'bg-zinc-200 text-zinc-500 cursor-not-allowed' 
                : selectedSize 
                  ? 'bg-zinc-900 text-white hover:bg-purple-600 hover:shadow-2xl active:scale-95 cursor-pointer' 
                  : 'bg-zinc-200 text-zinc-400 cursor-not-allowed' 
            }`}
          >
            {product.stockLevel === 0 ? 'Out of Stock' : selectedSize ? 'Add to Cart' : 'Select a Size'}
          </button>
          
        </div>
      </div>
    </div>
  );
}