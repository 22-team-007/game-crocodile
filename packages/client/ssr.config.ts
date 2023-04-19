import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import { envConstants } from './src/constants/load-env'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: envConstants,
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
