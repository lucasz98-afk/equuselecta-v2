import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Sparkles } from 'lucide-react';
import { HorseCategory } from '../types';

interface HeroProps {
  onSelectCategory: (category: HorseCategory) => void;
}

const CATEGORIES: { id: HorseCategory; label: string; image: string; description: string; sub: string }[] = [
  { 
    id: 'doma', 
    label: 'Doma', 
    sub: 'Clásica',
    image: 'https://images.unsplash.com/photo-1551887196-72e32bfc7bf3?q=80&w=2529&auto=format&fit=crop', 
    description: 'La búsqueda de la perfección y la armonía absoluta.'
  },
  { 
    id: 'salto', 
    label: 'Salto', 
    sub: 'Elite',
    image: 'https://images.unsplash.com/photo-1613952778735-397577587123?q=80&w=2670&auto=format&fit=crop',
    description: 'Potencia explosiva y técnica de precisión.'
  }
];

export const Hero: React.FC<HeroProps> = ({ onSelectCategory }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full min-h-screen bg-stone-50 px-4 pb-4 pt-24 md:pt-4 md:px-6 md:pb-6 flex flex-col justify-end md:h-screen">
      
      {/* Container Principal con Rounded Corners Masivos */}
      <div className="flex-1 w-full flex flex-col md:flex-row gap-4 h-full relative z-10">
        
        {CATEGORIES.map((cat, index) => (
          <motion.div
            key={cat.id}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => onSelectCategory(cat.id)}
            className={`
              relative flex-1 overflow-hidden rounded-[40px] cursor-pointer transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]
              ${hoveredIndex === index ? 'md:flex-[1.5]' : 'md:flex-1'}
              ${hoveredIndex !== null && hoveredIndex !== index ? 'opacity-80 scale-[0.98]' : 'opacity-100 scale-100'}
            `}
          >
            {/* Background Image con Zoom Effect */}
            <div className="absolute inset-0 bg-black">
              <motion.img 
                src={cat.image} 
                alt={cat.label}
                className="w-full h-full object-cover opacity-80"
                animate={{ scale: hoveredIndex === index ? 1.1 : 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>

            {/* Contenido Editorial */}
            <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-between">
              
              {/* Top Label */}
              <div className="flex justify-between items-start">
                 <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                   <div className={`w-1.5 h-1.5 rounded-full ${index === 0 ? 'bg-indigo-300' : 'bg-rose-300'}`}></div>
                   Colección 2024
                 </span>
                 
                 <motion.div 
                   animate={{ rotate: hoveredIndex === index ? 45 : 0 }}
                   className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center"
                 >
                    <ArrowDownRight size={20} />
                 </motion.div>
              </div>

              {/* Bottom Typography */}
              <div>
                 <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white leading-[0.85] tracking-tight mb-6">
                   {cat.label}
                   <span className="block text-2xl md:text-4xl font-sans font-light italic text-white/60 mt-2 tracking-normal">
                     {cat.sub}
                   </span>
                 </h2>
                 
                 <motion.div
                   initial={{ height: 0, opacity: 0 }}
                   animate={{ 
                     height: hoveredIndex === index ? 'auto' : 0,
                     opacity: hoveredIndex === index ? 1 : 0
                   }}
                   className="overflow-hidden"
                 >
                    <p className="text-white/80 text-lg max-w-md font-light leading-relaxed border-l border-white/30 pl-6 mt-4">
                      {cat.description}
                    </p>
                 </motion.div>
              </div>
            </div>

          </motion.div>
        ))}

        {/* Central Badge (Floating Absolute) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none hidden md:block">
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="w-32 h-32 rounded-full border border-white/20 backdrop-blur-sm flex items-center justify-center bg-black/10"
           >
              <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                <path
                  id="curve"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="transparent"
                />
                <text className="text-[11px] font-bold uppercase tracking-[0.25em] fill-white">
                  <textPath href="#curve">
                    Equuselecta Luxury • Marketplace •
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                 <Sparkles size={20} className="text-boutique-gold" />
              </div>
           </motion.div>
        </div>

      </div>
    </section>
  );
};