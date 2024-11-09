import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const preloadAssets = async (setProgress) => {
  const assets = [
    '/assets/models/scene.gltf'
  ];
  
  let loaded = 0;
  const totalAssets = assets.length;
  
  const promises = assets.map(asset => {
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader();
      loader.load(
        asset,
        (gltf) => {
          loaded++;
          setProgress((loaded / totalAssets) * 100);
          resolve(gltf);
        },
        (xhr) => {
          const progress = (xhr.loaded / xhr.total) * 100;
          setProgress((progress / totalAssets) + ((loaded / totalAssets) * 100));
        },
        reject
      );
    });
  });

  await Promise.all(promises);
  return true;
}; 