import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import ProjectCarousel from './Caroussel';
import '../styles/Modal.css';

const ProjectModal = ({ project, isOpen, onClose }) => {
   useEffect(() => {
      const handleEsc = (e) => {
         if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
   }, [onClose]);

   if (!isOpen) return null;

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         onClick={onClose}
         className="modal-overlay"
      >
         <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            className="modal-content"
         >
            <button onClick={onClose} className="modal-close-button">
               <X size={20} />
            </button>
            <ProjectCarousel images={project.images} />
            <div className="modal-body">
               <h2 className="modal-title">{project.title}</h2>
               <p className="modal-description">{project.longDescription}</p>
               <div className="modal-links">
                  {project.github && (
                     <a href={project.github} target="_blank" rel="noopener noreferrer" className="modal-link">
                        GitHub
                        <ExternalLink size={16} />
                     </a>
                  )}
                  {project.live && (
                     <a href={project.live} target="_blank" rel="noopener noreferrer" className="modal-link modal-link-live">
                        Voir le site
                        <ExternalLink size={16} />
                     </a>
                  )}
               </div>
            </div>
         </motion.div>
      </motion.div>
   );
};

export default ProjectModal;