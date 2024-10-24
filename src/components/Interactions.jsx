import React, { useCallback } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';

const Interactions = ({ modelRef }) => {
  const { camera } = useThree();

  // Fonction pour zoomer sur une partie (par exemple, section Web Dev)
  const goToWebDev = useCallback(() => {
    gsap.to(camera.position, { duration: 2, x: 10, y: 5, z: 5 }); // Animation caméra
    // Afficher ou masquer les sections Web Dev ici
    document.getElementById('web-dev').style.display = 'block';
  }, [camera]);

  const goToLevelDesign = useCallback(() => {
    gsap.to(camera.position, { duration: 2, x: -10, y: 5, z: 5 }); // Animation caméra
    // Afficher ou masquer les sections Level Design ici
    document.getElementById('level-design').style.display = 'block';
  }, [camera]);

  return (
    <>
      {/* Ajout de zones invisibles cliquables */}
      <mesh position={[2, 0, 0]} onClick={goToWebDev}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>
      <mesh position={[-2, 0, 0]} onClick={goToLevelDesign}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>
    </>
  );
};

export default Interactions;
