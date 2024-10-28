import React from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from "framer-motion"
import "../styles/WebDev.css";

const ProjectCard = ({ project, onSelect }) => {
   return (
      <motion.div
         className="project-card"
         initial={{ opacity: 0, y: 50 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.2 }}
         whileHover={{ scale: 1.05, rotate: 2 }}
         onClick={() => onSelect(project)}
      >
         <div className="project-image">
         <img src={project.images[0]} alt={project.title} />
         </div>
         
         <div className="project-content">
         <h3 className="project-title">{project.title}</h3>
         <p className="project-description">{project.description}</p>
         
         <div className="project-tags">
            {project.tags.map((tag, i) => (
               <span key={i} className="project-tag">{tag}</span>
            ))}
         </div>
         
         <div className="project-link">
            Voir le projet
            <ChevronRight className="ml-1" />
         </div>
         </div>
      </motion.div>
   );
};

export default ProjectCard;