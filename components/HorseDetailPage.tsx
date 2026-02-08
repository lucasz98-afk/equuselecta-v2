import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ArrowLeft,
  Calendar, 
  Ruler, 
  Palette, 
  User, 
  Activity, 
  MessageCircle,
  Award,
  ShieldCheck,
  Tag,
  Smartphone,
  ZoomIn,
  X,
  ChevronLeft,
  ArrowRight
} from 'lucide-react';
import { Horse } from '../types';
import { HORSES } from '../data';

interface HorseDetailPageProps {
  horse: Horse;
  onBack: () => void;
  onRelatedClick?: (horse: Horse) => void;
}

export const HorseDetailPage: React.FC<HorseDetailPageProps> = ({ horse, onBack, onRelatedClick }) => {
  
  // States para la galería
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  // Construir array de todas las imágenes (Principal + Galería)
  const allImages = [horse.image, ...(horse.gallery || [])];

  useEffect(() => {
    window.scrollTo(0,0);
    setCurrentImageIndex(0); // Reset galería al cambiar de caballo
  }, [horse]);

  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - horse.age;

  // --- LÓGICA DE RECOMENDACIONES ---
  
  // 1. Helper para etiquetas de nivel (Display)
  const getLevelLabel = (cat: string, lvl?: string) => {
      if (!lvl) return '';
      // Unificamos la nomenclatura para ambas disciplinas
      if (lvl === 'alto') return 'Nivel Avanzado';
      if (lvl === 'medio') return 'Nivel Básico-Medio';
      if (lvl === 'basico') return 'Potros';
      return 'Nivel';
  };

  // 2. Lógica de filtrado y ordenación por Precio Parecido
  // Asignamos un valor numérico alto a precios 'Consultar' para agruparlos
  const currentPriceVal = typeof horse.price === 'number' ? horse.price : 100000;
  
  const relatedHorses = HORSES
    .filter(h => h.category === horse.category && h.id !== horse.id)
    .sort((a, b) => {
       const pA = typeof a.price === 'number' ? a.price : 100000;
       const pB = typeof b.price === 'number' ? b.price : 100000;
       // Ordenar por menor diferencia de precio con el caballo actual
       return Math.abs(pA - currentPriceVal) - Math.abs(pB - currentPriceVal);
    })
    .slice(0, 4); // Mostrar máximo 4 recomendaciones más relevantes

  // Handlers Galería
  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="bg-stone-50 min-h-screen w-full relative z-40"
    >
      <div className="w-full pt-28 md:pt-32 pb-24">
        
        {/* Container Principal */}
        <div className="container mx-auto px-6 md:px-12">
          
          {/* Botón Volver & Breadcrumbs */}
          <div className="mb-8 flex items-center justify-between">
             <button 
               onClick={onBack}
               className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-zinc-200 shadow-sm hover:shadow-md hover:border-boutique-gold transition-all duration-300"
             >
               <ArrowLeft size={16} className="text-zinc-400 group-hover:text-boutique-gold transition-colors" />
               <span className="text-xs font-bold uppercase tracking-widest text-zinc-600 group-hover:text-zinc-900">
                 Volver a la Colección
               </span>
             </button>

             <div className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-400">
                Colección <ChevronRight size={12} /> <span className="text-zinc-900">{horse.category}</span>
             </div>
          </div>

          {/* 
            GRID PRINCIPAL ASIMÉTRICO: 
            En escritorio usamos 12 columnas.
            Texto (Info): order-1, 5 columnas -> Izquierda
            Imagen: order-2, 7 columnas -> Derecha
          */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 lg:gap-x-20 items-start"
          >
            
            {/* BLOQUE 1: INFO PRINCIPAL (Nombre, Precio, Ref) -> COLUMNA IZQUIERDA */}
            <motion.div variants={itemVariants} className="order-1 lg:col-span-5">
                 <p className="text-zinc-400 text-sm font-sans mb-1">
                   Referencia: {horse.id.replace(/\D/g, '') || '30010024'}
                 </p>
                 <div className="flex items-center gap-2 text-boutique-gold text-xs font-bold uppercase tracking-wider mb-2">
                    <Award size={14} />
                    <span>Registro: Pasaporte Deportivo</span>
                 </div>
                 
                 <h1 className="font-serif text-5xl md:text-7xl text-zinc-900 leading-none mb-4 uppercase">
                   {horse.name}
                 </h1>
                 
                 <div className="flex items-center gap-3 mb-6">
                    <Tag size={18} className="text-zinc-400"/>
                    <span className="text-xl text-zinc-600 font-serif italic">
                       {horse.gender === 'Mare' ? 'Yegua' : horse.gender === 'Stallion' ? 'Semental' : 'Castrado'}
                       <span className="mx-2">&middot;</span>
                       {horse.breed}
                    </span>
                 </div>

                 <p className="font-serif text-4xl md:text-5xl text-boutique-gold font-medium mb-2">
                   {typeof horse.price === 'number' ? `${horse.price.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €` : horse.price}
                 </p>
                 <p className="text-zinc-400 text-sm mb-4">Precio sujeto a examen veterinario</p>
            </motion.div>


            {/* BLOQUE 2: GALERÍA DE FOTOS -> COLUMNA DERECHA */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:col-span-7 lg:row-start-1 lg:row-span-3 lg:sticky lg:top-28"
            >
               {/* Imagen Principal: Aspect Ratio Vertical 3:4 */}
               <div 
                 onClick={() => setIsLightboxOpen(true)}
                 className="aspect-[4/5] lg:aspect-[3/4] w-full rounded-[40px] overflow-hidden shadow-2xl shadow-zinc-200 relative group bg-zinc-100 cursor-zoom-in mb-6"
               >
                  <motion.img 
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    src={allImages[currentImageIndex]} 
                    alt={horse.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Icono Zoom */}
                  <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn size={20} />
                  </div>
               </div>

               {/* Miniaturas */}
               {allImages.length > 1 && (
                 <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                   {allImages.map((img, idx) => (
                     <button
                       key={idx}
                       onClick={() => setCurrentImageIndex(idx)}
                       className={`relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 transition-all duration-300 ${
                         currentImageIndex === idx ? 'ring-2 ring-boutique-gold scale-105' : 'opacity-60 hover:opacity-100'
                       }`}
                     >
                       <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                     </button>
                   ))}
                 </div>
               )}
            </motion.div>


            {/* BLOQUE 3: CARACTERÍSTICAS & BOTÓN -> COLUMNA IZQUIERDA (Debajo de Info) */}
            <motion.div variants={itemVariants} className="order-3 lg:col-span-5 pt-4 lg:pt-0">
               
              {/* Specs Grid */}
              <div className="space-y-4 border-t border-zinc-200 pt-8">
                 <motion.div variants={itemVariants} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-boutique-gold group-hover:bg-boutique-gold group-hover:text-white transition-colors">
                       <Calendar size={18} />
                    </div>
                    <div>
                       <span className="text-[10px] uppercase tracking-widest text-zinc-400 block">Edad</span>
                       <span className="text-zinc-900 font-medium text-lg">{horse.age} Años ({birthYear})</span>
                    </div>
                 </motion.div>

                 <motion.div variants={itemVariants} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-boutique-gold group-hover:bg-boutique-gold group-hover:text-white transition-colors">
                       <Ruler size={18} />
                    </div>
                    <div>
                       <span className="text-[10px] uppercase tracking-widest text-zinc-400 block">Altura</span>
                       <span className="text-zinc-900 font-medium text-lg">{horse.height}</span>
                    </div>
                 </motion.div>

                 <motion.div variants={itemVariants} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-boutique-gold group-hover:bg-boutique-gold group-hover:text-white transition-colors">
                       <Palette size={18} />
                    </div>
                    <div>
                       <span className="text-[10px] uppercase tracking-widest text-zinc-400 block">Capa</span>
                       <span className="text-zinc-900 font-medium text-lg">{horse.coat}</span>
                    </div>
                 </motion.div>

                 <motion.div variants={itemVariants} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-boutique-gold group-hover:bg-boutique-gold group-hover:text-white transition-colors">
                       <ShieldCheck size={18} />
                    </div>
                    <div>
                       <span className="text-[10px] uppercase tracking-widest text-zinc-400 block">Carácter</span>
                       <span className="text-zinc-900 font-medium text-lg">Noble / Competición</span>
                    </div>
                 </motion.div>

                 <motion.div variants={itemVariants} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-boutique-gold group-hover:bg-boutique-gold group-hover:text-white transition-colors">
                       <User size={18} />
                    </div>
                    <div>
                       <span className="text-[10px] uppercase tracking-widest text-zinc-400 block">Tipo de Jinete</span>
                       <span className="text-zinc-900 font-medium text-lg">
                          {horse.level === 'basico' ? 'Amateur / Junior' : horse.level === 'medio' ? 'Intermedio' : 'Profesional'}
                       </span>
                    </div>
                 </motion.div>

                 <motion.div variants={itemVariants} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-boutique-gold group-hover:bg-boutique-gold group-hover:text-white transition-colors">
                       <Activity size={18} />
                    </div>
                    <div>
                       <span className="text-[10px] uppercase tracking-widest text-zinc-400 block">Nivel / Ejercicios</span>
                       <span className="text-zinc-900 font-medium text-lg">
                          {horse.features.join(", ")}
                       </span>
                    </div>
                 </motion.div>
              </div>

              {/* Botón WhatsApp */}
              <motion.div variants={itemVariants} className="pt-8">
                <a 
                   href={`https://wa.me/34665891075?text=Hola, estoy interesado en el caballo ${horse.name} (Ref: ${horse.id})`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white py-4 px-8 rounded-full shadow-xl shadow-emerald-900/10 transition-all duration-300 transform hover:-translate-y-1"
                >
                   <MessageCircle size={20} fill="white" className="text-white" />
                   <span className="font-bold uppercase tracking-wider text-sm">Solicita información por WhatsApp</span>
                </a>
              </motion.div>
            </motion.div>

          </motion.div>

          {/* SECCIÓN INFERIOR: DESCRIPCIÓN Y VIDEO VERTICAL */}
          <div className="mt-24 pt-12 border-t border-zinc-200">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                {/* 1. Descripción - FUENTES AUMENTADAS */}
                <div>
                   <h3 className="font-serif text-4xl md:text-6xl text-zinc-900 mb-8 leading-tight">Sobre este Ejemplar</h3>
                   <p className="text-zinc-600 text-xl md:text-2xl leading-relaxed font-light text-justify">
                     {horse.description}
                   </p>
                   <div className="mt-10 p-8 bg-white rounded-3xl border border-zinc-100 shadow-sm">
                      <p className="text-lg md:text-xl text-zinc-500 italic font-serif leading-relaxed">
                        "Un caballo que combina la excelencia genética con una predisposición natural para el trabajo. Recomendamos ver el video de presentación para apreciar sus movimientos en libertad."
                      </p>
                   </div>
                </div>

                {/* 2. VIDEO VERTICAL EXCLUSIVO (IG REEL STYLE) */}
                <div className="flex justify-center md:justify-center">
                  <div className="relative w-full max-w-[320px] aspect-[9/16]">
                    <div className="absolute inset-0 rounded-[40px] border-8 border-zinc-900 shadow-2xl overflow-hidden bg-black z-10 pointer-events-none"></div>
                    <div className="w-full h-full rounded-[32px] overflow-hidden bg-black relative z-0">
                       {horse.videoVertical ? (
                           <iframe 
                             className="w-full h-full object-cover"
                             src={horse.videoVertical} 
                             title="Horse Vertical Video"
                             frameBorder="0"
                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                             allowFullScreen
                           ></iframe>
                       ) : (
                           <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-800 text-zinc-500">
                              <Smartphone size={40} className="mb-4 opacity-50" />
                              <p className="text-xs uppercase tracking-widest font-bold">Sin Video Reel</p>
                           </div>
                       )}
                    </div>
                  </div>
                </div>
             </div>
          </div>

          {/* SECCIÓN CROSS-SELLING */}
          {relatedHorses.length > 0 && (
            <div className="mt-32 pt-12 border-t border-zinc-200">
               <div className="flex justify-between items-end mb-12">
                  <div>
                    <span className="text-boutique-gold text-xs font-bold uppercase tracking-[0.2em] mb-2 block">
                      Recomendaciones
                    </span>
                    <h3 className="font-serif text-3xl md:text-4xl text-zinc-900">
                      Más de {horse.category === 'doma' ? 'Doma Clásica' : 'Salto'}
                    </h3>
                  </div>
                  <div className="hidden md:flex gap-2 text-zinc-300">
                     <div className="w-2 h-2 rounded-full bg-zinc-900"></div>
                     <div className="w-2 h-2 rounded-full bg-zinc-300"></div>
                     <div className="w-2 h-2 rounded-full bg-zinc-300"></div>
                  </div>
               </div>

               <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-6 px-6 md:mx-0 md:px-0 hide-scrollbar">
                  {relatedHorses.map((related) => (
                    <div 
                      key={related.id} 
                      className="snap-center shrink-0 w-[280px] md:w-[320px] cursor-pointer group"
                      onClick={() => onRelatedClick ? onRelatedClick(related) : window.location.reload()}
                    >
                       <div className="aspect-[3/4] rounded-[24px] overflow-hidden mb-4 relative bg-zinc-100">
                          <img 
                            src={related.image} 
                            alt={related.name} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                             <div className="w-10 h-10 rounded-full bg-white text-zinc-900 flex items-center justify-center ml-auto">
                                <ArrowRight size={18} />
                             </div>
                          </div>
                       </div>
                       
                       <h4 className="font-serif text-xl text-zinc-900 group-hover:text-boutique-gold transition-colors mb-1">
                         {related.name}
                       </h4>

                       {/* NUEVO: Etiqueta de Nivel / Categoría */}
                       <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-1 font-bold">
                          {getLevelLabel(related.category, related.level)}
                       </p>

                       <p className="text-sm text-zinc-500">
                         {typeof related.price === 'number' ? `${related.price.toLocaleString()} €` : related.price}
                       </p>
                    </div>
                  ))}
               </div>
            </div>
          )}

        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Botón Cerrar */}
            <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50">
              <X size={32} />
            </button>

            {/* Navegación */}
            <button 
              onClick={handlePrevImage}
              className="absolute left-4 md:left-8 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            >
              <ChevronLeft size={32} />
            </button>
            <button 
              onClick={handleNextImage}
              className="absolute right-4 md:right-8 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            >
              <ChevronRight size={32} />
            </button>

            {/* Imagen Central */}
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full h-full flex items-center justify-center p-4 md:p-12"
              onClick={(e) => e.stopPropagation()} // Evitar cierre al clic en imagen
            >
              <img 
                src={allImages[currentImageIndex]} 
                alt="Fullscreen view" 
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-sans tracking-widest uppercase">
                {currentImageIndex + 1} / {allImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};