import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ShieldCheck, Scale, ArrowUpRight, Truck, Bitcoin } from 'lucide-react';

const services = [
  {
    id: 1,
    title: "Venta Internacional",
    subtitle: "Marketing & Red",
    description: "Conectamos su ejemplar con compradores verificados en USA, Europa y Emiratos.",
    image: "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?q=80&w=2574&auto=format&fit=crop",
    icon: <Globe />,
    colSpan: "md:col-span-8", 
  },
  {
    id: 2,
    title: "Vet Check",
    subtitle: "Auditoría Clínica",
    description: "Coordinación de PPE con veterinarios FEI.",
    image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=2671&auto=format&fit=crop",
    icon: <ShieldCheck />,
    colSpan: "md:col-span-4", 
  },
  {
    id: 3,
    title: "Logística",
    subtitle: "Door to Door",
    description: "Transporte aéreo y terrestre global.",
    image: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2669&auto=format&fit=crop",
    icon: <Truck />,
    colSpan: "md:col-span-4",
  },
  {
    id: 4,
    title: "Legal",
    subtitle: "Contratos",
    description: "Seguridad jurídica internacional.",
    image: "https://images.unsplash.com/photo-1534008902787-0b62d398b713?q=80&w=2574&auto=format&fit=crop",
    icon: <Scale />,
    colSpan: "md:col-span-4",
  },
  {
    id: 5,
    title: "Crypto",
    subtitle: "Fintech",
    description: "Aceptamos BTC/ETH/USDT.",
    image: "https://images.unsplash.com/photo-1612151855475-877969f4a6cc?q=80&w=2669&auto=format&fit=crop", 
    icon: <Bitcoin />,
    colSpan: "md:col-span-4",
  }
];

export const Services: React.FC = () => {
  return (
    <section className="py-32 bg-stone-50 px-4 md:px-6">
      <div className="container mx-auto">
        
        <div className="flex justify-between items-end mb-16 px-2">
           <h2 className="font-serif text-4xl md:text-6xl text-zinc-900 leading-none">
             Servicios <br/><span className="italic text-zinc-400">Integrales</span>
           </h2>
           <p className="hidden md:block text-xs font-bold uppercase tracking-widest text-zinc-400 max-w-[200px] text-right">
             Gestión 360º para el caballo de deporte
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {services.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ y: -5 }}
              className={`${service.colSpan} group relative h-[300px] md:h-[400px] rounded-[40px] overflow-hidden cursor-pointer`}
            >
              {/* Image BG */}
              <div className="absolute inset-0">
                 <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between text-white">
                 <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white">
                      {React.cloneElement(service.icon as React.ReactElement<any>, { size: 20 })}
                    </div>
                    <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                 </div>

                 <div>
                    <span className="text-[10px] uppercase tracking-widest text-white/60 mb-2 block">{service.subtitle}</span>
                    <h3 className="font-serif text-3xl md:text-4xl mb-4 leading-none">{service.title}</h3>
                    <p className="text-white/80 text-sm font-light max-w-xs leading-relaxed opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      {service.description}
                    </p>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};