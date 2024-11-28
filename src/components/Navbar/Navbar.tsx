import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './Navbar.css';

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState(0);
  
  const scrollToSection = (sectionClass: string) => {
    const section = document.querySelector(`.${sectionClass}-section`);
    if (section) {
      const navHeight = 80; // hauteur approximative de la navbar si vous en avez une en haut
      const targetPosition = section.getBoundingClientRect().top + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const sections = [
      document.querySelector('.hero-section'),
      document.querySelector('.projects-section'),
      document.querySelector('.about-section'),
      document.querySelector('.contact-section')
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      sections.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          
          if (scrollPosition < 100) {
            setActiveSection(0);
            return;
          }
          
          if (rect.top <= window.innerHeight * 0.3 && rect.bottom >= window.innerHeight * 0.3) {
            setActiveSection(index);
          }
        }
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { ref: 'heroRef', label: 'Accueil' },
    { ref: 'projectsRef', label: 'Projets' },
    { ref: 'aboutRef', label: 'À propos' },
    { ref: 'contactRef', label: 'Contact' }
  ];

  return (
    <motion.nav 
      className="navbar"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="progress-indicator">
        <motion.div 
          className="progress-bar"
          initial={{ height: "8px" }}
          animate={{ 
            height: "8px",
            top: (() => {
              const activeLink = document.querySelector('.nav-link.active');
              if (!activeLink) return '20px';
              
              const index = Array.from(document.querySelectorAll('.nav-link'))
                                .indexOf(activeLink);
              
              return `${24 + (index * (40 + 19.2)) + 20}px`;
            })()
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        />
      </div>
      <div className="nav-links">
        {links.map(({ ref, label }, index) => (
          <motion.button
            key={ref}
            onClick={() => scrollToSection(ref.replace('Ref', '').toLowerCase())}
            className={`nav-link ${index === activeSection ? 'active' : ''}`}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            {label}
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
};