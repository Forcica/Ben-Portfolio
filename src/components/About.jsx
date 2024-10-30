import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
   return (
      <section id="about" className="about-section">
         <motion.div 
         className="about-content"
         initial={{ opacity: 0, y: 50 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         >
         <h2 className="about-title">À propos</h2>
         <div className="about-grid">
            <div className="about-text">
               <p>Développeur web passionné par la création d'expériences numériques uniques et innovantes. Je combine créativité et expertise technique pour donner vie à vos projets.</p>
               <p>Spécialisé en React, Three.js et développement full-stack, je m'efforce de créer des solutions sur mesure qui dépassent les attentes.</p>
            </div>
            <div className="about-skills">
               <h3>Compétences</h3>
               <div className="skills-grid">
               <span>React</span>
               <span>Three.js</span>
               <span>Node.js</span>
               <span>MongoDB</span>
               <span>WebGL</span>
               <span>GSAP</span>
               </div>
            </div>
         </div>
         </motion.div>
      </section>
   );
};

export default About;