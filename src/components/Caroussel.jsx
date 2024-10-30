import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

import '../styles/Caroussel.css';

const ProjectCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((current) => 
      current === images.length - 1 ? 0 : current + 1
    );
  };

  const prev = () => {
    setCurrentIndex((current) => 
      current === 0 ? images.length - 1 : current - 1
    );
  };

  return (
    <div className="relative">
      <AnimatePresence>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Project image ${currentIndex + 1}`}
          className="w-full h-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      </AnimatePresence>
      <button onClick={prev} className="absolute left-2 top-1/2 transform -translate-y-1/2">
        <ChevronLeft />
      </button>
      <button onClick={next} className="absolute right-2 top-1/2 transform -translate-y-1/2">
        <ChevronRight />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-colors ${
              idx === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;