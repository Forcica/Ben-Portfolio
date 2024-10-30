import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import ProjectCard from '../components/Card';
import ProjectModal from '../components/Modal';
import { projects } from '../data/projectsConfig';
import '../styles/WebDev.css';

const scrollTexts = [
  'expériences interactives',
  'interfaces élégantes',
  'solutions innovantes',
  'applications performantes',
  'designs créatifs'
];

const HeroSection = () => {
   return (
      <motion.div 
         className="hero-section"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.8 }}
      >
         <motion.h1 
         className="hero-title"
         initial={{ opacity: 0, y: -50 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.2, duration: 0.8 }}
         >
         Développeur Web Créatif
         </motion.h1>
         <motion.div 
         className="hero-subtitle"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 0.5 }}
         >
         <span className="hero-text">Transformant des idées en</span>
         <TypeAnimation
            sequence={scrollTexts.reduce((acc, text) => [...acc, text, 10000], [])}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="hero-animated-text"
         />
         </motion.div>
      </motion.div>
   );
};

const WebDev = () => {
   const [selectedProject, setSelectedProject] = useState(null);
   const { scrollYProgress } = useScroll();
   const y = useTransform(scrollYProgress, [0, 1], [0, -25]);
   return (
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         className="webdev-container"
      >
         <HeroSection />
         
         <motion.div style={{ y }} className="projects-section">
            <h2 className="webdev-title">Mes Projets</h2>
            <motion.div 
               className="projects-grid"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3, duration: 0.8 }}
            >
               {projects.map((project, index) => (
                  <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={setSelectedProject}
                  index={index}
                  />
               ))}
            </motion.div>
         </motion.div>
         <AnimatePresence>
         {selectedProject && (
            <ProjectModal
               project={selectedProject}
               isOpen={!!selectedProject}
               onClose={() => setSelectedProject(null)}
            />
         )}
         </AnimatePresence>
      </motion.div>
   );
};

export default WebDev;