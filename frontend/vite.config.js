import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

import eslint from 'vite-plugin-eslint'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, './src/styles/index.js'),
      '@components': path.resolve(__dirname, './src/components/index.js'),
      '@contexts': path.resolve(__dirname, './src/contexts/index.js'),
      '@services': path.resolve(__dirname, './src/services/index.js'),
      '@hooks': path.resolve(__dirname, './src/hooks/index.js'),
      '@utils': path.resolve(__dirname, './src/utils/index.js'),
      '@pages': path.resolve(__dirname, './src/pages/index.js'),
      '@router': path.resolve(__dirname, './src/router/index.js')
    }
  },
  plugins: [react(), eslint()]
})
