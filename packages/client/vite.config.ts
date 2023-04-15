import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { envConstants } from './src/constants/load-env'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: envConstants,
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
