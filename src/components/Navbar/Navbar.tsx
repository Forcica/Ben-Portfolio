import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './Navbar.css';

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  
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
    <>
      <button 
        className="navbar-toggle" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          {isOpen ? (
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          ) : (
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          )}
        </svg>
      </button>
      <nav className={`navbar ${isOpen ? 'open' : ''}`}>
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
      </nav>
    </>
  );
};