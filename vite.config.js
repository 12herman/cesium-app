import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cesium from 'vite-plugin-cesium';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/cesium-app',
  plugins: [react(), cesium(), tailwindcss(),],
  define: {
    CESIUM_BASE_URL: JSON.stringify('./'),
  },
});