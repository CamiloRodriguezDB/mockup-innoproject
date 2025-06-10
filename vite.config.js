import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    base: '/mockup-innoproject',
    build: {
      outDir: 'dist/react-showcase'
    },
    plugins: [react()]
  };
});
