import React from 'react';
import { motion } from 'framer-motion';

export const WhatsAppWidget: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 2 }} // Aparece sutilmente después de cargar la web
      className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-2 group"
    >
      {/* Tooltip on Hover */}
      <span className="bg-white text-stone-900 text-xs font-bold uppercase tracking-widest py-1 px-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2">
        Hablemos
      </span>

      {/* Button */}
      <a
        href="https://wa.me/34665891075"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] border border-white/20 hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-all duration-300"
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          className="text-white"
        >
          {/* WhatsApp SVG Icon */}
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="white" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382C17.117 14.205 15.368 13.348 15.039 13.23C14.71 13.111 14.473 13.053 14.232 13.411C13.996 13.766 13.315 14.568 13.107 14.805C12.903 15.042 12.693 15.071 12.341 14.894C11.986 14.717 10.846 14.342 9.496 13.138C8.428 12.186 7.707 11.011 7.502 10.655C7.294 10.3 7.478 10.11 7.655 9.934C7.815 9.775 8.01 9.519 8.188 9.313C8.365 9.106 8.425 8.958 8.542 8.721C8.662 8.484 8.601 8.277 8.513 8.099C8.425 7.921 7.712 6.173 7.417 5.462C7.129 4.771 6.84 4.866 6.634 4.857C6.444 4.848 6.223 4.848 6.002 4.848C5.781 4.848 5.424 4.931 5.126 5.257C4.829 5.583 3.997 6.363 3.997 7.949C3.997 9.535 5.152 11.066 5.316 11.284C5.478 11.503 7.595 14.767 10.835 16.167C11.605 16.5 12.206 16.697 12.673 16.845C13.565 17.129 14.379 17.088 15.021 16.992C15.733 16.886 17.217 16.095 17.525 15.234C17.835 14.375 17.835 13.633 17.744 13.485C17.656 13.336 17.417 13.248 17.062 13.071H17.472V14.382ZM12.002 22C6.478 22 2 17.522 2 12C2 6.478 6.478 2 12 2C17.522 2 22 6.478 22 12C22 17.522 17.522 22 12 22Z" fill="white"/>
          </svg>
        </motion.div>
        
        {/* Pulse Effect */}
        <span className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping"></span>
      </a>
    </motion.div>
  );
};