import React, { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import OptimizedTextureLoader from '@/utils/textureLoader';
import { loadGLTFAsync } from "@/utils/loadGLTFAsync";

interface SceneProps {
    onLoaded: () => void;
}

const Model: React.FC<{ onLoaded?: () => void }> = React.memo(({ onLoaded }) => {
   const { scene, animations } = useGLTF("/assets/models/scene-optimized.gltf", true);
   const { actions } = useAnimations(animations, scene);
   const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

   const lod = new THREE.LOD();
   
   useEffect(() => {
      const textureLoader = new OptimizedTextureLoader({
         isMobile,
         onProgress: (progress) => {
               console.log(`Chargement des textures: ${progress}%`);
         },
         maxTextureSize: isMobile ? 1024 : 2048,
         useCompression: true
      });

      scene.traverse(async (child) => {
         if (child instanceof THREE.Mesh) {
               child.frustumCulled = true;
               child.matrixAutoUpdate = false;
               child.updateMatrix();
               child.castShadow = false;
               child.receiveShadow = false;
               
               if (child.material) {
                  const materials = Array.isArray(child.material) ? child.material : [child.material];
                  
                  for (const material of materials) {
                     if (material.map) {
                           try {
                              material.map = await textureLoader.loadTexture(material.map.source.data.src);
                              material.needsUpdate = true;
                           } catch (error) {
                              console.error("Erreur lors du chargement de la texture optimisée:", error);
                           }
                     }
                  }
               }
         }
      });

      onLoaded?.();
      
      Object.values(actions).forEach(action => action?.play());
      return () => {
         Object.values(actions).forEach(action => action?.stop());
      };
   }, [scene, isMobile, onLoaded]);

   useEffect(() => {
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      
      scene?.traverse((object) => {
         if (object instanceof THREE.Mesh) {
            geometries.add(object.geometry);
            if (Array.isArray(object.material)) {
               object.material.forEach(material => materials.add(material));
            } else {
               materials.add(object.material);
            }
            
            // Optimisations supplémentaires
            object.frustumCulled = true;
            object.matrixAutoUpdate = false;
            object.updateMatrix();
         }
      });

      return () => {
         geometries.forEach((geometry: THREE.BufferGeometry) => geometry.dispose());
         materials.forEach((material: THREE.Material) => material.dispose());
      };
   }, [scene]);

   useEffect(() => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('/draco/');
      
      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);
      
      // Nettoyage
      return () => {
         dracoLoader.dispose();
      };
   }, []);

   useEffect(() => {
      const loadModels = async () => {
         const lowDetail = await loadGLTFAsync('/assets/models/scene-low.gltf');
         lod.addLevel(lowDetail.scene, 50);
         
         const highDetail = await loadGLTFAsync('/assets/models/scene.gltf');
         lod.addLevel(highDetail.scene, 0);
      };
      
      loadModels();
   }, []);

   return <primitive object={lod} />;
});

const CameraAnimation: React.FC = () => {
   const { camera } = useThree();

   useEffect(() => {
      gsap.to(camera.position, {
         duration: 2.5,
         x: 0,
         y: 1.5,
         z: 10,
         ease: "power2.inOut"
      });
   }, [camera]);

   return null;
};

const Scene: React.FC<SceneProps> = ({ onLoaded }) => {
   return (
      <>
         <ambientLight intensity={0.3} />
         <directionalLight position={[5, 8, 4]} intensity={1.5} />
         <Model onLoaded={onLoaded} />
         <CameraAnimation />
      </>
   );
};

export default Scene; 