import React, { Suspense, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera } from '@react-three/drei';
import gsap from 'gsap';

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
         position={[-0.8, -1.1, 4]}
         rotation={[0, 4.9, 0]} 
      />
   );
};

function CameraAnimation() {
   const { camera } = useThree();
   
   useEffect(() => {
   camera.position.set(0, 0, 20);
   gsap.to(camera.position, {
      duration: 2,
      z: 10,
      ease: "power2.inOut"
   });
   }, [camera]);

   return null;
}
 
function Canvas3D() {
   return (
      <Canvas>
         <CameraAnimation />
         <PerspectiveCamera makeDefault position={[0, 0, 20]} />
         <ambientLight intensity={1} />
         <directionalLight position={[0, 10, 5]} intensity={2.5} />
         <Suspense fallback={null}>
            <Model />
         </Suspense>
         <OrbitControls 
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            enabled={false}
         />
      </Canvas>
   );
}
 
 export default Canvas3D;
