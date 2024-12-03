export const initWebGLContext = () => {
   const canvas = document.createElement('canvas');
   const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
   
   if (!gl) {
      throw new Error('WebGL not supported');
   }
   
   const extensions = {
      anisotropic: gl.getExtension('EXT_texture_filter_anisotropic'),
      compression: gl.getExtension('WEBGL_compressed_texture_s3tc'),
      floatTextures: gl.getExtension('OES_texture_float'),
   };
   
   return {
      gl,
      extensions,
      maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
      maxAnisotropy: extensions.anisotropic ? 
         gl.getParameter(extensions.anisotropic.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 1,
   };
}; 