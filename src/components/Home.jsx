import CountdownBanner from './CountdownBanner';
import AutoSlideshow from './AutoSlideshow';
import RecentlyViewedShelf from './RecentlyViewedShelf';

export default function Home({ inventory, onAddToCart, recentlyViewed }) {
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
            <AutoSlideshow sneakers={inventory} onAddToCart={onAddToCart} />
          </div>
        </div>
        <RecentlyViewedShelf items={recentlyViewed} />
      </div>
    </div>
  );
}