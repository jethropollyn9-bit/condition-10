export default function Security() {
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