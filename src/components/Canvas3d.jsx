import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera } from '@react-three/drei';

const Model = () => {
   const { scene } = useGLTF('/assets/models/scene.gltf');
 
   React.useEffect(() => {
     if (scene) {
       console.log("Modèle chargé:", scene);
     }
   }, [scene]);
 
   if (!scene) {
     console.error("Impossible de charger le modèle 3D");
     return null;
   }
 
   return (
      <primitive 
         object={scene} 
         scale={[0.04, 0.04, 0.04]} 
         position={[-1, -1.5, 3]}
         rotation={[0, 4.9, 0]} 
      />
   );
 };

function Canvas3D() {
   return (
      <Canvas>
         <PerspectiveCamera makeDefault position={[0, 0, 10]} />
         <ambientLight intensity={1} />
         <directionalLight position={[0, 10, 5]} intensity={1.5} />
         <Suspense fallback={null}>
         <Model />
         </Suspense>
         <OrbitControls />
      </Canvas>
   );
}
 
 export default Canvas3D;
