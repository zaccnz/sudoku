import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src',
  base: '/sudoku/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src', 'index.html'),
        solver: resolve(__dirname, 'src', 'solver/index.html'),
      },
      output: {
        dir: resolve(__dirname, 'dist'),
      }
    }
  },
  plugins: [react()],
  css: {
    modules: {
      localsConvention: "camelCase",
    }
  }
})
