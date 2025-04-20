// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/map': 'http://localhost:5000',
      '/resort': 'http://localhost:5000',
      '/graphql': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});
