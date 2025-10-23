import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {viteSourceLocator} from '@metagptx/vite-plugin-source-locator';

export default defineConfig({
  plugins: [
    viteSourceLocator({
      prefix: 'pak-zaika',
    }),
    react(),
  ],
  server: {
    port: 3000,
  },
});
