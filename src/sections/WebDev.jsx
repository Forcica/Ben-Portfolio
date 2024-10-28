import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/Card';
import { motion } from "framer-motion"
import ProjectModal from '../components/Modal';
import { projects } from '../data/projectsConfig';

import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

import '../styles/WebDev.css';

const WebDev = () => {
   const [selectedProject, setSelectedProject] = useState(null);
   const [scrollY, setScrollY] = useState(0);
   
   const particlesInit = useCallback(async (engine) => {
      await loadSlim(engine);
   }, []);

   // Ajout du callback pour le chargement
   const particlesLoaded = useCallback(async (container) => {
      // console.log(container);
   }, []);

   useEffect(() => {
      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   return (
      <div className="webdev-container">
            {[...Array(5)].map((_, i) => (
               <motion.div
                  key={i}
                  className="absolute h-screen w-8 bg-[url('/api/placeholder/32/600')] bg-no-repeat opacity-20"
                  style={{
                     left: `${15 + i * 20}%`,
                  }}
                  animate={{
                     y: [0, 50, 0],
                  }}
                  transition={{
                     repeat: Infinity,
                     duration: 10 + i * 2,
                     ease: "easeInOut",
                  }}
               />
            ))}

            {/* Japanese Pattern Overlay */}
            <div 
            className="fixed inset-0 pointer-events-none opacity-5"
            style={{
               backgroundImage: `url('/api/placeholder/100/100')`,
               backgroundSize: '50px',
            }}
            />

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
               <h1 className="webdev-title">
                  Mes Projets
               </h1>

               <div className="projects-grid">
                  {projects.map((project) => (
                     <ProjectCard
                        key={project.id}
                        project={project}
                        onSelect={setSelectedProject}
                     />
                  ))}
               </div>
            </div>

         {/* Modal */}
         <AnimatePresence>
            {selectedProject && (
               <ProjectModal
                  project={selectedProject}
                  isOpen={!!selectedProject}
                  onClose={() => setSelectedProject(null)}
               />
            )}
         </AnimatePresence>

         {/* Decorative Elements */}
         <div className="petals-container">
            <Particles
               id="tsparticles"
               init={particlesInit}
               loaded={particlesLoaded}
               options={{
                  background: {
                     color: {
                        value: "transparent",
                     },
                  },
                  fpsLimit: 60,
                  particles: {
                     color: {
                        value: "#ffb7c5", // Couleur rose pâle pour les pétales
                     },
                     links: {
                        enable: false, // Désactive les liens entre particules
                     },
                     move: {
                        enable: true,
                        speed: 2,
                        direction: "bottom",
                        random: true,
                        straight: false,
                        outModes: {
                           default: "out"
                        },
                        attract: {
                           enable: true,
                           rotateX: 600,
                           rotateY: 1200
                        }
                     },
                     number: {
                        value: 30,
                        density: {
                           enable: true,
                           area: 800
                        }
                     },
                     opacity: {
                        value: 0.7,
                        random: true
                     },
                     shape: {
                        type: "circle",
                     },
                     size: {
                        value: { min: 3, max: 7 },
                        random: true
                     },
                     rotate: {
                        value: 0,
                        direction: "random",
                        animation: {
                           enable: true,
                           speed: 5,
                           sync: false
                        }
                     },
                  },
                  detectRetina: true,
               }}
            />
         </div>
      </div>
   );
};

export default WebDev;