import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Instagram, Globe } from 'lucide-react';
import { HorseCategory } from '../types';

interface NavbarProps {
  onSelectCategory: (category: HorseCategory) => void;
  activeCategory: HorseCategory;
  onSellClick: () => void;
  forceDark?: boolean;
}

const NAV_ITEMS = [
  { id: 'all', label: 'Home', number: '01' },
  { id: 'doma', label: 'Doma Clásica', number: '02' },
  { id: 'salto', label: 'Salto Obstáculos', number: '03' },
  { id: 'sell', label: 'Vender Caballo', number: '04' } // Added Sell as a main link
];

export const Navbar: React.FC<NavbarProps> = ({ onSelectCategory, activeCategory, onSellClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animación del Menú (Curtain Effect)
  const menuVariants = {
    initial: { 
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" 
    },
    animate: { 
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
      transition: { 
        duration: 0.8, 
        ease: [0.76, 0, 0.24, 1] 
      }
    },
    exit: { 
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      transition: { 
        duration: 0.7, 
        ease: [0.76, 0, 0.24, 1],
        delay: 0.1
      }
    }
  };

  const linkContainerVars = {
    initial: { opacity: 0, y: 40 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 + (i * 0.1) }
    }),
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const handleLinkClick = (id: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      if (id === 'sell') {
        onSellClick();
      } else {
        onSelectCategory(id as HorseCategory);
      }
    }, 500); // Wait for exit animation
  };

  return (
    <>
      {/* 
        ========================================
        1. FLOATING NAVBAR (Visible only when menu closed or managed via z-index)
        ========================================
      */}
      <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center pointer-events-none px-4 transition-all duration-500 ${isMenuOpen ? 'opacity-0 -translate-y-10' : 'opacity-100 translate-y-0'}`}>
        
        <motion.nav
          layout
          className={`
            pointer-events-auto
            relative flex items-center justify-between
            rounded-full
            border border-white/40
            backdrop-blur-xl
            transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
            ${isScrolled 
                ? 'bg-white/90 shadow-sm py-2 px-3 pl-4 gap-4' 
                : 'bg-white/80 py-3 px-4 pl-6 w-full max-w-[1200px]'
            }
          `}
          style={{
             maxWidth: isScrolled ? "fit-content" : "1200px", 
          }}
        >
          {/* LEFT: BRAND */}
          <div className="flex items-center gap-2 shrink-0">
            <button 
              onClick={() => onSelectCategory('all')}
              className="flex items-center gap-3 group outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-serif font-bold text-sm shadow-md group-hover:scale-110 transition-transform duration-300">
                E.
              </div>
              
              <div className={`flex flex-col overflow-hidden transition-all duration-500 ${isScrolled ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                <span className="font-serif text-sm font-bold tracking-wide text-zinc-900 whitespace-nowrap leading-none">
                  EQUUSELECTA
                </span>
              </div>
            </button>
          </div>

          {/* CENTER: DESKTOP PILLS */}
          <div className={`hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isScrolled ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}>
             <div className="flex items-center gap-1 bg-zinc-100/50 p-1 rounded-full border border-white/50">
                {['doma', 'salto'].map((id) => (
                  <button
                    key={id}
                    onClick={() => onSelectCategory(id as HorseCategory)}
                    className={`
                      px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-300
                      ${activeCategory === id ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900 hover:bg-white/50'}
                    `}
                  >
                    {id === 'doma' ? 'Doma Clásica' : 'Salto'}
                  </button>
                ))}
             </div>
          </div>

          {/* RIGHT: ACTIONS */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onSellClick}
              className={`
                hidden md:flex items-center gap-2 rounded-full transition-all duration-300
                ${isScrolled 
                  ? 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 px-4 py-2' 
                  : 'bg-zinc-900 text-white hover:bg-zinc-800 px-5 py-2.5'
                }
              `}
            >
               <span className="text-[9px] uppercase tracking-[0.2em] font-bold">Vender</span>
            </button>

            <button 
              onClick={() => setIsMenuOpen(true)}
              className="group relative w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-transparent hover:bg-zinc-100 transition-colors"
            >
              <div className="flex flex-col gap-1.5 items-end">
                 <span className="w-6 h-[1.5px] bg-zinc-900 group-hover:w-4 transition-all duration-300"></span>
                 <span className="w-4 h-[1.5px] bg-zinc-900 group-hover:w-6 transition-all duration-300"></span>
              </div>
            </button>
          </div>
        </motion.nav>
      </div>

      {/* 
        ========================================
        2. FULLSCREEN MENU (The "Curtain" Reveal)
        ========================================
      */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-[100] bg-[#0A0A0A] text-[#EBEBEB] flex flex-col overflow-hidden"
          >
            {/* NOISE OVERLAY FOR TEXTURE */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

            {/* --- INTERNAL HEADER --- */}
            <div className="relative z-10 w-full flex justify-between items-center px-6 pt-6 md:px-12 md:pt-8">
               <div className="flex items-center gap-2">
                 <span className="font-serif font-bold text-lg text-white">E.</span>
                 <span className="text-[9px] uppercase tracking-widest text-zinc-500">Navigation</span>
               </div>
               
               <button 
                 onClick={() => setIsMenuOpen(false)}
                 className="group flex items-center gap-3 text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
               >
                 <span>Cerrar</span>
                 <div className="w-10 h-10 rounded-full border border-zinc-800 group-hover:bg-white group-hover:text-black flex items-center justify-center transition-all duration-300">
                    <X size={18} />
                 </div>
               </button>
            </div>

            {/* --- MAIN LINKS CONTAINER --- */}
            <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-20 lg:px-32">
               <div className="flex flex-col items-start gap-2">
                  {NAV_ITEMS.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      custom={idx}
                      variants={linkContainerVars}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      onMouseEnter={() => setHoveredLink(item.id)}
                      onMouseLeave={() => setHoveredLink(null)}
                      onClick={() => handleLinkClick(item.id)}
                      className="group relative cursor-pointer"
                    >
                      {/* BLUR EFFECT LOGIC */}
                      <motion.div
                        animate={{
                           filter: hoveredLink && hoveredLink !== item.id ? "blur(4px)" : "blur(0px)",
                           opacity: hoveredLink && hoveredLink !== item.id ? 0.3 : 1,
                           x: hoveredLink === item.id ? 20 : 0
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="flex items-baseline gap-4 md:gap-8"
                      >
                         <span className="text-xs md:text-sm font-mono text-zinc-600 group-hover:text-boutique-gold transition-colors mt-2 md:mt-4 block">
                            {item.number}
                         </span>
                         
                         <h2 className="font-serif text-5xl md:text-8xl lg:text-[7rem] leading-[0.9] text-zinc-300 group-hover:text-white transition-colors">
                            {item.label}
                         </h2>
                      </motion.div>

                      {/* HOVER LINE (The "Strike-through" or Underline effect) */}
                      <AnimatePresence>
                         {hoveredLink === item.id && (
                            <motion.div 
                              initial={{ scaleX: 0, opacity: 0 }}
                              animate={{ scaleX: 1, opacity: 1 }}
                              exit={{ scaleX: 0, opacity: 0 }}
                              transition={{ duration: 0.5, ease: "circOut" }}
                              className="absolute left-12 md:left-24 bottom-2 md:bottom-6 w-1/2 h-[1px] bg-boutique-gold origin-left"
                            />
                         )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
               </div>
            </div>

            {/* --- INTERNAL FOOTER --- */}
            <div className="relative z-10 w-full px-6 pb-8 md:px-12 md:pb-12 border-t border-zinc-800/50 pt-8 flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
               
               <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Get in touch</span>
                  <a href="mailto:info@equuselecta.com" className="font-serif text-xl md:text-2xl text-zinc-300 hover:text-white transition-colors flex items-center gap-2 group">
                     info@equuselecta.com
                     <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-boutique-gold" />
                  </a>
               </div>

               <div className="flex gap-8 md:gap-16">
                  <a href="#" className="flex flex-col gap-1 group">
                     <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold group-hover:text-boutique-gold transition-colors">Social</span>
                     <div className="flex items-center gap-2 text-zinc-300 group-hover:text-white transition-colors">
                        <Instagram size={16} /> Instagram
                     </div>
                  </a>
                  <a href="#" className="flex flex-col gap-1 group">
                     <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold group-hover:text-boutique-gold transition-colors">Location</span>
                     <div className="flex items-center gap-2 text-zinc-300 group-hover:text-white transition-colors">
                        <Globe size={16} /> Girona, ES
                     </div>
                  </a>
               </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};