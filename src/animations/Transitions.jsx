import gsap from 'gsap';

export const zoomToSection = (camera, targetPosition) => {
  gsap.to(camera.position, {
    duration: 2,
    x: targetPosition.x,
    y: targetPosition.y,
    z: targetPosition.z,
  });
};
