import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { constants } from './loadEnv'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: constants,
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[ext]',
        entryFileNames: 'assets/[name].js',
      },
    },
  },
})
