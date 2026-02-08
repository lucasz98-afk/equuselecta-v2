import React from 'react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative z-20">
      <div className="container mx-auto px-4">
        {/* White Card Container */}
        <div className="bg-zinc-50 rounded-[40px] p-8 md:p-16 shadow-2xl overflow-hidden">
          
          <div className="flex flex-col xl:flex-row gap-16 items-start">
            
            {/* Text Content */}
            <div className="w-full xl:w-1/2 order-2 xl:order-1">
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8 }}
               >
                  <span className="text-boutique-gold font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
                    Sobre Nosotros
                  </span>
                  <h2 className="font-serif text-5xl md:text-6xl mb-8 leading-[0.9] text-zinc-900">
                    Garantía y <br/>
                    <span className="italic text-boutique-gold">Confianza</span>.
                  </h2>
                  
                  <div className="space-y-6 text-lg font-light text-zinc-600 leading-relaxed mb-12">
                    <p>
                      <strong className="text-zinc-900 font-medium">EQUUSELECTA</strong> nace con una misión clara: elevar el estándar en la compraventa de caballos deportivos y de recreo.
                    </p>
                    <p>
                      No somos una simple plataforma; somos sus socios. Seleccionamos rigurosamente cada ejemplar que entra en nuestra colección privada, asegurando morfología, salud y temperamento. Con base en Girona, conectamos la excelencia ecuestre española con el mundo.
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-8 border-t border-zinc-200 pt-8 mb-12">
                    <div>
                      <p className="text-4xl font-serif text-boutique-gold">Global</p>
                      <p className="text-xs text-zinc-500 uppercase tracking-widest mt-2 font-bold">Alcance Internacional</p>
                    </div>
                    <div>
                      <p className="text-4xl font-serif text-boutique-gold">Select</p>
                      <p className="text-xs text-zinc-500 uppercase tracking-widest mt-2 font-bold">Catálogo Verificado</p>
                    </div>
                  </div>
               </motion.div>
            </div>

            {/* Images Grid */}
            <div className="w-full xl:w-1/2 order-1 xl:order-2">
               <div className="grid grid-cols-2 gap-4">
                  {/* Main Portrait */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="col-span-2 aspect-[16/9] rounded-[32px] overflow-hidden relative group bg-white"
                  >
                    <img 
                      src="https://cuadradelobones.com/Media/cuadradelobones/dayvo/caballo%203.png" 
                      alt="Equuselecta Team" 
                      className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  </motion.div>

                  {/* Secondary Image 1 */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="aspect-square rounded-[32px] overflow-hidden bg-white"
                  >
                     <img 
                      src="https://cuadradelobones.com/Media/cuadradelobones/dayvo/caballo%203.png" 
                      alt="Detalle Caballo" 
                      className="w-full h-full object-contain hover:scale-110 transition-transform duration-500"
                     />
                  </motion.div>

                  {/* Secondary Image 2 */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="aspect-square rounded-[32px] overflow-hidden bg-white"
                  >
                     <img 
                      src="https://cuadradelobones.com/Media/cuadradelobones/dayvo/caballo%203.png" 
                      alt="Textura Piel" 
                      className="w-full h-full object-contain hover:scale-110 transition-transform duration-500"
                     />
                  </motion.div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};