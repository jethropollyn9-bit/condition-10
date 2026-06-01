import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';

const featuredSneakers = [
  {
    id: 1, brand: "Nike", name: "ACG Phassad 'Black/Yellow'", price: 110, gender: "Unisex", 
    description: "Nike ACG brings back a cult favourite with the Phassad, a 2003 trail runner rebuilt for modern missions, geared for everything from loose gravel to quick city detours. The tent‑inspired shroud buckles over the laces for a streamlined look, while layered uppers and a rugged, multi‑surface outsole keep you steady. Underfoot, Nike Air cushioning softens every step, prepped for any pace, from concrete corners to winding light trails",
    images: ["https://media.endclothing.com/media/f_auto,q_auto:eco,w_768/prodmedia/media/catalog/product/3/1/31-07-2025-BLR_HM7133-001_1_1.jpg"]
  },
  {
    id: 2, brand: "New Balance", name: "2002R Protection Pack x BAPE", price: 450, gender: "Unisex",
    description: "Releasing as part of the larger ‘Apes Together Strong’ collection, the BAPE x New Balance 2002R ’Grey Camo’ treats the lifestyle running shoe to a neutral makeover. Varying shades of grey are applied to the textile upper, covered in BAPE’s ABC camo print and reinforced with tonal suede overlays. Silver reflective detailing on the ‘N’ logo and wraparound shark tooth detailing offers added visibility in low-light conditions. Lightweight cushioning is provided by an off-white ABZORB midsole, supported underfoot by an N-ergy rubber outsole.",
    images: ["https://cms-cdn.thesolesupplier.co.uk/2021/03/bape-x-new-balance-2002r-grey-camo_w576_h576_pad_.jpg.webp", "https://cms-cdn.thesolesupplier.co.uk/2021/03/bape-x-new-balance-2002r-grey-camo-first-look-1_w768_h768_pad_.jpg.webp"]
  },
  {
    id: 3, brand: "Adidas", name: "Samba Classic", price: 110, gender: "Unisex",
    description: "The timeless classic. Originally designed for indoor football, the Samba has evolved into an absolute essential for everyday lifestyle wear.",
    images: ["https://cdn-images.farfetch-contents.com/14/61/07/56/14610756_50599485_1000.jpg", "https://cdn-images.farfetch-contents.com/14/61/07/56/14610756_50599488_1000.jpg"]
  },
  {
    id: 4, brand: "Jordan", name: "Air Jordan 1 'Chicago' (2015)", price: 1250, gender: "Unisex",
    description: "The Air Jordan 1 Retro High OG ‘Chicago Lost & Found’ brings back the iconic silhouette that started it all. Featuring the high-cut shape of the original 1985 release, the leather upper combines a white base with a black signature Swoosh and scarlet overlays at the forefoot and heel. Cracked black leather appears on the padded collar, while a vintage pre-yellowed finish is applied to the white rubber midsole. The vintage ‘80s aesthetic extends to the special packaging, highlighted by a damaged box plastered with sale stickers and topped with a mismatched replacement lid. An accompanying sales invoice is emblematic of a time when the Air Jordan 1 lingered on the shelves of mom and pop stores, eventually making their way into the hands of lucky customers at a steep discount. Limited-edition poster included with all orders, while supplies last.",
    images: ["https://cdn-images.farfetch-contents.com/13/15/76/97/13157697_21516295_1000.jpg", "https://cdn-images.farfetch-contents.com/13/15/76/97/13157697_21516297_1000.jpg"]
  },
  {
    id: 5, brand: "New Balance", name: "990v6 'Grey'", price: 200, gender: "Unisex",
    description: "Worn by supermodels in London and dads in Ohio. The v6 updates the legendary 990 lineage with FuelCell cushioning for ultimate comfort.",
    images: ["https://www.sevenstore.com/images/products/medium/4095835.jpg",]
  },
  {
    id: 6, brand: "puma", name: "Playmaker'Spray-Lakers", price: 190, gender: "Unisex",
    description: "Command the court with style and support in a pair of Playmaker Pros. Designed specifically for basketball, with a lightweight, breathable silhouette, comfortable cushioning, and tons of traction, you'll be balling like a boss.",
    images: ["https://cdn-images.farfetch-contents.com/26/60/66/97/26606697_61167142_1000.jpg", "https://cdn-images.farfetch-contents.com/26/60/66/97/26606697_61167096_1000.jpg"]
  },
  {
    id: 7, brand: "Nike", name: "SB Dunk Low 'Travis Scott'", price: 1800, gender: "Unisex",
    description: "The Travis Scott x Dunk Low SB shows off a unique patchwork motif on the upper, featuring a tan leather base with plaid quarter panels and paisley print overlays, the latter made to tear away to reveal hidden elephant print underneath. The dueling patterns are complemented by rope laces, Cactus Jack tongue tags and mismatched black and pink Swooshes on each shoe. A white midsole and tan rubber outsole anchor the complex design.",
    images: ["https://cdn-images.farfetch-contents.com/15/11/07/25/15110725_25718042_1000.jpg", "https://cdn-images.farfetch-contents.com/15/11/07/25/15110725_25718051_1000.jpg"]
  },
  {
    id: 8, brand: "Nike", name: "Corteiz x Nike Air Max 95 SP 'Rules the World - Sequoia'", price: 380, gender: "Unisex",
    description: "Designed in conjunction with the London-based streetwear brand, the Corteiz x Nike Air Max 95 SP ‘Rules the World - Sequoia’ makes over the retro running shoe with refreshed materials and a military-inspired color palette. Gradient olive green tones are executed on the upper, featuring a netted base with wavy leather side panels. Embroidered Corteiz branding adorns the lateral forefoot and heel, while the label’s Alcatraz logo graces the tongue patch. Lightweight cushioning arrives via a blacked-out polyurethane midsole, contrasted by exposed Air-sole units tinged in yellow.",
    images: ["https://cdn-images.farfetch-contents.com/20/49/51/10/20495110_50410038_1000.jpg", "https://cdn-images.farfetch-contents.com/20/49/51/10/20495110_50410037_1000.jpg"]
  },
  {
    id: 9, brand: "Nike", name: "Nike Vomero 5 trainers in white", price: 150, gender: "Unisex",
    description: "Innovative sportswear? Check. Streetwear? Check. If it wasn’t *super* obvious yet, we’re talking about Nike. With the best-selling trainers in the game, scroll our Nike at ASOS edit to score everything from Air Force 1s and Air Max 90s to Blazers (now we’re cooking). Searching for techy T-shirts and joggers that’ll support your workout? Browse Nike Training, Nike Running and Nike Football for clothes and sports accessories – think: arm bands and fitness aids. If hoops are more your thing, look to Nike Basketball and rep your fave team in pieces that combine the vibe of basketball street style and the NBA.",
    images: ["https://cdn-images.farfetch-contents.com/32/90/74/05/32907405_63343652_1000.jpg", "https://cdn-images.farfetch-contents.com/32/90/74/05/32907405_63343652_1000.jpg"]
  },
  {
    id: 10, brand: "New Balance", name: "Ellipse v1 sneakers'White/blue'", price: 120, gender: "Unisex",
    description: "The iconic New Balance Classic Leather returns with a fresh colorway and updated materials for a modern take on a timeless design.",
    images: ["https://cdn-images.farfetch-contents.com/35/25/38/36/35253836_67010991_1000.jpg", "https://cdn-images.farfetch-contents.com/35/25/38/36/35253836_67011006_1000.jpg"]
  },
  {
    id: 11, brand: "Nike", name: "Jordan 1 Retro Low OG SP 'Travis Scott Mocha'", price: 120, gender: "Unisex",
    description: "Building off the success of their previous collaborations, Travis Scott adds yet another new design to his collaborative relationship with Jumpman via the Air Jordan 1 Low Travis Scott. Features a black upper with dark brown overlays and red accents on the branding, plus his signature backwards Swoosh.",
    images: ["https://imagedelivery.net/2DfovxNet9Syc-4xYpcsGg/6dd300b6-fa75-4640-a21b-fda47733ac00/product", "https://imagedelivery.net/2DfovxNet9Syc-4xYpcsGg/68e16d12-0cc7-44f2-1582-d7482b54ab00/product"]
  },
  {
    id: 12, brand: "Asics", name: "Gel-Kayano 14 'Cream/Sweet Pink'", price: 150, gender: "Unisex",
    description: "The GEL-KAYANO 14 sneaker resurfaces with its late 2000s aesthetic as a nod to our storied GEL-KAYANO series. Inspired by the original tooling from 2008, this shoe also features GEL technology underfoot for advanced impact absorption.",
    images: ["https://cdn-images.farfetch-contents.com/36/25/58/42/36255842_68513280_1000.jpg", "https://cdn-images.farfetch-contents.com/36/25/58/42/36255842_68514117_1000.jpg"]
  },
  {
    id: 13, brand: "Maison Mihara Yasuhiro", name: "Hank OG Sole Low Canvas Sneakers", price: 140, gender: "Unisex",
    description: "For a sporty inspired finish to your footwear rotation, look to the Hank low original sole sneaker from Maison Mihara Yasuhiro. This iteration adds an experimental spin on a classic varsity silhouette.",
    images: ["https://www.sevenstore.com/images/products/medium/4093266.jpg"]
  },
  {
    id: 14, brand: "Miu Miu", name: "Miu Miu X New Balance 530 'Cinnamon'", price: 150, gender: "Unisex",
    description: "This exclusive style is the result of a collaboration between Miu Miu and New Balance. Miu Miu completely renews the structure, making it ultra-light, and plays with laces with chromatic contrast.",
    images: ["https://www.miumiu.com/content/dam/miumiubkg_products/5/5E1/5E165E/Z5OF0401/5E165E_Z5O_F0401_F_D005_SLR.jpg"]
  },
  {
    id: 15, brand: "adidas", name: "Deer-est Tokyo Mary Jane 'Brown Desert'", price: 160, gender: "Women",
    description: "SHOES FEATURING A SMOOTH NYLON UPPER FOR A RETRO-SPORTY LOOK. Embrace the spirit of the 70s with the Tokyo Shoes, where vintage terrace style meets modern streetwear.",
    images: ["https://assets.adidas.com/images/w_600,f_auto,q_auto/83859e9fb2e64e2bbe108fca79f03e39_9366/TOKYO_SHOES_Brown_KJ7543_HM1.jpg"]
  },
  {
    id: 16, brand: "Onitsuka Tiger", name: "Mexico 66 'Yellow/Black'", price: 130, gender: "Unisex",
    description: "The MEXICO 66 model combines the features of the original LIMBER-UP training shoe that debuted in 1961 and the design of Limber shoe debuted in 1966.",
    images: ["https://images.asics.com/is/image/asics/1183C102_751_SB_FR_GLB?qlt=80&wid=1280&hei=1452&bgc=255,255,255&resMode=bisharp"]
  },
  {
    id: 17, brand: "Lanvin", name: "Curb Sneakers in Canvas 'Camel'", price: 120, gender: "Unisex",
    description: "The Curb sneaker embodies the vibrant spirit of the 90s, with its bold, oversized silhouette and signature oversized laces made in Greece.",
    images: ["https://gb.lanvin.com/cdn/shop/files/FU-SKDK12-CANV-P2666S3_2.jpg?v=1776263394&width=1600"]
  },
  {
    id: 18, brand: "adidas", name: "Samba Lt 'White'", price: 110, gender: "Unisex",
    description: "ICONIC SAMBA SHOES WITH A CHIC LOOK AND BOLD FOOTBALL-INSPIRED DETAILS. Lace up in legendary style with an oversized football-inspired tongue.",
    images: ["https://assets.adidas.com/images/w_766,h_766,f_auto,q_auto,fl_lossy,c_fill,g_auto/2ea4c9255c5d40f2ade30ef9361219f0_9366/Samba_LT_Shoes_White_IG4279_00_plp_standard.jpg"]
  },
  {
    id: 19, brand: "puma", name: "Speedcat Suede Ballet 'White'", price: 180, gender: "Women",
    description: "Rewrite the classics with Speedcat Ballet, a new iteration of the PUMA Speedcat. Drawing inspiration from classic ballet flats.",
    images: ["https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_900,h_900/global/401287/01/sv01/fnd/GBR/fmt/png/Speedcat-Suede-Ballet-Shoes-Women"]
  },
  {
    id: 20, brand: "adidas", name: "mary jane 'White'", price: 160, gender: "Women",
    description: "THE CLASSIC SAMBA SHOES, REIMAGINED AS MARY JANES. The adidas Samba shoes get a modern makeover, blending into a trendy Mary Jane aesthetic.",
    images: ["https://assets.adidas.com/images/w_600,f_auto,q_auto/262ed28d087145dca9e94427bb2b3bd5_faec/Samba_Jane_Shoes_White_JR1402_db01_00_standard.tiff.jpg"]
  }
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HoverSlideshow({ images, altText }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval;
    if (isHovered && images.length > 1) {
      interval = setInterval(() => setCurrentIndex((prev) => (prev + 1) % images.length), 800); 
    } else {
      setCurrentIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  return (
    <div className="w-full h-full relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <img src={images[currentIndex]} alt={altText} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      {isHovered && images.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
          {images.map((_, i) => (
            <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-4 bg-purple-600' : 'w-1.5 bg-white/60'}`} />
          ))}
        </div>
      )}
    </div>
  );
}

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

function CountdownBanner() {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = String(Math.floor(timeLeft / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  return (
    <div className="w-full bg-purple-700 text-white py-3 px-6 flex flex-col md:flex-row justify-center items-center gap-4 text-xs font-bold tracking-widest uppercase shadow-md relative z-40">
      <span className="text-white text-[15px] animate-pulse">Shock Drop In:</span>
      <div className="flex gap-2 text-sm tabular-nums">
        <span>{hours}<span className="text-white-500 text-[30px] ml-1">:HR</span></span>
        <span>{minutes}<span className="text-white-500 text-[30px] ml-1">:MIN</span></span>
        <span>{seconds}<span className="text-white-500 text-[30px] ml-1">:SEC</span></span>
      </div>
      <button className="bg-white text-zinc-900 px-4 py-1.5 rounded-full text-[10px] hover:bg-zinc-900 hover:text-white transition-colors cursor-pointer shadow-sm active:scale-95">
        Notify Me
      </button>
    </div>
  );
}

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

function QuickViewModal({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const availableSizes = ['UK 5', 'UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12'];

  if (!product) return null;

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
           <button disabled={!selectedSize} onClick={() => { onAddToCart({ ...product, selectedSize }); onClose(); }} className={`py-4 rounded-full font-bold uppercase tracking-widest transition-all shadow-xl ${selectedSize ? 'bg-zinc-900 text-white hover:bg-purple-600 hover:shadow-2xl active:scale-95 cursor-pointer' : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'}`}>
              {selectedSize ? 'Add to Cart' : 'Select a Size'}
           </button>
        </div>
      </div>
    </div>
  );
}

function Home({ onAddToCart, recentlyViewed }) {
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
            <AutoSlideshow sneakers={featuredSneakers} onAddToCart={onAddToCart} />
          </div>
        </div>
        <RecentlyViewedShelf items={recentlyViewed} />
      </div>
    </div>
  );
}

function Shop({ onQuickView, recentlyViewed }) {
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [sortOrder, setSortOrder] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(2000);
  const [searchQuery, setSearchQuery] = useState('');
  const allBrands = ['All', ...new Set(featuredSneakers.map(shoe => shoe.brand))];

  let displayedSneakers = featuredSneakers.filter(shoe => {
    const matchesBrand = selectedBrand === 'All' || shoe.brand === selectedBrand;
    const matchesGender = selectedGender === 'All' || shoe.gender === selectedGender || shoe.gender === 'Unisex';
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = shoe.name.toLowerCase().includes(searchLower) || shoe.brand.toLowerCase().includes(searchLower) || shoe.description.toLowerCase().includes(searchLower);
    return matchesBrand && matchesGender && matchesSearch; 
  });

  if (sortOrder === 'price-low') displayedSneakers.sort((a, b) => a.price - b.price);
  else if (sortOrder === 'price-high') displayedSneakers.sort((a, b) => b.price - a.price);

  displayedSneakers = displayedSneakers.filter(shoe => shoe.price <= maxPrice);

  return (
    <div className="pt-32 pb-24 px-6 max-w-[1400px] mx-auto min-h-screen">
      <div className="flex flex-col gap-6 mb-10 border-b border-zinc-200 pb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">The Inventory</h1>
            <span className="text-zinc-400 font-bold text-sm tracking-widest uppercase">{displayedSneakers.length} Items</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <input type="text" placeholder="SEARCH INVENTORY" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-zinc-100 text-zinc-900 text-xs font-bold tracking-widest uppercase px-5 py-2.5 rounded-full outline-none w-full sm:w-64 focus:ring-2 focus:ring-purple-600 transition-all placeholder:text-zinc-400 border-none" />
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="w-full sm:w-auto bg-zinc-100 text-zinc-900 text-xs font-bold tracking-widest uppercase px-5 py-2.5 rounded-full outline-none cursor-pointer border-none appearance-none pr-10" style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2318181b%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px top 50%', backgroundSize: '10px auto' }}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
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
          <button onClick={() => { setSearchQuery(''); setSelectedBrand('All'); setMaxPrice(2000); }} className="mt-6 bg-zinc-900 text-white px-6 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-purple-600 transition-colors shadow-lg cursor-pointer">Reset Filters</button>
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
            </Link>
          ))}
        </div>
      )}
      <RecentlyViewedShelf items={recentlyViewed} />
    </div>
  );
}

function ProductDetail({ onAddToCart, onTrackView }) {
  const { id } = useParams();
  const product = featuredSneakers.find(shoe => shoe.id === parseInt(id));
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
          <button disabled={!selectedSize} onClick={() => onAddToCart({ ...product, selectedSize })} className={`py-5 rounded-full font-bold uppercase tracking-widest transition-all shadow-xl ${selectedSize ? 'bg-zinc-900 text-white hover:bg-purple-600 hover:shadow-2xl active:scale-95 cursor-pointer' : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'}`}>
            {selectedSize ? 'Add to Cart' : 'Select a Size'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Security() {
  return (
    <div className="pt-40 pb-24 px-6 max-w-[1200px] mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4">The Vault is <span className="text-purple-600">Secure</span></h1>
        <p className="text-zinc-500 font-bold tracking-widest uppercase text-sm">Our 3-Step Authentication Process</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-zinc-100 p-10 rounded-2xl flex flex-col items-start shadow-sm">
          <span className="text-4xl font-black text-purple-600 mb-6">01</span>
          <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Visual Inspection</h3>
          <p className="text-zinc-500 leading-relaxed">Our experts examine the overall shape, stitching patterns, and manufacturing tolerances. We check the box label fonts, date codes, and retail packaging against our database of verified retail releases.</p>
        </div>
        <div className="bg-zinc-100 p-10 rounded-2xl flex flex-col items-start shadow-sm">
          <span className="text-4xl font-black text-purple-600 mb-6">02</span>
          <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Material Verification</h3>
          <p className="text-zinc-500 leading-relaxed">Using UV technology, we inspect for hidden stamps, glue marks, and counterfeit signatures. We verify the texture, smell, and flexibility of the leathers, suedes, and outsoles.</p>
        </div>
        <div className="bg-zinc-100 p-10 rounded-2xl flex flex-col items-start shadow-sm">
          <span className="text-4xl font-black text-purple-600 mb-6">03</span>
          <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Condition <span className="text-purple-600">10</span> Tagging</h3>
          <p className="text-zinc-500 leading-relaxed">Once a sneaker passes our rigorous checklist and is confirmed as deadstock (unworn and flawless), it is secured with our tamper-evident Condition <span className="text-purple-600">10</span> holographic tag. Your absolute guarantee of authenticity.</p>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="pt-40 pb-24 px-6 max-w-[1200px] mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4">About <span className="text-purple-600">Us</span></h1>
        <p className="text-zinc-500 font-bold tracking-widest uppercase text-sm">The Story of Condition <span className="text-purple-600">10</span></p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter">Built for the <span className="text-purple-600">Purists</span></h2>
          <p className="text-zinc-500 text-lg leading-relaxed">Founded in 2026, Condition <span className="text-purple-600">10</span> was born out of frustration. The sneaker aftermarket had become too noisy, too risky, and too crowded. We wanted a place where collectors didn't have to second-guess what they were buying.</p>
          <p className="text-zinc-500 text-lg leading-relaxed">We bypass the standard aftermarket to provide a curated, high-end experience for collectors who demand pristine condition and absolute authenticity. No fakes. No damaged boxes. Just Condition <span className="text-purple-600">10</span>.</p>
        </div>
        <div className="bg-zinc-100 rounded-2xl overflow-hidden shadow-2xl aspect-square"><img src="https://media.istockphoto.com/id/1818455456/photo/shopping-travel-dubai-united-arab-emirates.jpg?s=612x612&w=0&k=20&c=FQkdZYxwvN_ynl56ZJDJBWR9OKe8D8UaFBdcLfsvCG4=" alt="Sneaker Collection" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105" /></div>
      </div>
    </div>
  );
}

function Auth({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin({ email: email, name: email.split('@')[0] || 'Sneakerhead' });
      setIsLoading(false);
      navigate('/'); 
    }, 2000);
  };

  return (
    <div className="pt-40 pb-24 px-6 max-w-[500px] mx-auto min-h-screen flex flex-col justify-center">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">
          {isSignUp ? 'Create Vault Access' : 'Enter The Vault'}
        </h1>
        <p className="text-zinc-500 text-sm font-bold tracking-widest uppercase">
          {isSignUp ? <span className="text-purple-600">Join Condition 10</span> : <span className="text-purple-600">Secure Login</span>}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-zinc-100 p-8 rounded-2xl shadow-sm">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold tracking-widest uppercase text-zinc-500">Email Address</label>
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white px-5 py-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-600 transition-all font-medium text-sm border border-zinc-200"
            placeholder="collector@example.com"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold tracking-widest uppercase text-zinc-500">Password</label>
          <input 
            type="password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white px-5 py-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-600 transition-all font-medium text-sm border border-zinc-200"
            placeholder="••••••••"
          />
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className="w-full bg-zinc-900 text-white py-4 rounded-full font-bold uppercase tracking-wide hover:bg-purple-600 transition-colors shadow-md mt-2 cursor-pointer"
        >
          {isLoading ? 'Securing Connection...' : isSignUp ? 'Create Account' : 'Sign In'}
        </button>
      </form>

      <div className="mt-8 text-center">
        <button 
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-xs font-bold tracking-widest uppercase text-zinc-400 hover:text-purple-600 transition-colors cursor-pointer"
        >
          {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartGlowing, setIsCartGlowing] = useState(false);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [glowingItemIndex, setGlowingItemIndex] = useState(null);
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTrackView = (shoe) => setRecentlyViewed((prev) => [shoe, ...prev.filter(item => item.id !== shoe.id)].slice(0, 4));

  const handleAddToCart = (shoeData) => {
    const itemSize = shoeData.selectedSize || 'UK 9';
    setCartItems(prev => {
      const index = prev.findIndex(item => item.id === shoeData.id && item.selectedSize === itemSize);
      if (index >= 0) {
        const newCart = [...prev];
        newCart[index] = { ...newCart[index], quantity: newCart[index].quantity + 1 };
        return newCart;
      }
      return [...prev, { ...shoeData, quantity: 1, selectedSize: itemSize }];
    });
    setIsCartGlowing(true);
    setTimeout(() => setIsCartGlowing(false), 300);
  };

  const handleRemoveItem = (indexToRemove) => {
    setCartItems(prevItems => prevItems.filter((_, index) => index !== indexToRemove));
  };

  const handleUpdateQuantity = (index, amount) => {
    if (amount === 1) { setGlowingItemIndex(index); setTimeout(() => setGlowingItemIndex(null), 300); }
    setCartItems(prev => {
      const newCart = [...prev];
      const newQuantity = newCart[index].quantity + amount; 
      return newQuantity < 1 ? prev.filter((_, i) => i !== index) : Object.assign(newCart, { [index]: { ...newCart[index], quantity: newQuantity }});
    });
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
      <ScrollToTop /> 
      
      <div className="min-h-screen bg-white text-zinc-900 font-sans overflow-x-hidden relative flex flex-col">
        
        <nav className="fixed top-0 w-full z-[100] bg-white/90 backdrop-blur-md flex justify-between items-center p-4 md:p-6 shadow-xl shadow-zinc-900/10">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-black tracking-tighter uppercase cursor-pointer z-[110]">Condition<span className="text-purple-600">10</span></Link>
          
          <div className="hidden md:flex items-center gap-12 text-[10px] font-bold tracking-widest uppercase text-zinc-400">
            <Link to="/shop" className="hover:text-purple-600 cursor-pointer">Inventory</Link>
            <Link to="/security" className="hover:text-purple-600 cursor-pointer">Security</Link>
            <Link to="/about" className="hover:text-purple-600 cursor-pointer">About Us</Link>
          </div>

          <div className="flex items-center gap-4 md:gap-6 z-[110]">
            {currentUser ? (
              <div className="hidden sm:flex items-center gap-4">
                <span className="font-bold text-[10px] tracking-widest uppercase text-purple-600">Hello, {currentUser.name}</span>
                <button onClick={() => setCurrentUser(null)} className="text-[10px] font-bold tracking-widest uppercase text-zinc-400 hover:text-red-500 cursor-pointer">Logout</button>
              </div>
            ) : (
              <Link to="/auth" className="hidden sm:block font-bold text-[10px] tracking-widest uppercase text-zinc-400 hover:text-purple-600 cursor-pointer">Log In</Link>
            )}
            
            <button onClick={() => setIsCartOpen(true)} className={`font-bold text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer ${isCartGlowing ? 'text-purple-600 scale-125 drop-shadow-[0_0_12px_rgba(147,51,234,0.6)]' : 'text-zinc-900 hover:text-purple-600'}`}>CART ({totalCartUnits})</button>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="group md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1 cursor-pointer ml-2">
              <span className={`block w-5 h-0.5 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5 bg-zinc-900 group-hover:bg-red-500 group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'bg-zinc-900 group-hover:bg-purple-600 group-hover:drop-shadow-[0_0_8px_rgba(147,51,234,0.8)]'}`}></span>
              <span className={`block w-5 h-0.5 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 bg-zinc-900' : 'bg-zinc-900 group-hover:bg-purple-600 group-hover:drop-shadow-[0_0_8px_rgba(147,51,234,0.8)]'}`}></span>
              <span className={`block w-5 h-0.5 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5 bg-zinc-900 group-hover:bg-red-500 group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'bg-zinc-900 group-hover:bg-purple-600 group-hover:drop-shadow-[0_0_8px_rgba(147,51,234,0.8)]'}`}></span>
            </button>
          </div>
        </nav>

        <div className={`fixed inset-0 bg-white z-[90] flex flex-col justify-center items-center gap-8 transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-black uppercase tracking-tighter hover:text-purple-600">Inventory</Link>
          <Link to="/security" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-black uppercase tracking-tighter hover:text-purple-600">Security</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-black uppercase tracking-tighter hover:text-purple-600">About Us</Link>
          
          <div className="mt-8 flex flex-col items-center gap-4">
            {!currentUser ? (
              <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-purple-600">Log In / Register</Link>
            ) : (
              <>
                <span className="font-bold text-xs tracking-widest uppercase text-purple-600">Vault Access: {currentUser.name}</span>
                <button onClick={() => { setCurrentUser(null); setIsMobileMenuOpen(false); }} className="text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-red-500">Logout</button>
              </>
            )}
          </div>
        </div>

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home onAddToCart={handleAddToCart} recentlyViewed={recentlyViewed} />}/>            
            <Route path="/shop" element={<Shop onQuickView={(shoe) => { setQuickViewItem(shoe); handleTrackView(shoe); }} recentlyViewed={recentlyViewed} />}/>
            <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} onTrackView={handleTrackView} />} />               
            <Route path="/security" element={<Security />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Auth onLogin={(userData) => setCurrentUser(userData)} />} />
          </Routes>
        </div>

        <QuickViewModal product={quickViewItem} onClose={() => setQuickViewItem(null)} onAddToCart={handleAddToCart} />

        {isCartOpen && <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-[110] transition-opacity" onClick={handleCloseDrawer}></div>}

        <div className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-white z-[120] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center p-6 border-b border-zinc-200">
            <h2 className="text-xl font-black uppercase tracking-tighter">Your Vault</h2>
            <button onClick={handleCloseDrawer} className="text-zinc-400 hover:text-purple-600 font-bold text-sm uppercase tracking-widest cursor-pointer">close</button>
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
              <button onClick={handleCloseDrawer} className="w-full bg-zinc-900 text-white py-4 rounded-full font-bold uppercase tracking-wide hover:bg-purple-600 transition-colors cursor-pointer">Continue Shopping</button>
            </div>
          ) : (
            <>
              <div className="flex-1 p-6 overflow-y-auto">
                  {cartItems.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-zinc-500"><p>Your vault is currently empty.</p></div>
                  ) : (
                    <div className="flex flex-col gap-6">
                      {cartItems.map((item, i) => (
                        <div key={i} className="flex gap-4 items-center group/item">
                          <div className="w-20 h-20 bg-zinc-100 rounded-sm overflow-hidden flex-shrink-0 relative">
                            <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex flex-col flex-1">
                            <div className="flex justify-between items-start">
                              <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">{item.brand}</span>
                              <button onClick={() => handleRemoveItem(i)} className="text-zinc-300 hover:text-red-500 transition-colors font-bold text-xs cursor-pointer" title="Remove item">✕</button>
                            </div>
                            <h4 className="font-bold text-sm leading-tight mt-1 pr-4">{item.name}</h4>
                            
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex flex-col">
                                <span className="font-medium text-purple-600 text-sm">£{item.price}</span>
                                <span className="text-xs font-bold text-zinc-400 mt-0.5">Size: {item.selectedSize}</span>
                              </div>
                              
                              <div className="flex items-center gap-3 bg-zinc-100 rounded-full p-1 border border-zinc-200">
                                <button onClick={() => handleUpdateQuantity(i, -1)} className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white text-zinc-500 hover:text-zinc-900 transition-colors text-xs font-black cursor-pointer">-</button>
                                <span className={`text-xs w-3 text-center transition-all duration-300 font-bold ${glowingItemIndex === i ? 'text-purple-600 scale-150 drop-shadow-md' : 'text-zinc-900'}`}>{item.quantity}</span>
                                <button onClick={() => handleUpdateQuantity(i, 1)} className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white text-zinc-500 hover:text-zinc-900 transition-colors text-xs font-black cursor-pointer">+</button>
                              </div>
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
                  <button onClick={handleCheckout} className="w-full bg-zinc-900 text-white py-4 rounded-full font-bold uppercase tracking-wide hover:bg-purple-600 transition-colors cursor-pointer">
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
            <a href="#" className="hover:text-purple-600 text-zinc-900 cursor-pointer">Behance</a>
            <a href="#" className="hover:text-purple-600 text-zinc-900 cursor-pointer">Instagram</a>
          </div>
        </footer>

      </div>
    </BrowserRouter>
  );
}