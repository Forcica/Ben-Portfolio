import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export const loadGLTFAsync = (url: string, manager?: THREE.LoadingManager) => {
   const loader = new GLTFLoader(manager);
   const dracoLoader = new DRACOLoader();
   
   dracoLoader.setDecoderPath('/draco/');
   loader.setDRACOLoader(dracoLoader);

   return loader.loadAsync(url)
      .finally(() => {
         dracoLoader.dispose();
      });
};

export const preloadAssets = async () => {
   const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
   const modelPath = isMobile ? 'scene-low.gltf' : 'scene.gltf';
   
   try {
      await loadGLTFAsync(`/assets/models/${modelPath}`);
   } catch (error) {
      console.error('Erreur de préchargement:', error);
   }
};