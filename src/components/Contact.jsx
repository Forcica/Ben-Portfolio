import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: ''
   });

   const handleSubmit = (e) => {
      e.preventDefault();
      // Ajoutez ici votre logique d'envoi de formulaire
      console.log(formData);
   };

   return (
      <section id="contact" className="contact-section">
         <motion.div 
         className="contact-content"
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         viewport={{ once: true }}
         >
         <h2 className="contact-title">Me Contacter</h2>
         <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
               <input
               type="text"
               placeholder="Votre nom"
               value={formData.name}
               onChange={(e) => setFormData({...formData, name: e.target.value})}
               required
               />
            </div>
            <div className="form-group">
               <input
               type="email"
               placeholder="Votre email"
               value={formData.email}
               onChange={(e) => setFormData({...formData, email: e.target.value})}
               required
               />
            </div>
            <div className="form-group">
               <textarea
               placeholder="Votre message"
               value={formData.message}
               onChange={(e) => setFormData({...formData, message: e.target.value})}
               required
               />
            </div>
            <button type="submit" className="submit-button">
               Envoyer
            </button>
         </form>
         </motion.div>
      </section>
   );
};

export default Contact;