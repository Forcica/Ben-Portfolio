import { useState, useEffect } from 'react';
import { preloadAssets } from '../utils/preloader';

const useAssetLoader = () => {
   const [loadingState, setLoadingState] = useState({
      progress: 0,
      isLoading: true,
      assetsLoaded: false
   });

   useEffect(() => {
      const loadEverything = async () => {
         try {
            await preloadAssets((progress: number) => {
               setLoadingState(prev => ({
                  ...prev,
                  progress: Math.floor(progress)
               }));
            });

            setLoadingState({
               progress: 100,
               isLoading: false,
               assetsLoaded: true
            });
         } catch (error) {
            console.error('Erreur lors du chargement:', error);
         }
      };

      loadEverything();
   }, []);

   return loadingState;
};

export default useAssetLoader;