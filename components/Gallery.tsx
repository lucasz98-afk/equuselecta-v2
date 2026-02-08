import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

const images = [
  {
    src: "https://cuadradelobones.com/Media/cuadradelobones/dayvo/caballo%203.png", 
    alt: "Clase de Equitación"
  },
  {
    src: "https://cuadradelobones.com/Media/cuadradelobones/dayvo/caballo%203.png", 
    alt: "Doma Clásica"
  },
  {
    src: "https://cuadradelobones.com/Media/cuadradelobones/dayvo/caballo%203.png", 
    alt: "Cuidado del Caballo"
  },
  {
    src: "https://cuadradelobones.com/Media/cuadradelobones/dayvo/caballo%203.png", 
    alt: "Ponis"
  },
  {
    src: "https://cuadradelobones.com/Media/cuadradelobones/dayvo/caballo%203.png", 
    alt: "Instalaciones"
  },
  {
    src: "https://cuadradelobones.com/Media/cuadradelobones/dayvo/caballo%203.png", 
    alt: "Entrenamiento"
  }
];

export const Gallery: React.FC = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
           <span className="text-genassa-green text-xs font-bold tracking-[0.2em] uppercase mb-2 block">Galería</span>
           <h2 className="font-serif text-3xl md:text-4xl text-stone-900 flex items-center justify-center gap-3">
             <Instagram size={32} /> @hipicacangenassa
           </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-square overflow-hidden rounded-[24px] group cursor-pointer bg-gray-100"
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-genassa-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <Instagram className="text-white drop-shadow-md" size={32} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};