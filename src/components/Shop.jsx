import { useState } from 'react';
import { Link } from 'react-router-dom';
import HoverSlideshow from './HoverSlideshow';
import RecentlyViewedShelf from './RecentlyViewedShelf';

export default function Shop({ inventory, onQuickView, recentlyViewed }) {
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [sortOrder, setSortOrder] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(2000);
  const [searchQuery, setSearchQuery] = useState('');
  
  const allBrands = ['All', ...new Set(inventory.map(shoe => shoe.brand))];
  
  const [aiQuery, setAiQuery] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState(null);

  const handleAiSearch = async (e) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    setIsAiLoading(true);
    setAiFeedback(null);
    
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: aiQuery }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI response');
      }

      const aiFilters = await response.json();
      console.log("AI decided on these filters:", aiFilters);

      if (aiFilters.error) {
        setAiFeedback({ type: 'error', text: aiFilters.error });
      } else {
        setAiFeedback({ type: 'success', text: aiFilters.message || "These items match your search." });
        
        if (aiFilters.brand) setSelectedBrand(aiFilters.brand);
        if (aiFilters.gender) setSelectedGender(aiFilters.gender);
        if (aiFilters.maxPrice) setMaxPrice(aiFilters.maxPrice);
        if (aiFilters.searchQuery !== undefined) setSearchQuery(aiFilters.searchQuery);
      }

    } catch (error) {
      console.error("AI Search Error:", error);
      setAiFeedback({ type: 'error', text: "The Vault's AI is offline. Try a standard search." });
    } finally {
      setIsAiLoading(false);
      setAiQuery('');
    }
  };

  const handleReset = () => {
    setSearchQuery(''); 
    setSelectedBrand('All'); 
    setSelectedGender('All');
    setMaxPrice(2000);
    setAiFeedback(null); 
  };

  let displayedSneakers = inventory.filter(shoe => {
    const matchesBrand = selectedBrand === 'All' || shoe.brand.toLowerCase() === selectedBrand.toLowerCase();
    const matchesGender = selectedGender === 'All' || shoe.gender === selectedGender || shoe.gender === 'Unisex';
    const searchWords = searchQuery.toLowerCase().split(' ').filter(word => word.length > 0);
    const searchableText = `${shoe.name} ${shoe.brand} ${shoe.description}`.toLowerCase();
    const matchesSearch = searchWords.every(word => searchableText.includes(word));
    
    return matchesBrand && matchesGender && matchesSearch;
  });

  if (sortOrder === 'price-low') displayedSneakers.sort((a, b) => a.price - b.price);
  else if (sortOrder === 'price-high') displayedSneakers.sort((a, b) => b.price - a.price);

  displayedSneakers = displayedSneakers.filter(shoe => shoe.price <= maxPrice);

  return (
    <div className="pt-32 pb-24 px-6 max-w-[1400px] mx-auto min-h-screen">
      <div className="flex flex-col gap-6 mb-10 border-b border-zinc-200 pb-8">
        
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">The <span className="text-purple-500">1</span>nvent<span className="text-purple-500">0</span>ry</h1>
              <span className="text-zinc-400 font-bold text-sm tracking-widest uppercase">{displayedSneakers.length} Items</span>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              {/* Added logic to clear AI feedback when a user starts typing manually */}
              <input type="text" placeholder="STANDARD SEARCH" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setAiFeedback(null); }} className="bg-zinc-100 text-zinc-900 text-xs font-bold tracking-widest uppercase px-5 py-2.5 rounded-full outline-none w-full sm:w-64 focus:ring-2 focus:ring-purple-600 transition-all placeholder:text-zinc-400 border-none" />
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="w-full sm:w-auto bg-zinc-100 text-zinc-900 text-xs font-bold tracking-widest uppercase px-5 py-2.5 rounded-full outline-none cursor-pointer border-none appearance-none pr-10" style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2318181b%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px top 50%', backgroundSize: '10px auto' }}>
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <form onSubmit={handleAiSearch} className="w-full bg-purple-50 rounded-2xl p-4 border border-purple-100 flex flex-col sm:flex-row gap-3 items-center shadow-inner">
              <div className="flex-1 w-full flex items-center gap-3 bg-white px-5 py-3.5 rounded-xl shadow-sm border border-purple-50 focus-within:ring-2 focus-within:ring-purple-600 transition-all">
                <span className="text-xl">✨</span>
                <input 
                  type="text" 
                  placeholder='e.g., "Show me casual white trainers under £150"'
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-sm font-medium text-zinc-900 placeholder:text-zinc-400"
                  disabled={isAiLoading}
                />
              </div>
              <button 
                type="submit" 
                disabled={isAiLoading || !aiQuery.trim()}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold tracking-widest uppercase text-xs transition-all shadow-md flex justify-center items-center gap-2 ${isAiLoading || !aiQuery.trim() ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-zinc-900 hover:shadow-lg cursor-pointer'}`}
              >
                {isAiLoading ? 'Analyzing...' : 'Ask AI'}
              </button>
            </form>

            {/* NEW UI: The Feedback Banner */}
            {aiFeedback && (
              <div className={`w-full px-5 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all duration-300 shadow-sm border ${
                aiFeedback.type === 'error' 
                  ? 'bg-red-50 text-red-600 border-red-200' 
                  : 'bg-purple-100 text-purple-700 border-purple-200'
              }`}>
                {aiFeedback.type === 'error' ? '⚠️ ' : '✓ '}
                {aiFeedback.text}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mt-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {allBrands.map(brand => (
                <button key={brand} onClick={() => setSelectedBrand(brand)} className={`px-4 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-colors ${selectedBrand === brand ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}`}>{brand}</button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {['All', 'Men', 'Women', 'Unisex'].map(gender => (
                <button key={gender} onClick={() => setSelectedGender(gender)} className={`px-4 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-colors border ${selectedGender === gender ? 'bg-purple-100 border-purple-600 text-purple-600' : 'bg-white border-zinc-200 text-zinc-500 hover:border-purple-300'}`}>{gender}</button>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-full lg:w-72 shrink-0">
            <div className="flex justify-between items-center mb-2"><span className="text-purple-500 font-bold text-[10px] uppercase tracking-widest">Price range</span><span className="text-purple-600 font-black text-sm">£{maxPrice}</span></div>            
            <input type="range" min="0" max="2000" step="100" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className={`w-full h-3 bg-zinc-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:bg-center [&::-webkit-slider-thumb]:bg-no-repeat [&::-webkit-slider-thumb]:bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='32'%20height='32'%3E%3Ccircle%20cx='16'%20cy='16'%20r='14'%20fill='white'%20stroke='%239333ea'%20stroke-width='4'/%3E%3Ctext%20x='16'%20y='21'%20font-family='sans-serif'%20font-weight='900'%20font-size='14'%20fill='%239333ea'%20text-anchor='middle'%3E10%3C/text%3E%3C/svg%3E")]`} />
            <div className="flex justify-between w-full mt-2 text-[10px] font-bold text-zinc-400 tracking-widest">
              {[0, 500, 1000, 1500, 2000].map(val => (
                <button key={val} onClick={() => setMaxPrice(val)} className={`hover:text-purple-600 transition-colors ${maxPrice === val ? 'text-purple-600' : ''}`}>£{val}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {displayedSneakers.length === 0 ? (
        <div className="py-32 text-center animate-in fade-in duration-500">
          <p className="text-zinc-900 font-black text-xl uppercase tracking-tighter">No inventory found</p>
          <button onClick={handleReset} className="mt-6 bg-zinc-900 text-white px-6 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-purple-600 transition-colors shadow-lg cursor-pointer">Reset Filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {displayedSneakers.map((shoe) => (
            <Link to={`/product/${shoe.id}`} key={shoe.id} className="group cursor-pointer block">
              <div className="bg-zinc-100 aspect-square overflow-hidden rounded-xl mb-4 relative shadow-sm group/image">
                <HoverSlideshow images={shoe.images} altText={shoe.name} />
                <div className="absolute inset-0 bg-zinc-900/20 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button onClick={(e) => { e.preventDefault(); onQuickView(shoe); }} className="bg-white text-zinc-900 px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-purple-600 hover:text-white transition-all transform translate-y-4 group-hover/image:translate-y-0 shadow-xl cursor-pointer">Quick View</button>
                </div>
              </div>
              <div>{shoe.brand} - <span className="text-purple-600 font-bold">£{shoe.price}</span></div>
              <h3 className="font-bold text-lg leading-tight mt-1 group-hover:text-purple-600">{shoe.name}</h3>
              
              {shoe.stockLevel === 0 ? (
                <div className="mt-2.5 inline-block bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-sm shadow-sm">
                  Sold Out
                </div>
              ) : shoe.stockLevel < 5 && shoe.stockLevel > 0 ? (
                <div className="flex items-center gap-1.5 mt-2.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-red-500 text-[10px] font-black uppercase tracking-widest">
                    Only {shoe.stockLevel} left in vault
                  </span>
                </div>
              ) : null}
            </Link>
          ))}
        </div>
      )}
      <RecentlyViewedShelf items={recentlyViewed} />
    </div>
  );
}