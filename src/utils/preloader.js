import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three';

export const preloadAssets = async (setProgress) => {
  let totalProgress = 0;
  
  const updateProgress = (value) => {
    totalProgress = Math.min(totalProgress + value, 100);
    setProgress(Math.floor(totalProgress));
  };

  const loadGLTF = () => {
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader();
      loader.load(
        '/assets/models/scene.gltf',
        (gltf) => {
          if (gltf.animations) {
            gltf.animations.forEach(animation => {
              animation.play && animation.play();
            });
          }
          setTimeout(() => {
            updateProgress(60);
            resolve(gltf);
          }, 300);
        },
        (xhr) => {
          if (xhr.lengthComputable) {
            const progress = (xhr.loaded / xhr.total) * 60;
            setProgress(Math.floor(progress));
          }
        },
        reject
      );
    });
  };

  const preloadThreeJSScene = () => {
    return new Promise(resolve => {
      updateProgress(20);
      resolve();
    });
  };

  const preloadDOMElements = () => {
    return new Promise(resolve => {
      updateProgress(20);
      resolve();
    });
  };

  try {
    await Promise.all([
      loadGLTF(),
      preloadThreeJSScene(),
      preloadDOMElements()
    ]);
    
    return true;
  } catch (error) {
    console.error('Erreur de chargement:', error);
    throw error;
  }
};