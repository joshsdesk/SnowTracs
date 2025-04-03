import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: './',                    // ✅ Use client/ as root
  publicDir: 'public',           // ✅ Serve /public/index.html
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': 'http://localhost:3001',
      '/auth': 'http://localhost:3001',
      // Future DB or weather route proxies go here
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
