import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import { constants } from './loadEnv'

// https://vitejs.dev/config/
export default defineConfig({
  define: constants,
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/ssr.tsx'),
      name: 'Client',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        dir: 'dist-ssr',
      },
    },
  },
})
