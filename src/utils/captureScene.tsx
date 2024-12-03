export const captureScene = () => {
   try {
      console.log('Tentative de capture...');
      const canvas = document.querySelector('canvas');
      console.log('Canvas trouvé:', !!canvas);
      
      if (!canvas) {
            throw new Error('Canvas non trouvé');
      }

      console.log('Création du dataURL...');
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      console.log('DataURL créé:', dataUrl.substring(0, 50) + '...');

      const link = document.createElement('a');
      link.download = 'scene-static.png';
      link.href = dataUrl;
      
      console.log('Déclenchement du téléchargement...');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('Téléchargement terminé');
   } catch (error) {
      console.error('Erreur lors de la capture:', error);
   }
};

<button onClick={captureScene}>Capture Scene</button>