import { Link } from 'react-router-dom'; 

function RecentlyViewedShelf({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="mt-24 border-t border-zinc-200 pt-16 w-full">
      <h3 className="text-xl font-black uppercase tracking-tighter mb-8">Recently Viewed</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((shoe) => (
          <Link to={`/product/${shoe.id}`} key={shoe.id} className="group block cursor-pointer">
            <div className="bg-zinc-100 aspect-square rounded-xl overflow-hidden mb-3 shadow-sm">
              <img src={shoe.images[0]} alt={shoe.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400 block">{shoe.brand}</span>
            <h4 className="font-bold text-sm leading-tight mt-0.5 group-hover:text-purple-600 truncate">{shoe.name}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecentlyViewedShelf; 