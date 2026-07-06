import React, { useState } from 'react';
import { featuredSneakers } from '../products';
import HoverSlideshow from './HoverSlideshow';

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');

  let displayedSneakers = featuredSneakers.filter(shoe => {
    const matchesBrand = selectedBrand === 'All' || shoe.brand.toLowerCase() === selectedBrand.toLowerCase();
    const matchesGender = selectedGender === 'All' || shoe.gender === selectedGender || shoe.gender === 'Unisex';
    const matchesColor = selectedColor === 'All' || shoe.color.toLowerCase().includes(selectedColor.toLowerCase());
    
    const searchWords = searchQuery.toLowerCase().split(' ').filter(word => word.length > 0);
    const searchableText = `${shoe.name} ${shoe.brand}`.toLowerCase(); 
    const matchesSearch = searchWords.every(word => searchableText.includes(word));
    
    return matchesBrand && matchesGender && matchesColor && matchesSearch; 
  });

  const filterColors = ['All', 'White', 'Black', 'Grey', 'Brown', 'Multi'];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      
      {/* ⚠️ Make sure your actual AI Search Bar and Brand/Gender filter buttons are pasted right here! ⚠️ */}
      
      {/* 3. The New Color Pills UI */}
      <div className="flex flex-wrap gap-2 my-6">
        <span className="text-sm font-bold tracking-widest uppercase flex items-center mr-4">
          Colorway:
        </span>
        {filterColors.map(color => (
          <button 
            key={color}
            onClick={() => setSelectedColor(color)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
              selectedColor === color 
                ? 'bg-black text-white border-black shadow-md' 
                : 'bg-white text-black border-gray-300 hover:border-black'
            }`}
          >
            {color}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {displayedSneakers.length > 0 ? (
          displayedSneakers.map(shoe => (
             <div key={shoe.id} className="group relative">
               <HoverSlideshow images={shoe.images} />
               <div className="mt-4 flex justify-between">
                 <div>
                   <h3 className="text-sm font-bold text-gray-900">{shoe.brand}</h3>
                   <p className="text-sm text-gray-500">{shoe.name}</p>
                 </div>
                 <p className="text-sm font-medium text-purple-600">£{shoe.price}</p>
               </div>
             </div>
          ))
        ) : (
          <div className="col-span-full py-16 px-4 flex flex-col items-center justify-center text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
            <h2 className="text-2xl font-black uppercase mb-2">No Matches Found in the Vault</h2>
            <p className="text-gray-500 mb-6 max-w-md text-sm">
              We couldn't find exactly what you're looking for. The AI works best when you are specific about brands, colors, or styles.
            </p>
            
            <div className="text-left bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 w-full max-w-md">
              <p className="text-xs font-bold tracking-widest text-gray-400 mb-3 uppercase">Try asking things like:</p>
              <ul className="space-y-2 text-sm text-gray-700 font-medium">
                <li className="flex items-center gap-2"> "Show me white Adidas shoes under £150"</li>
                <li className="flex items-center gap-2"> "I need some dark Nike sneakers"</li>
                <li className="flex items-center gap-2"> "Do you have any grey New Balance?"</li>
              </ul>
            </div>

            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedBrand('All');
                setSelectedGender('All');
                setSelectedColor('All');
              }}
              className="bg-black text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-gray-800 transition-transform hover:scale-105 active:scale-95"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div> 
    </div> 
  );
}