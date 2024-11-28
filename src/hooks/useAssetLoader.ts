import { useState, useEffect } from 'react';
import { preloadAssets } from '../utils/preloader';

const CACHE_KEY = 'model-cache-v2';

const useAssetLoader = () => {
   const [loadingState, setLoadingState] = useState({
      progress: 0,
      isLoading: true,
      assetsLoaded: false
   });

   useEffect(() => {
      const hasLoadedBefore = localStorage.getItem(CACHE_KEY);
      
      if (hasLoadedBefore) {
         setLoadingState({
            progress: 100,
            isLoading: false,
            assetsLoaded: true
         });
         return;
      }

      const loadEverything = async () => {
         try {
            await preloadAssets((progress: number) => {
               setLoadingState(prev => ({
                  ...prev,
                  progress: Math.floor(progress)
               }));
            });

            localStorage.setItem(CACHE_KEY, 'loaded');
            
            setLoadingState({
               progress: 100,
               isLoading: false,
               assetsLoaded: true
            });
         } catch (error) {
            console.error('Erreur lors du chargement:', error);
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