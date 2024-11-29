import { useState, useEffect } from 'react';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GLTF } from 'three/addons/loaders/GLTFLoader.js';
import { Mesh, Material } from 'three';

const CACHE_KEY = 'portfolio-cache-v2';
const CACHE_DURATION = 24 * 60 * 60 * 1000;

const useAssetLoader = () => {
  const [state, setState] = useState({
    progress: 0,
    isLoading: true,
    assetsLoaded: false
  });

  useEffect(() => {
    const loadAssets = async () => {
      try {
        // Vérification du cache
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setState({ progress: 100, isLoading: false, assetsLoaded: true });
            return;
          }
        }

        // Chargement du modèle 3D
        const loadGLTF = new Promise<GLTF>((resolve, reject) => {
          const loader = new GLTFLoader();
          loader.load(
            '/assets/models/scene.gltf',
            resolve,
            (xhr) => {
              if (xhr.lengthComputable) {
                const progress = (xhr.loaded / xhr.total) * 100;
                setState(prev => ({
                  ...prev,
                  progress: Math.floor(progress)
                }));
              }
            },
            reject
          );
        });

        const gltf = await loadGLTF;

        // Optimisation des matériaux
        await Promise.all(gltf.scene.children.map(child => {
          if ((child as Mesh).material) {
            const material = (child as Mesh).material as Material;
            if (Array.isArray(material)) {
              material.forEach(m => m.needsUpdate = true);
            } else {
              material.needsUpdate = true;
            }
          }
          return Promise.resolve();
        }));

        // Mise en cache
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: Date.now()
        }));

        setState({
          progress: 100,
          isLoading: false,
          assetsLoaded: true
        });

      } catch (error) {
        console.error('Erreur de chargement:', error);
        setState({
          progress: 100,
          isLoading: false,
          assetsLoaded: true
        });
      }
    };

    loadAssets();
  }, []);

  return state;
};

export default useAssetLoader;