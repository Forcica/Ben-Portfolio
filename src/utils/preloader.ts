import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GLTF } from 'three/addons/loaders/GLTFLoader.js';
import { Mesh } from 'three';

type SetProgressFunction = (progress: number) => void;

interface ProgressEvent {
  lengthComputable: boolean;
  loaded: number;
  total: number;
}

const CACHE_KEY = 'model-cache-v1';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 heures

export const preloadAssets = async (setProgress: SetProgressFunction): Promise<boolean> => {
   let totalProgress = 0;

   
   const updateProgress = (value: number): void => {
      totalProgress = Math.min(totalProgress + value, 100);
      setProgress(Math.floor(totalProgress));
   };

   // Vérifier le cache
   const cached = localStorage.getItem(CACHE_KEY);
   if (cached) {
      const { timestamp, data } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
         updateProgress(100);
         return data;
      }
   }

   const loadGLTF = (): Promise<GLTF> => {
      return new Promise((resolve, reject) => {
         const loader = new GLTFLoader();
         loader.load(
         '/assets/models/scene.gltf',
         async (gltf: GLTF) => {
            await Promise.all(gltf.scene.children.map(child => {
               if ((child as Mesh).material) {
               return new Promise(resolve => {
                  const material = (child as Mesh).material;
                  if (Array.isArray(material)) {
                     material.forEach(m => m.needsUpdate = true);
                  } else {
                     material.needsUpdate = true;
                  }
                  resolve(true);
               });
               }
               return Promise.resolve();
            }));
            
            updateProgress(60);
            resolve(gltf);
         },
         (xhr: ProgressEvent) => {
            if (xhr.lengthComputable) {
               const progress = (xhr.loaded / xhr.total) * 60;
               setProgress(Math.floor(progress));
            }
         },
         (error: unknown) => {
            reject(error);
         }
         );
      });
   };

   const preloadDOMElements = (): Promise<void> => {
      return new Promise((resolve) => {
         updateProgress(20);
         resolve();
      });
   };

   try {
      await Promise.all([
         loadGLTF(),
         preloadDOMElements()
      ]);
      
      return true;
   } catch (error) {
      console.error('Erreur de chargement:', error);
      throw error;
   }
};