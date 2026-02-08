import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Filter, CornerDownRight, ChevronRight } from 'lucide-react';
import { HorseCategory, Horse, HorseLevel } from '../types';
import { HORSES } from '../data';

// --- CONFIGURACIÓN DE CONTENIDO ---
const DISCIPLINE_CONFIG: Record<string, {
  label: string;
  titlePart1: string;
  titlePart2: string;
  description: string;
  manifesto: string;
}> = {
  doma: {
    label: "Dressage Collection",
    titlePart1: "Doma",
    titlePart2: "Clásica",
    description: "La búsqueda de la armonía absoluta. Seleccionamos biomecánica superior y mentes dispuestas.",
    manifesto: "Harmony"
  },
  salto: {
    label: "Showjumping Elite",
    titlePart1: "Salto",
    titlePart2: "Obstáculos",
    description: "Potencia, técnica y corazón. Una selección diseñada para la exigencia de la alta competición.",
    manifesto: "Power"
  }
};

// Datos con contadores ficticios para UI richness
const DOMA_LEVELS = [
  { 
    id: 'basico', 
    title: 'Potros', 
    tag: 'Young Horses',
    stock: 4,
    num: '01',
    image: 'https://images.unsplash.com/photo-1551887196-72e32bfc7bf3?q=80&w=2529&auto=format&fit=crop' 
  },
  { 
    id: 'medio', 
    title: 'Confirmados', 
    tag: 'Performance',
    stock: 6,
    num: '02',
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=2671&auto=format&fit=crop' 
  },
  { 
    id: 'alto', 
    title: 'Grand Prix', 
    tag: 'Elite Masters',
    stock: 2,
    num: '03',
    image: 'https://images.unsplash.com/photo-1534008902787-0b62d398b713?q=80&w=2574&auto=format&fit=crop' 
  }
];

const SALTO_LEVELS = [
  { 
    id: 'basico', 
    title: 'Prospects', 
    tag: 'Young Talents',
    stock: 5,
    num: '01',
    image: 'https://images.unsplash.com/photo-1535082622709-b6b668d2c48e?q=80&w=2670&auto=format&fit=crop'
  },
  { 
    id: 'medio', 
    title: 'Competitors', 
    tag: '1.30m - 1.40m',
    stock: 8,
    num: '02',
    image: 'https://images.unsplash.com/photo-1613952778735-397577587123?q=80&w=2670&auto=format&fit=crop'
  },
  { 
    id: 'alto', 
    title: 'Top Sport', 
    tag: 'Ranking Classes',
    stock: 3,
    num: '03',
    image: 'https://images.unsplash.com/photo-1629814674640-52e69736db89?q=80&w=2670&auto=format&fit=crop'
  }
];

interface CategoryPageProps {
  category: HorseCategory;
  onBack: () => void;
  onHorseClick: (horse: Horse) => void;
}

// --- COMPONENTE CARD DE CABALLO (MANTENIDO INTACTO) ---
const HorseGalleryCard: React.FC<{ horse: Horse; index: number; onClick: (horse: Horse) => void }> = ({ horse, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onClick(horse)}
      className="group relative w-full cursor-pointer h-[420px] md:h-[460px]"
    >
      <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-zinc-900 shadow-sm group-hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-700 ease-out border border-transparent group-hover:border-zinc-800">
        <div className="absolute inset-0 overflow-hidden">
          <motion.img 
            src={horse.image} 
            alt={horse.name} 
            className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 grayscale-[10%] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
        </div>
        <div className="absolute top-5 left-5 right-5 flex justify-between items-start z-20">
           <div className="backdrop-blur-md bg-white/5 border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 group-hover:bg-white/10 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-boutique-gold animate-pulse"></span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-white/90">
                 Ref. {horse.id.split('-')[0].toUpperCase()}
              </span>
           </div>
           {horse.level === 'alto' && (
             <div className="bg-boutique-gold text-black px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-[0_4px_12px_rgba(212,175,55,0.3)] transform group-hover:scale-105 transition-transform">
                <Sparkles size={10} fill="black" strokeWidth={1} />
                <span className="text-[9px] font-bold uppercase tracking-widest">Elite</span>
             </div>
           )}
        </div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20 flex flex-col justify-end">
           <div className="w-8 h-[2px] bg-boutique-gold mb-4 opacity-70 group-hover:w-16 transition-all duration-500 ease-out" />
           <h3 className="font-serif text-3xl md:text-4xl text-white leading-[0.9] mb-3 tracking-tight group-hover:text-zinc-100 transition-colors">
              {horse.name}
           </h3>
           <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-2 group-hover:border-white/20 transition-colors">
              <div className="flex gap-6">
                 <div>
                    <span className="text-[9px] uppercase tracking-widest text-zinc-500 block mb-0.5">Edad</span>
                    <span className="text-sm font-medium text-white">{horse.age} Años</span>
                 </div>
                 <div>
                    <span className="text-[9px] uppercase tracking-widest text-zinc-500 block mb-0.5">Raza</span>
                    <span className="text-sm font-medium text-white">{horse.breed}</span>
                 </div>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300 transform group-hover:rotate-[-45deg]">
                 <ArrowRight size={16} />
              </div>
           </div>
        </div>
        <div className="absolute inset-0 border border-white/5 rounded-[24px] pointer-events-none group-hover:border-white/20 transition-colors duration-500" />
      </div>
    </motion.div>
  );
};

export const CategoryPage: React.FC<CategoryPageProps> = ({ category, onBack, onHorseClick }) => {
  const config = DISCIPLINE_CONFIG[category as string];
  const [selectedLevel, setSelectedLevel] = useState<HorseLevel | 'all'>('all');
  const [hoveredLevelIndex, setHoveredLevelIndex] = useState<number | null>(null);
  
  // Detect Mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!config) return null;

  const LEVELS = category === 'doma' ? DOMA_LEVELS : SALTO_LEVELS;

  const filteredHorses = HORSES.filter(h => 
    h.category === category && 
    (selectedLevel === 'all' || h.level === selectedLevel)
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="bg-stone-50 min-h-screen w-full relative z-40 selection:bg-boutique-gold/20"
    >
      <div className="w-full overflow-hidden">
        
        {/* --- HEADER BOUTIQUE & MINIMALISTA --- */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-6 container mx-auto text-center">
           
           {/* Breadcrumb sutil */}
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             className="flex justify-center items-center gap-2 mb-8"
           >
              <button onClick={onBack} className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 hover:text-zinc-900 transition-colors">
                 Colección 2024
              </button>
              <ChevronRight size={10} className="text-zinc-300" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-boutique-gold">
                {category}
              </span>
           </motion.div>

           {/* Título: Elegante y Contenido (No gigante) */}
           <motion.h1 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
             className="font-serif text-5xl md:text-7xl text-zinc-900 leading-tight mb-6"
           >
             {config.titlePart1} <span className="italic text-zinc-500 font-light">{config.titlePart2}</span>
           </motion.h1>

           {/* Línea decorativa minimalista */}
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: 60 }}
             transition={{ duration: 0.8, delay: 0.3 }}
             className="h-[1px] bg-zinc-300 mx-auto mb-8"
           />

           {/* Descripción: Limpia y centrada */}
           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="font-sans text-sm md:text-lg text-zinc-500 leading-relaxed max-w-xl mx-auto mb-10 font-light"
           >
             {config.description}
           </motion.p>

           {/* Badge refinado */}
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-100 shadow-sm text-[10px] uppercase tracking-widest text-zinc-400"
           >
              <span className="w-1.5 h-1.5 rounded-full bg-boutique-gold animate-pulse"></span>
              {HORSES.filter(h => h.category === category).length} Ejemplares Disponibles
           </motion.div>

        </section>

        {/* --- LEVELS SECTION (PANORAMIC CARDS - INTACT) --- */}
        <section className="container mx-auto px-4 md:px-12 mb-20">
           {/* ... (Código de tarjetas y acordeón original mantenido) ... */}
           <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[380px] w-full">
              {LEVELS.map((level, idx) => {
                const isActive = selectedLevel === level.id;
                
                return (
                  <motion.div 
                    key={level.id}
                    onMouseEnter={() => !isMobile && setHoveredLevelIndex(idx)}
                    onMouseLeave={() => !isMobile && setHoveredLevelIndex(null)}
                    onClick={() => setSelectedLevel(isActive ? 'all' : level.id as HorseLevel)}
                    className={`
                      relative rounded-[24px] overflow-hidden cursor-pointer shadow-lg transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                      ${isActive ? 'ring-1 ring-zinc-900/5' : ''}
                    `}
                    initial={!isMobile ? { flex: 1 } : { height: '280px' }}
                    animate={!isMobile ? {
                       flex: hoveredLevelIndex === idx || isActive ? 2.5 : 1,
                    } : { height: isActive ? '380px' : '280px' }}
                  >
                     <motion.img 
                      src={level.image} 
                      alt={level.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      animate={!isMobile ? { scale: hoveredLevelIndex === idx || isActive ? 1.08 : 1 } : {}}
                      transition={{ duration: 1.2 }}
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                     <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

                     <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
                        <span className="font-serif text-8xl text-white/5 font-bold leading-none -mt-4 -ml-4 pointer-events-none select-none">
                          {level.num}
                        </span>
                        <div className="backdrop-blur-md bg-white/10 border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2">
                           <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-green-400 animate-pulse' : 'bg-white/40'}`} />
                           <span className="text-[9px] font-bold uppercase tracking-widest text-white/90">
                              {level.stock} Available
                           </span>
                        </div>
                     </div>

                     <div className="absolute bottom-8 left-6 right-6 md:left-8 md:right-8 z-20">
                        <motion.div 
                          className="bg-[#F0F0F0]/95 backdrop-blur-2xl rounded-[24px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/60 relative overflow-hidden"
                          animate={{ 
                             y: (!isMobile && (hoveredLevelIndex !== idx && !isActive)) ? 10 : 0,
                          }}
                        >
                           <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform skew-x-12 group-hover:animate-[shimmer_2s_infinite]" />

                           <div className="flex justify-between items-end">
                             <div className="flex-1">
                               <div className="flex items-center gap-2 mb-2">
                                 <div className={`w-1.5 h-1.5 rounded-full transition-colors ${isActive ? 'bg-boutique-gold' : 'bg-zinc-400'}`} />
                                 <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                                    {level.tag}
                                 </span>
                               </div>
                               <h3 className="font-serif text-2xl md:text-3xl text-zinc-900 leading-none tracking-tight">
                                  {level.title}
                               </h3>
                             </div>

                             <motion.div
                               layout
                               className={`
                                 flex items-center justify-center rounded-full transition-all duration-500
                                 ${(isActive || hoveredLevelIndex === idx) ? 'w-auto px-4 h-10 bg-zinc-900' : 'w-10 h-10 bg-zinc-200'}
                               `}
                             >
                                {(isActive || hoveredLevelIndex === idx) ? (
                                   <div className="flex items-center gap-2 whitespace-nowrap overflow-hidden">
                                     <span className="text-[10px] font-bold uppercase tracking-widest text-white">Ver Ejemplares</span>
                                     <ArrowRight size={12} className="text-boutique-gold" />
                                   </div>
                                ) : (
                                   <CornerDownRight size={16} className="text-zinc-500" />
                                )}
                             </motion.div>
                           </div>
                           
                           <div className="mt-4 w-full h-[2px] bg-zinc-200 rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full bg-boutique-gold"
                                initial={{ width: 0 }}
                                animate={{ width: (isActive || hoveredLevelIndex === idx) ? '100%' : '20%' }}
                                transition={{ duration: 0.8 }}
                              />
                           </div>

                        </motion.div>
                     </div>
                  </motion.div>
                );
              })}
           </div>
        </section>

        {/* --- SEPARATOR WITH MICRO-DETAILS --- */}
        <div className="container mx-auto px-6 md:px-12 mb-16">
           <div className="flex items-center gap-4">
              <span className="text-zinc-300 text-[10px] font-mono">01</span>
              <div className="h-[1px] bg-zinc-200 flex-1 relative">
                 <motion.div 
                   className="absolute top-0 left-0 h-full bg-zinc-900 w-0"
                   animate={{ width: selectedLevel !== 'all' ? '100%' : '0%' }}
                   transition={{ duration: 0.8 }}
                 />
              </div>
              <div className="flex items-center gap-2 text-zinc-500 px-4 py-1 rounded-full border border-zinc-200 bg-white">
                  <Filter size={12} />
                  <span className="text-[10px] uppercase tracking-widest font-bold">
                     {selectedLevel === 'all' ? 'All Collection' : DOMA_LEVELS.find(l => l.id === selectedLevel)?.title}
                  </span>
              </div>
              <div className="h-[1px] bg-zinc-200 flex-1"></div>
              <span className="text-zinc-300 text-[10px] font-mono">02</span>
           </div>
        </div>

        {/* --- GALLERY GRID (NEW LUXURY DESIGN) --- */}
        <section className="container mx-auto px-6 md:px-12 pb-32">
           <AnimatePresence mode="wait">
             <motion.div 
               key={selectedLevel}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.5 }}
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
             >
               {filteredHorses.length > 0 ? (
                 filteredHorses.map((horse, idx) => (
                   <HorseGalleryCard 
                     key={horse.id} 
                     horse={horse} 
                     index={idx} 
                     onClick={onHorseClick}
                   />
                 ))
               ) : (
                 <div className="col-span-full py-24 flex flex-col items-center justify-center border border-dashed border-zinc-200 rounded-[32px] bg-zinc-50/50">
                   <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mb-4">
                      <Sparkles className="text-zinc-300" />
                   </div>
                   <p className="font-serif text-3xl text-zinc-400 italic mb-2">
                     Sold Out
                   </p>
                   <p className="text-xs uppercase tracking-widest text-zinc-400">
                     Actualmente no hay ejemplares en esta categoría.
                   </p>
                 </div>
               )}
             </motion.div>
           </AnimatePresence>
        </section>

        {/* Footer Simple */}
        <div className="py-12 flex justify-center border-t border-zinc-100 mx-12">
          <p className="text-zinc-300 text-[9px] uppercase tracking-[0.4em] font-medium flex items-center gap-2">
             <span className="w-2 h-2 rounded-full border border-zinc-300"></span>
             Equuselecta Private Sale
          </p>
        </div>

      </div>
    </motion.div>
  );
};