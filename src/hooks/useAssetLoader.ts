import { useState, useEffect } from 'react';
import { preloadAssets } from '../utils/preloader';

const CACHE_KEY = 'model-cache-v1';

const useAssetLoader = () => {
   const [loadingState, setLoadingState] = useState({
      progress: 0,
      isLoading: true,
      assetsLoaded: false
   });

   useEffect(() => {
      const loadEverything = async () => {
         try {
            const result = await preloadAssets((progress: number) => {
               setLoadingState(prev => ({
                  ...prev,
                  progress: Math.floor(progress)
               }));
            });

            // Sauvegarder dans le cache
            localStorage.setItem(CACHE_KEY, JSON.stringify({
               timestamp: Date.now(),
               data: result
            }));

            setLoadingState({
               progress: 100,
               isLoading: false,
               assetsLoaded: true
            });
         } catch (error) {
            console.error('Erreur lors du chargement:', error);
            // En cas d'erreur, on essaie de charger depuis le cache
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
               JSON.parse(cached);
               setLoadingState({
                  progress: 100,
                  isLoading: false,
                  assetsLoaded: true
               });
            }
         }
      };

      loadEverything();
   }, []);

   return loadingState;
};

export default useAssetLoader;