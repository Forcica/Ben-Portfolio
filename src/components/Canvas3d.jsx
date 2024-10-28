import React, { Suspense, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera, SpotLight } from '@react-three/drei';
import gsap from 'gsap';
import { useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import '../styles/NavigationButtons.css';

function NavigationButtons() {
   const navigate = useNavigate();
   const [opacity, setOpacity] = useState(0);
 
   useEffect(() => {
      gsap.to({}, {
         duration: 1,
         onUpdate: () => setOpacity(prev => Math.min(prev + 0.05, 1)),
      });
   }, []);
 
   return (
      <>
         <mesh 
            position={[1.2, -0.2, 4.5]} 
            onClick={() => navigate('/level-design')}
            castShadow
            receiveShadow
         >
            <boxGeometry args={[1, 0.5, 0.1]} />
            <meshStandardMaterial 
               color="blue" 
               transparent 
               opacity={opacity} 
               roughness={0.5}
               metalness={0.5}
               emissive="darkblue"
               emissiveIntensity={0.1}
            />
            <Html center className="mesh-button-text">
               <div className="button-text" style={{ opacity }}>Level Design</div>
            </Html>
         </mesh>
         <SpotLight
            position={[1.2, 1, 5]}
            angle={0.3}
            penumbra={1}
            intensity={2}
            castShadow
            shadow-mapSize={[512, 512]}
         />
         <mesh 
            position={[-1.5, -0.2, 4.5]} 
            onClick={() => navigate('/web-dev')}
            castShadow
            receiveShadow
         >
            <boxGeometry args={[1, 0.5, 0.1]} />
            <meshStandardMaterial 
               color="#5f5b87" 
               transparent 
               opacity={opacity} 
               roughness={0.5}
               metalness={0.5}
               emissive="purple"
               emissiveIntensity={0.4}
            />
            <Html center className="mesh-button-text">
               <div className="button-text" style={{ opacity }}>Web Dev</div>
            </Html>
         </mesh>
         <SpotLight
            position={[-1.5, 1, 5]}
            angle={0.3}
            penumbra={1}
            intensity={2}
            castShadow
            shadow-mapSize={[512, 512]}
         />
      </>
   );
}

const Model = () => {
   const { scene, animations } = useGLTF('/assets/models/scene.gltf');
   const { actions } = useAnimations(animations, scene);
 
   useEffect(() => {
      if (scene) {
         for (const action of Object.values(actions)) {
           if (action) {
             action.play();
             action.setLoop(THREE.LoopRepeat);
           }
         }
      }
   }, [scene, actions]);

   if (!scene) {
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

function CameraAnimation({ onAnimationComplete }) {
   const { camera } = useThree();
   const [animationPlayed, setAnimationPlayed] = useState(false);
    
   useEffect(() => {
      if (!animationPlayed) {
         camera.position.set(0, 0, 20);
         gsap.to(camera.position, {
            duration: 2,
            z: 10,
            ease: "power2.inOut",
            onComplete: () => {
               onAnimationComplete();
               setAnimationPlayed(true);
            }
         });
      }
   }, [camera, onAnimationComplete, animationPlayed]);

   return null;
}
 
function Canvas3D() {
   const [showButtons, setShowButtons] = useState(false);
 
   const handleAnimationComplete = () => {
     setShowButtons(true);
   };
 
   return (
      <Canvas shadows>
         <CameraAnimation onAnimationComplete={handleAnimationComplete} />
         <PerspectiveCamera makeDefault position={[0, 0, 20]} />
         <ambientLight intensity={1} />
         <directionalLight 
            position={[0, 10, 5]} 
            intensity={2.5} 
            castShadow
            shadow-mapSize={[1024, 1024]}
         />
         <Suspense fallback={null}>
            <Model />
         </Suspense>
         <OrbitControls 
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            enabled={false}
         />
         {showButtons && <NavigationButtons />}
         <mesh 
            position={[0, -1.5, 0]} 
            rotation={[-Math.PI / 2, 0, 0]} 
            receiveShadow
         >
            <planeGeometry args={[100, 100]} />
            <shadowMaterial opacity={0.4} />
         </mesh>
      </Canvas>
   );
}

export default Canvas3D;
