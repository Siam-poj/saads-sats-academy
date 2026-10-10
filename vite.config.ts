import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Relative base path ensures it works on GitHub Pages, Vercel, and Cloudflare Pages
  server: {
    port: 3000,
    host: true
  }
});
