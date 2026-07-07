export default function About() {
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