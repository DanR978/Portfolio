import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Project deploys to GitHub Pages at https://danr978.github.io/Portfolio/.
// `base` only needs to be set for the production build; dev server runs at /.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Portfolio/' : '/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
}));
