import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import ProjectCarousel from './Caroussel';

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
         className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm"
      >
         <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden"
         >
            <button
               onClick={onClose}
               className="absolute right-4 top-4 z-10 bg-black/50 p-2 rounded-full text-white hover:bg-black/75 transition-colors"
               >
               <X size={20} />
            </button>

            <ProjectCarousel images={project.images} />

            <div className="p-8">
               <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
               
               <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                     <span
                        key={i}
                        className="px-3 py-1 bg-red-50 text-red-800 rounded-full text-sm"
                     >
                        {tag}
                     </span>
                  ))}
               </div>

               <p className="text-gray-600 mb-6 whitespace-pre-line">
                  {project.longDescription}
               </p>

               <div className="border-t border-gray-200 pt-6 mb-6">
                  <h3 className="text-xl font-semibold mb-3">Technologies utilisées</h3>
                  <div className="flex flex-wrap gap-2">
                     {project.technologies.map((tech, i) => (
                        <span
                           key={i}
                           className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                        >
                           {tech}
                        </span>
                     ))}
                  </div>
               </div>

               <div className="flex gap-4">
                  {project.github && (
                     <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                     >
                     GitHub
                     <ExternalLink size={16} />
                     </a>
                  )}
                  {project.live && (
                     <a
                     href={project.live}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
                     >
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