import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, ArrowUpRight, Copy, Check, ArrowUp, Globe, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  const [time, setTime] = useState('');
  const [copied, setCopied] = useState(false);

  // Reloj en tiempo real (Girona/Madrid Time)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('info@equuselecta.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-12 pb-6 px-4 md:px-6 z-30 bg-stone-50">
      <div className="container mx-auto">
        
        {/* MAIN COMPACT CONTAINER */}
        <div className="bg-white rounded-[32px] border border-zinc-200 shadow-[0_2px_20px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
          
          {/* --- TOP: INFINITE MARQUEE --- */}
          <div className="bg-zinc-900 py-3 overflow-hidden relative flex items-center">
             <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-zinc-900 to-transparent z-10" />
             <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-zinc-900 to-transparent z-10" />
             
             <motion.div 
               className="whitespace-nowrap flex gap-8"
               animate={{ x: [0, -1000] }}
               transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
             >
                {[...Array(8)].map((_, i) => (
                  <span key={i} className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 flex items-center gap-8">
                     <span className="text-white">Elevating the Standard</span>
                     <span className="w-1 h-1 rounded-full bg-boutique-gold" />
                     <span>Excellence is our Habit</span>
                     <span className="w-1 h-1 rounded-full bg-boutique-gold" />
                  </span>
                ))}
             </motion.div>
          </div>

          {/* --- MIDDLE: SWISS GRID --- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[280px]">
            
            {/* LEFT: BIG INTERACTIVE EMAIL (Col 1-7) */}
            <div 
               onClick={handleCopyEmail}
               className="lg:col-span-7 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-zinc-100 flex flex-col justify-between group cursor-pointer hover:bg-zinc-50 transition-colors relative overflow-hidden"
            >
               <div className="flex justify-between items-start z-10">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 bg-white text-[9px] uppercase tracking-widest font-bold text-zinc-500">
                     <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                     Open for Business
                  </span>
                  <div className="text-zinc-400 group-hover:text-boutique-gold transition-colors">
                     <AnimatePresence mode='wait'>
                        {copied ? (
                           <motion.div
                              key="check"
                              initial={{ scale: 0, rotate: -90 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0 }}
                           >
                              <Check size={20} />
                           </motion.div>
                        ) : (
                           <motion.div
                              key="copy"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                           >
                              <Copy size={20} />
                           </motion.div>
                        )}
                     </AnimatePresence>
                  </div>
               </div>

               <div className="z-10 mt-8">
                  <p className="text-xs uppercase tracking-widest text-zinc-400 mb-2 group-hover:text-zinc-600 transition-colors">
                     {copied ? 'Copied to clipboard!' : 'Click to copy email'}
                  </p>
                  <h2 className="font-serif text-4xl md:text-6xl text-zinc-900 -tracking-[0.03em] leading-none group-hover:translate-x-2 transition-transform duration-500">
                     info@<br/>equuselecta.com
                  </h2>
               </div>
               
               {/* Background Pattern on Hover */}
               <div className="absolute -right-20 -bottom-20 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none">
                  <Globe size={300} />
               </div>
            </div>

            {/* RIGHT: COMPACT DETAILS (Col 8-12) */}
            <div className="lg:col-span-5 grid grid-rows-2">
               
               {/* Row 1: Location & Time */}
               <div className="p-8 border-b border-zinc-100 flex flex-col justify-between bg-white hover:bg-zinc-50 transition-colors">
                  <div className="flex justify-between items-start">
                     <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">HQ Location</span>
                     <Globe size={16} className="text-zinc-300" />
                  </div>
                  <div>
                     <p className="font-serif text-xl text-zinc-900">Girona, Spain</p>
                     <div className="flex items-center gap-2 mt-1 text-zinc-500 text-xs font-mono">
                        <Clock size={12} />
                        <span>{time} CET</span>
                     </div>
                  </div>
               </div>

               {/* Row 2: Links & Socials Grid */}
               <div className="grid grid-cols-2">
                  
                  {/* Socials */}
                  <div className="p-8 border-r border-zinc-100 hover:bg-zinc-50 transition-colors flex flex-col justify-between">
                     <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Social</span>
                     <div className="flex flex-col gap-3">
                        <a href="#" className="flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-boutique-gold transition-colors group">
                           <Instagram size={14} /> 
                           <span className="group-hover:translate-x-1 transition-transform">Instagram</span>
                        </a>
                        <a href="#" className="flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-boutique-gold transition-colors group">
                           <ArrowUpRight size={14} /> 
                           <span className="group-hover:translate-x-1 transition-transform">WhatsApp</span>
                        </a>
                     </div>
                  </div>

                  {/* Back to Top (Action) */}
                  <button 
                     onClick={scrollToTop}
                     className="relative p-8 hover:bg-zinc-900 group transition-all duration-500 flex flex-col justify-between items-start text-left overflow-hidden"
                  >
                     <span className="text-[10px] uppercase tracking-widest text-zinc-400 group-hover:text-zinc-500 font-bold z-10">
                        Back to Top
                     </span>
                     <div className="w-10 h-10 rounded-full border border-zinc-200 group-hover:border-zinc-700 flex items-center justify-center text-zinc-900 group-hover:text-white z-10 transition-colors">
                        <ArrowUp size={18} className="group-hover:-translate-y-1 transition-transform duration-300" />
                     </div>

                     {/* Fill Effect */}
                     <div className="absolute inset-0 bg-zinc-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] z-0" />
                  </button>

               </div>

            </div>
          </div>

          {/* --- BOTTOM: LEGAL STRIP --- */}
          <div className="bg-zinc-50 px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-zinc-100">
             <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-xs text-zinc-900">E.</span>
                <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">© 2026 Equuselecta</span>
             </div>
             
             <div className="flex gap-6">
                {['Privacy', 'Terms', 'Sitemap'].map((link) => (
                   <a key={link} href="#" className="text-[9px] uppercase tracking-widest text-zinc-400 hover:text-zinc-900 font-bold transition-colors">
                      {link}
                   </a>
                ))}
             </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
