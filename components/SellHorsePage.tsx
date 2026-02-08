import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Upload, Send, Image, Film, Link as LinkIcon, Shield, Award, FileCheck, X, Eye, Check } from 'lucide-react';

interface SellHorsePageProps {
  onBack: () => void;
}

export const SellHorsePage: React.FC<SellHorsePageProps> = ({ onBack }) => {
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [hasAcceptedPolicy, setHasAcceptedPolicy] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen w-full relative z-40"
    >
      <div className="w-full pt-32 pb-24">
        
        {/* Breadcrumb */}
        <div className="container mx-auto px-6 md:px-12 mb-12">
           <button 
             onClick={onBack}
             className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-400 hover:text-boutique-gold transition-colors"
           >
             Home <ChevronRight size={12} /> <span className="text-zinc-900">Vende tu Caballo</span>
           </button>
        </div>

        {/* Header */}
        <div className="container mx-auto px-6 md:px-12 mb-12 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-boutique-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block"
          >
            Servicio de Intermediación
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl text-zinc-900 mb-6"
          >
            Proponga su Ejemplar
          </motion.h1>

          <p className="max-w-2xl mx-auto text-zinc-500 font-serif italic text-lg leading-relaxed mb-8">
            "Buscamos la excelencia. Si su caballo posee calidad, salud y carácter, 
            gestionaremos su venta en el mercado internacional."
          </p>

          {/* BOTÓN PARA ABRIR POLÍTICA (TRIGGER) */}
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => setIsPolicyOpen(true)}
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-stone-50 border border-zinc-200 hover:border-boutique-gold hover:shadow-lg transition-all duration-300"
          >
             <Shield size={16} className="text-zinc-400 group-hover:text-boutique-gold transition-colors" />
             <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-zinc-600 group-hover:text-zinc-900 transition-colors">
               Leer Política de Selección y Privacidad
             </span>
             <Eye size={14} className="text-zinc-300 group-hover:text-boutique-gold opacity-0 group-hover:opacity-100 transition-all -ml-2 group-hover:ml-0" />
          </motion.button>
        </div>

        {/* Form Container - DARK NAVY THEME */}
        <div className="container mx-auto px-6 md:px-12 max-w-5xl mt-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-boutique-navy border border-white/10 rounded-[40px] p-8 md:p-16 relative overflow-hidden shadow-2xl shadow-zinc-200"
          >
            {/* Subtle Gradient Overlay inside the card */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            <form className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              
              {/* Columna Izquierda: Datos Propietario */}
              <div className="space-y-8">
                <h3 className="text-white font-serif text-2xl border-b border-white/10 pb-4 mb-8">
                  Datos del Propietario
                </h3>

                <div className="group">
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2 group-focus-within:text-boutique-gold transition-colors">Nombre Completo</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/20 py-3 text-white font-serif text-lg focus:outline-none focus:border-boutique-gold transition-colors placeholder:text-white/20" placeholder="Su nombre" />
                </div>

                <div className="group">
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2 group-focus-within:text-boutique-gold transition-colors">Teléfono / WhatsApp</label>
                  <input type="tel" className="w-full bg-transparent border-b border-white/20 py-3 text-white font-serif text-lg focus:outline-none focus:border-boutique-gold transition-colors placeholder:text-white/20" placeholder="+34 600 000 000" />
                </div>
                
                <div className="group">
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2 group-focus-within:text-boutique-gold transition-colors">Ubicación del Caballo</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/20 py-3 text-white font-serif text-lg focus:outline-none focus:border-boutique-gold transition-colors placeholder:text-white/20" placeholder="Ciudad, Provincia" />
                </div>
              </div>

              {/* Columna Derecha: Datos Básicos Caballo */}
              <div className="space-y-8">
                <h3 className="text-white font-serif text-2xl border-b border-white/10 pb-4 mb-8">
                  Ficha Técnica
                </h3>

                <div className="grid grid-cols-2 gap-8">
                  <div className="group">
                    <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2 group-focus-within:text-boutique-gold transition-colors">Nombre Caballo</label>
                    <input type="text" className="w-full bg-transparent border-b border-white/20 py-3 text-white font-serif text-lg focus:outline-none focus:border-boutique-gold transition-colors" />
                  </div>
                  <div className="group">
                    <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2 group-focus-within:text-boutique-gold transition-colors">Edad</label>
                    <input type="text" className="w-full bg-transparent border-b border-white/20 py-3 text-white font-serif text-lg focus:outline-none focus:border-boutique-gold transition-colors" />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2 group-focus-within:text-boutique-gold transition-colors">Disciplina & Nivel</label>
                  <select className="w-full bg-transparent border-b border-white/20 py-3 text-white font-serif text-lg focus:outline-none focus:border-boutique-gold transition-colors [&>option]:bg-boutique-navy [&>option]:text-white cursor-pointer">
                    <option value="" className="text-white/30">Seleccionar...</option>
                    <option value="doma">Doma Clásica</option>
                    <option value="salto">Salto de Obstáculos</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div className="group">
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2 group-focus-within:text-boutique-gold transition-colors">Precio Estimado (€)</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/20 py-3 text-white font-serif text-lg focus:outline-none focus:border-boutique-gold transition-colors placeholder:text-white/20" placeholder="Ej: 50.000" />
                </div>
              </div>

              {/* Sección Multimedia & Galería */}
              <div className="md:col-span-2 space-y-8 pt-4 border-t border-white/10">
                 <h3 className="text-white font-serif text-2xl mb-4">Multimedia & Galería</h3>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group">
                       <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-400 mb-3">
                          <LinkIcon size={12} /> Link Vídeo (YouTube/Vimeo)
                       </label>
                       <input type="url" className="w-full bg-transparent border-b border-white/20 py-3 text-white font-serif text-lg focus:outline-none focus:border-boutique-gold transition-colors placeholder:text-white/20" placeholder="https://..." />
                    </div>

                    <div className="group">
                       <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-400 mb-3">
                          <Film size={12} /> O Subir Archivo de Vídeo
                       </label>
                       <label className="flex items-center justify-center w-full h-14 border border-white/20 border-dashed rounded-xl cursor-pointer hover:bg-white/5 hover:border-boutique-gold/50 transition-all group">
                          <input type="file" accept="video/*" className="hidden" />
                          <span className="text-zinc-400 text-sm group-hover:text-white transition-colors flex items-center gap-2">
                            <Upload size={16} /> Seleccionar vídeo de galería
                          </span>
                       </label>
                    </div>
                 </div>

                 <div className="group">
                    <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-400 mb-3">
                       <Image size={12} /> Fotografías del Ejemplar
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border border-white/20 border-dashed rounded-2xl cursor-pointer hover:bg-white/5 hover:border-boutique-gold/50 transition-all group bg-white/5">
                        <input type="file" multiple accept="image/*" className="hidden" />
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-3 group-hover:bg-boutique-gold group-hover:text-white transition-colors text-zinc-400">
                           <Upload size={18} />
                        </div>
                        <span className="text-zinc-300 font-serif text-lg group-hover:text-white transition-colors">Subir Imágenes</span>
                        <span className="text-zinc-500 text-xs mt-1">Formatos JPG, PNG (Max 5MB)</span>
                    </label>
                 </div>
              </div>

              {/* Descripción & Botón */}
              <div className="md:col-span-2 space-y-8 mt-4 border-t border-white/10 pt-8">
                <div className="group">
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2 group-focus-within:text-boutique-gold transition-colors">Descripción Adicional / Orígenes</label>
                  <textarea rows={3} className="w-full bg-transparent border-b border-white/20 py-3 text-white font-serif text-lg focus:outline-none focus:border-boutique-gold transition-colors placeholder:text-white/20 resize-none" placeholder="Cuéntenos más sobre el carácter, salud y genealogía..."></textarea>
                </div>

                {/* Checkbox Política */}
                <div className="flex items-start gap-4">
                    <button 
                      type="button"
                      onClick={() => setHasAcceptedPolicy(!hasAcceptedPolicy)}
                      className={`shrink-0 w-6 h-6 rounded border flex items-center justify-center transition-all duration-300 ${hasAcceptedPolicy ? 'bg-boutique-gold border-boutique-gold' : 'border-zinc-500 bg-transparent hover:border-white'}`}
                    >
                      {hasAcceptedPolicy && <Check size={14} className="text-boutique-navy" />}
                    </button>
                    <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                       He leído y acepto la <button type="button" onClick={() => setIsPolicyOpen(true)} className="text-white hover:text-boutique-gold underline decoration-zinc-600 underline-offset-4 transition-colors">Política de Selección y Privacidad</button>. Entiendo que EQUUSELECTA se reserva el derecho de admisión de los ejemplares.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-end pt-4">
                  <button 
                    type="button" 
                    disabled={!hasAcceptedPolicy}
                    className={`w-full md:w-auto group px-12 py-4 rounded-full font-bold uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-4 shadow-[0_0_20px_rgba(255,255,255,0.1)] ${hasAcceptedPolicy ? 'bg-white text-boutique-navy hover:bg-boutique-gold hover:text-white cursor-pointer' : 'bg-white/10 text-white/30 cursor-not-allowed'}`}
                  >
                    Enviar Solicitud
                    <Send size={16} className={hasAcceptedPolicy ? "group-hover:translate-x-1 transition-transform" : ""} />
                  </button>
                </div>
              </div>

            </form>
          </motion.div>
        </div>

      </div>

      {/* --- MODAL DE POLÍTICA --- */}
      <AnimatePresence>
        {isPolicyOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setIsPolicyOpen(false)}
          >
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               transition={{ duration: 0.3, ease: "easeOut" }}
               onClick={(e) => e.stopPropagation()}
               className="bg-stone-50 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[32px] shadow-2xl relative"
             >
                {/* Close Button */}
                <button 
                  onClick={() => setIsPolicyOpen(false)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-zinc-200 hover:bg-zinc-300 text-zinc-600 transition-colors z-20"
                >
                   <X size={20} />
                </button>

                <div className="p-8 md:p-12">
                  <div className="relative z-10">
                    <h2 className="font-serif text-2xl md:text-3xl text-zinc-900 mb-6 border-b border-zinc-200 pb-4 pr-10">
                      Política de Selección y Privacidad
                    </h2>
                    
                    <p className="text-zinc-600 font-light leading-relaxed mb-10 text-justify">
                      En <strong className="text-zinc-900 font-medium">EQUUSELECTA</strong>, nuestra prioridad es la excelencia. No operamos como un portal de anuncios convencionales, sino como una consultoría boutique especializada. Por ello, cada ejemplar que recibimos se somete a un riguroso proceso de auditoría antes de ser representado por nuestra firma.
                    </p>

                    <div className="grid grid-cols-1 gap-8 md:gap-10">
                       
                       {/* Punto 1 */}
                       <div className="flex gap-6 items-start">
                          <div className="shrink-0 w-12 h-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-boutique-gold shadow-sm mt-1">
                             <Shield size={20} />
                          </div>
                          <div>
                            <h3 className="font-serif text-xl text-zinc-900 mb-2">1. Compromiso de Confidencialidad</h3>
                            <p className="text-sm text-zinc-500 leading-relaxed text-justify">
                              EQUUSELECTA garantiza que toda la información, material gráfico y documentación técnica serán tratados bajo la más estricta confidencialidad. Los datos no serán compartidos públicamente ni con terceros ajenos a la operación sin su consentimiento.
                            </p>
                          </div>
                       </div>

                       {/* Punto 2 */}
                       <div className="flex gap-6 items-start">
                          <div className="shrink-0 w-12 h-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-boutique-gold shadow-sm mt-1">
                             <Award size={20} />
                          </div>
                          <div>
                            <h3 className="font-serif text-xl text-zinc-900 mb-2">2. Derecho de Admisión</h3>
                            <div className="text-sm text-zinc-500 leading-relaxed text-justify space-y-2">
                              <p>Nos reservamos el derecho de selección para mantener nuestros estándares:</p>
                              <ul className="list-disc pl-4 space-y-1 text-zinc-400 mt-2">
                                 <li><strong className="text-zinc-700">Integridad de Salud:</strong> Transparencia clínica.</li>
                                 <li><strong className="text-zinc-700">Excelencia Deportiva:</strong> Potencial real.</li>
                                 <li><strong className="text-zinc-700">Garantía:</strong> Documentación en regla.</li>
                              </ul>
                            </div>
                          </div>
                       </div>

                       {/* Punto 3 */}
                       <div className="flex gap-6 items-start">
                          <div className="shrink-0 w-12 h-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-boutique-gold shadow-sm mt-1">
                             <FileCheck size={20} />
                          </div>
                          <div>
                             <h3 className="font-serif text-xl text-zinc-900 mb-2">3. Protocolo de Incorporación</h3>
                             <p className="text-sm text-zinc-500 leading-relaxed text-justify">
                               Si tras nuestro análisis el ejemplar encaja en los parámetros de nuestra cartera, nuestro equipo iniciará el protocolo de comercialización exclusiva para posicionar su caballo en los mercados de élite internacionales (Europa, USA, Emiratos).
                             </p>
                          </div>
                       </div>

                    </div>
                  </div>
                </div>

                {/* Footer Modal */}
                <div className="bg-zinc-100 p-6 text-center rounded-b-[32px]">
                   <button 
                     onClick={() => setIsPolicyOpen(false)}
                     className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors"
                   >
                     Cerrar y Volver al Formulario
                   </button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Simple Footer */}
      <div className="py-12 text-center bg-stone-50 border-t border-zinc-200">
        <p className="text-zinc-400 text-[10px] uppercase tracking-widest">Equuselecta Luxury Horse Market</p>
      </div>

    </motion.div>
  );
};