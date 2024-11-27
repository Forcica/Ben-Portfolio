import { useState, useEffect } from 'react';

const useAssetLoader = () => {
   const [loadingState, setLoadingState] = useState({
      progress: 0,
      isLoading: true,
      assetsLoaded: false
   });

   useEffect(() => {
      const loadEverything = async () => {
         try {
            // Simuler un chargement progressif plus court
            for (let i = 0; i <= 100; i += 2) {
               await new Promise(resolve => setTimeout(resolve, 10));
               setLoadingState(prev => ({ ...prev, progress: i }));
            }
            
            setLoadingState({
               progress: 100,
               isLoading: false,
               assetsLoaded: true
            });
         } catch (error) {
            console.error("Erreur de chargement:", error);
            // En cas d'erreur, on continue quand même
            setLoadingState({
               progress: 100,
               isLoading: false,
               assetsLoaded: true
            });
         }
      };

      loadEverything();
   }, []);

   return loadingState;
};

export default useAssetLoader;