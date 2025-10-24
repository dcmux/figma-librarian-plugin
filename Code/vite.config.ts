import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    target: 'es5', // Much older target for compatibility
    rollupOptions: {
      input: {
        ui: resolve(__dirname, 'index.html'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        format: 'iife', // IIFE format, not ES modules
        name: 'LibrarianPlugin',
      }
    },
  },
  esbuild: {
    target: 'es5', // Also set esbuild target
  },
});