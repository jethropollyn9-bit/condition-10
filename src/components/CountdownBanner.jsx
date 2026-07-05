import { useState, useEffect } from 'react';

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

export default CountdownBanner;