import React from 'react';
import { motion } from 'framer-motion';

export const CompanyIntro: React.FC = () => {
  const sentence = "No vendemos caballos. Seleccionamos legados.";
  const words = sentence.split(" ");

  return (
    <section className="py-32 md:py-48 bg-stone-50 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex flex-col gap-12">
           {/* Top Meta */}
           <div className="flex items-center gap-4">
              <span className="w-3 h-3 rounded-full bg-boutique-gold"></span>
              <span className="text-zinc-400 text-xs font-bold uppercase tracking-[0.2em]">Our Manifesto</span>
           </div>

           {/* Giant Typography */}
           <h2 className="font-serif text-5xl md:text-8xl lg:text-[7rem] leading-[0.9] text-zinc-900 -tracking-[0.04em]">
              {words.map((word, i) => (
                <span key={i} className="inline-block mr-[0.25em] overflow-hidden align-top">
                  <motion.span
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: [0.33, 1, 0.68, 1] }}
                    viewport={{ once: true }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
           </h2>

           {/* Secondary Text block aligned right */}
           <div className="flex justify-end mt-12">
              <div className="max-w-xl">
                 <p className="text-xl md:text-2xl text-zinc-600 font-light leading-relaxed indent-12">
                   En un mundo de inmediatez, <span className="text-zinc-900 font-medium italic">Equuselecta</span> elige la pausa. 
                   Auditamos morfología, salud y carácter para ofrecer una colección que redefine el estándar europeo.
                 </p>
                 <div className="mt-8 h-[1px] w-full bg-zinc-200"></div>
              </div>
           </div>

        </div>

      </div>
    </section>
  );
};