import * as THREE from 'three';

interface TextureLoaderOptions {
   isMobile: boolean;
   onProgress?: (progress: number) => void;
   maxTextureSize?: number;
   useCompression?: boolean;
}

class OptimizedTextureLoader {
   private loader: THREE.TextureLoader;
   private isMobile: boolean;
   private onProgress?: (progress: number) => void;
   private maxTextureSize: number;
   private useCompression: boolean;

   constructor({ isMobile, onProgress, maxTextureSize = 2048, useCompression = true }: TextureLoaderOptions) {
      this.loader = new THREE.TextureLoader();
      this.isMobile = isMobile;
      this.onProgress = onProgress;
      this.maxTextureSize = maxTextureSize;
      this.useCompression = useCompression;
   }

   private getOptimizedPath(originalPath: string): string {
      const ext = originalPath.split('.').pop();
      const basePath = originalPath.replace(`.${ext}`, '');
      
      if (this.useCompression) {
         return this.isMobile 
         ? `${basePath}-mobile-compressed.${ext}`
         : `${basePath}-optimized-compressed.${ext}`;
      }
      
      return this.isMobile 
         ? `${basePath}-mobile.${ext}`
         : `${basePath}-optimized.${ext}`;
   }

   async loadTexture(path: string): Promise<THREE.Texture> {
      const optimizedPath = this.getOptimizedPath(path);
      
      return new Promise((resolve, reject) => {
         this.loader.load(
         optimizedPath,
         (texture) => {
            if (texture.image.width > this.maxTextureSize || texture.image.height > this.maxTextureSize) {
               const scale = this.maxTextureSize / Math.max(texture.image.width, texture.image.height);
               texture.image.width *= scale;
               texture.image.height *= scale;
            }
            
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.generateMipmaps = false;
            
            resolve(texture);
         },
         (progress) => {
            if (this.onProgress) {
               this.onProgress((progress.loaded / progress.total) * 100);
            }
         },
         reject
         );
      });
   }
}

export default OptimizedTextureLoader; 