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
      sourcemap: true,
      terserOptions: {
         compress: {
            drop_console: true,
            drop_debugger: true
         }
      },
      rollupOptions: {
         output: {
            manualChunks: {
               vendor: ['react', 'react-dom'],
               animations: ['framer-motion', 'gsap'],
               three: ['three', '@react-three/fiber', '@react-three/drei'],
               main: [
                 './src/components/sections/HeroSection/HeroSection',
                 './src/components/sections/About/About',
                 './src/components/sections/Contact/Contact'
               ]
            },
            chunkFileNames: (chunkInfo) => {
              const id = chunkInfo.facadeModuleId || '';
              if (id.includes('node_modules')) {
                return 'vendor/[name]-[hash].js';
              }
              return 'modules/[name]-[hash].js';
            }
         }
      },
      chunkSizeWarningLimit: 1000,
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
      modulePreload: {
         polyfill: true
      }
   },
   server: {
      port: 3000,
      strictPort: true,
      headers: {
         'X-Frame-Options': 'DENY',
         'X-Content-Type-Options': 'nosniff',
         'Referrer-Policy': 'strict-origin-when-cross-origin'
      }
   },
   optimizeDeps: {
      include: [
         'react',
         'react-dom',
         'framer-motion',
         'gsap',
         'three',
         '@react-three/fiber',
         '@react-three/drei'
      ],
      exclude: ['@vercel/analytics']
   }
})
