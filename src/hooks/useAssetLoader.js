import { useState, useEffect } from 'react';

const useAssetLoader = () => {
   const [loadingState, setLoadingState] = useState({
      progress: 0,
      isLoading: true,
      assetsLoaded: false
   });

   useEffect(() => {
      const loadEverything = async () => {
         // Simuler un chargement progressif
         for (let i = 0; i <= 100; i += 1) {
            await new Promise(resolve => setTimeout(resolve, 20));
            setLoadingState(prev => ({ ...prev, progress: i }));
         }

         // Attendre que le canvas soit initialisé
         await new Promise(resolve => setTimeout(resolve, 1000));
         
         setLoadingState({
            progress: 100,
            isLoading: false,
            assetsLoaded: true
         });
      };

      loadEverything();
   }, []);

   return loadingState;
};

export default useAssetLoader;