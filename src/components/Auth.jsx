import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth({ onLogin }) {
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
          className="w-full bg-zinc-900 text-white py-4 rounded-full font-bold uppercase tracking-wide hover:bg-purple-600 transition-colors shadow-md mt-2 cursor-pointer flex justify-center items-center gap-3"
        >
          {isLoading ? 'Securing Connection...' : isSignUp ? 'Create Account' : 'Sign In'}
          <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full border border-white/30 tracking-widest">DEMO</span>
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