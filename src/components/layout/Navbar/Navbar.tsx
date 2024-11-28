import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
   const [scrolled, setScrolled] = useState(false);

   useEffect(() => {
      const handleScroll = () => {
         setScrolled(window.scrollY > 50);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   return (
      <motion.nav
         initial={{ y: -100 }}
         animate={{ y: 0 }}
         className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
      >
         <div className="navbar-content">
         <Link to="/" className="navbar-logo">
            DC
         </Link>
         <div className="navbar-links">
            <Link to="/#about">À propos</Link>
            <Link to="/#projects">Projets</Link>
            <Link to="/#contact">Contact</Link>
         </div>
         </div>
      </motion.nav>
   );
};

export default Navbar;