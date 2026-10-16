import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Change this to match your GitHub repo name:
  // e.g. base: '/forankring/'
  base: '/forankring/',
});
