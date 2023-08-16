import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteSass from 'vite-plugin-sass';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteSass({
      sassOptions: {
        outputStyle: 'compressed',
      },
      includePaths: ['./src'],
    }),
  ],
  server: {
    port: 3000,
  },
  css: {
    modules: true,
  },
});
