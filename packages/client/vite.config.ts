import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    'process.env.SERVER_PORT': JSON.stringify(process.env.SERVER_PORT),
    'process.env.SERVER_HOST': JSON.stringify(process.env.SERVER_HOST),
    'process.env.PRAKTIKUM_HOST': JSON.stringify(process.env.PRAKTIKUM_HOST),
  },

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
