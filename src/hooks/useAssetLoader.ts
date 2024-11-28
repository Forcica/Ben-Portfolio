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
         // Vérifier le cache d'abord
         const cached = localStorage.getItem(CACHE_KEY);
         if (cached) {
            const { timestamp, data } = JSON.parse(cached);
            const isValid = Date.now() - timestamp < 24 * 60 * 60 * 1000; // 24h
            
            if (isValid) {
               setLoadingState({
                  progress: 100,
                  isLoading: false,
                  assetsLoaded: true
               });
               return data;
            }
         }

         try {
            const result = await preloadAssets((progress: number) => {
               setLoadingState(prev => ({
                  ...prev,
                  progress: Math.floor(progress)
               }));
            });

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
            setLoadingState(prev => ({
               ...prev,
               isLoading: false,
               assetsLoaded: false
            }));
         }
      };

      loadEverything();
   }, []);

   return loadingState;
};

export default useAssetLoader;