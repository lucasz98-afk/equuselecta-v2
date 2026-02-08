import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Award, Ruler, MapPin, Sparkles, Dna, ArrowRight } from 'lucide-react';
import { Horse, HorseCategory } from '../types';
import { HORSES } from '../data';

interface MarketplaceProps {
  category: HorseCategory;
  onHorseClick: (horse: Horse) => void;
}

const HorizontalCard: React.FC<{ horse: Horse; onClick: () => void; index: number }> = ({ horse, onClick, index }) => {
  // Format Price
  const priceFormatted = typeof horse.price === 'number' 
    ? `${(horse.price / 1000).toFixed(0)}k` 
    : 'P.O.A.';

  return (
    <motion.div 
      onClick={onClick}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative h-[65vh] md:h-[75vh] w-[85vw] md:w-[28vw] min-w-[300px] md:min-w-[420px] shrink-0 cursor-pointer overflow-hidden rounded-[40px] bg-zinc-900 border border-white/5 hover:border-white/20 transition-colors duration-500"
    >
      {/* --- IMAGE LAYER --- */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          src={horse.image} 
          alt={horse.name} 
          className="h-full w-full object-cover transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 grayscale-[100%] group-hover:grayscale-0 brightness-[0.8] group-hover:brightness-100"
        />
        {/* Cinematic Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
        
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-8">
        
        {/* TOP: Tags & Status */}
        <div className="flex items-start justify-between">
           <div className="flex flex-col gap-2 items-start">
              {/* Reference Tag */}
              <div className="backdrop-blur-md bg-white/5 border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-boutique-gold animate-pulse"></span>
                 <span className="text-[9px] font-bold uppercase tracking-widest text-white/90 font-sans">
                    Ref. {horse.id.split('-')[0].toUpperCase()}
                 </span>
              </div>
              
              {/* Elite Badge */}
              {horse.level === 'alto' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-boutique-gold text-black px-3 py-1 rounded-full flex items-center gap-1 shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                >
                  <Sparkles size={10} fill="black" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Elite Collection</span>
                </motion.div>
              )}
           </div>

           {/* Year Badge */}
           <div className="text-white/30 font-serif text-xl italic tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-4 group-hover:translate-x-0">
              2024
           </div>
        </div>

        {/* BOTTOM: Info Console */}
        <div className="relative">
          
          {/* Main Title Area */}
          <div className="mb-6 transform transition-transform duration-700 group-hover:-translate-y-4">
             {/* Discipline Label */}
             <div className="flex items-center gap-2 mb-2 text-white/50">
                <Dna size={12} className="text-boutique-gold" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">
                   {horse.category === 'doma' ? 'Dressage' : 'Showjumping'}
                </span>
             </div>

             {/* Giant Name */}
             <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-[0.85] tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-white group-hover:to-zinc-400 transition-all duration-500">
               {horse.name}
             </h2>
          </div>

          {/* Glass Specs Panel (Expands on Hover) */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[24px] p-1 overflow-hidden transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20">
             
             {/* Specs Strip */}
             <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                <div className="flex gap-6 md:gap-8">
                   <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-widest text-white/40 mb-1">Edad</span>
                      <span className="text-sm font-serif text-white">{horse.age} Años</span>
                   </div>
                   <div className="h-8 w-[1px] bg-white/10"></div>
                   <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-widest text-white/40 mb-1">Raza</span>
                      <span className="text-sm font-serif text-white truncate max-w-[80px]">{horse.breed}</span>
                   </div>
                   <div className="h-8 w-[1px] bg-white/10 hidden md:block"></div>
                   <div className="hidden md:flex flex-col">
                      <span className="text-[9px] uppercase tracking-widest text-white/40 mb-1">Alzada</span>
                      <span className="text-sm font-serif text-white">{horse.height}</span>
                   </div>
                </div>

                {/* Price Tag */}
                <div className="text-right">
                   <span className="text-[9px] uppercase tracking-widest text-boutique-gold block mb-1">Inversión</span>
                   <span className="font-serif text-xl text-white">{priceFormatted}</span>
                </div>
             </div>

             {/* Hidden "Explore" Action Bar (Reveals on Hover) */}
             <motion.div 
               initial={{ height: 0, opacity: 0 }}
               whileHover={{ height: 'auto', opacity: 1 }}
               className="group-hover:h-auto group-hover:opacity-100 h-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out"
             >
                <div className="flex items-center justify-between px-5 py-4 bg-white text-black">
                   <span className="text-xs font-bold uppercase tracking-[0.2em]">Ver Detalles Completos</span>
                   <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                      <ArrowRight size={14} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                   </div>
                </div>
             </motion.div>
          </div>

        </div>

      </div>
    </motion.div>
  );
};

export const Marketplace: React.FC<MarketplaceProps> = ({ category, onHorseClick }) => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const filteredHorses = category === 'all' 
    ? HORSES.slice(0, 8) 
    : HORSES.filter(h => h.category === category);

  // Transformación para scroll horizontal (Desktop)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <>
      {/* --- DESKTOP VIEW: HORIZONTAL SCROLL (Sticky) --- */}
      <section 
        ref={containerRef} 
        id="exemplars-list"
        className="hidden md:block relative h-[450vh] bg-black"
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-black">
          
          {/* Fondo decorativo fijo */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none z-0">
             <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-zinc-800 rounded-full blur-[150px] opacity-20"></div>
             <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-boutique-gold rounded-full blur-[150px] opacity-10"></div>
          </div>

          <motion.div style={{ x }} className="relative z-10 flex gap-8 lg:gap-16 px-12 lg:px-24 items-center">
            
            {/* Intro Card - Static in the flow */}
            <div className="min-w-[400px] max-w-[500px] flex flex-col justify-center pr-12">
               <div className="flex items-center gap-4 mb-8">
                  <span className="h-[1px] w-12 bg-white/30"></span>
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/50">The Collection</span>
               </div>
               
               <h2 className="font-serif text-7xl md:text-8xl text-white leading-[0.9] mb-8">
                 Select <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-boutique-gold to-white/50 italic">Specimens.</span>
               </h2>
               
               <p className="text-lg text-zinc-400 font-light leading-relaxed mb-12 border-l border-zinc-800 pl-6">
                 Una galería exclusiva curada bajo estándares de biomecánica superior. 
                 Deslice para auditar nuestra selección privada 2024.
               </p>
               
               <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white/30">
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center animate-bounce">
                     <ArrowRight size={12} className="rotate-90" />
                  </div>
                  <span>Scroll to Explore</span>
               </div>
            </div>

            {/* Horse Cards Strip */}
            {filteredHorses.map((horse, idx) => (
              <HorizontalCard 
                key={horse.id} 
                horse={horse} 
                index={idx}
                onClick={() => onHorseClick(horse)} 
              />
            ))}

            {/* "View All" End Card */}
            <div className="flex h-[75vh] min-w-[350px] items-center justify-center border-l border-white/10 pl-24">
               <button className="group relative flex flex-col items-center justify-center gap-8 text-white w-full h-full">
                  <div className="relative w-32 h-32">
                     <div className="absolute inset-0 rounded-full border border-white/10 group-hover:scale-125 transition-transform duration-700 ease-out"></div>
                     <div className="absolute inset-0 rounded-full border border-white/20 group-hover:scale-110 transition-transform duration-700 delay-75 ease-out"></div>
                     <div className="absolute inset-0 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-boutique-gold transition-colors duration-500">
                        <ArrowUpRight size={32} />
                     </div>
                  </div>
                  <span className="font-serif text-4xl italic text-zinc-400 group-hover:text-white transition-colors">Ver Todo el Catálogo</span>
               </button>
            </div>

          </motion.div>
        </div>
      </section>

      {/* --- MOBILE VIEW: VERTICAL LIST (Standard) --- */}
      <section 
        id="exemplars-list-mobile"
        className="block md:hidden bg-black py-24 px-4"
      >
         <div className="mb-16 text-center">
            <span className="text-boutique-gold text-xs font-bold uppercase tracking-[0.2em]">Selección 2024</span>
            <h2 className="mt-4 font-serif text-5xl text-white leading-none">Curated <br/><span className="italic text-zinc-500">Selection</span></h2>
         </div>

         <div className="flex flex-col gap-12">
            {filteredHorses.map((horse, idx) => (
              <HorizontalCard 
                key={horse.id} 
                horse={horse} 
                index={idx}
                onClick={() => onHorseClick(horse)} 
              />
            ))}
         </div>
         
         <div className="mt-20 text-center">
            <button className="text-xs uppercase tracking-widest text-zinc-500 border-b border-zinc-800 pb-2 hover:text-white hover:border-white transition-all">Ver catálogo completo</button>
         </div>
      </section>
    </>
  );
};
