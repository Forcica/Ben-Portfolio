import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
   plugins: [react()],
   resolve: {
      alias: {
         '@': path.resolve(__dirname, './src'),
         '@components': path.resolve(__dirname, './src/components'),
         '@pages': path.resolve(__dirname, './src/pages'),
         '@styles': path.resolve(__dirname, './src/styles'),
         '@hooks': path.resolve(__dirname, './src/hooks'),
         '@utils': path.resolve(__dirname, './src/utils'),
         '@assets': path.resolve(__dirname, './src/assets'),
         'three': 'three'
      }
   },
   build: {
      minify: 'terser',
      sourcemap: false,
      rollupOptions: {
         output: {
            manualChunks: {
               vendor: ['react', 'react-dom'],
               animations: ['framer-motion', 'gsap'],
               three: ['three', '@react-three/fiber', '@react-three/drei']
            }
         }
      },
      chunkSizeWarningLimit: 1000
   },
   server: {
      port: 3000,
      strictPort: true,
      headers: {
         'X-Frame-Options': 'DENY',
         'X-Content-Type-Options': 'nosniff',
         'Referrer-Policy': 'strict-origin-when-cross-origin'
      }
   }
})
