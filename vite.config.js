/* eslint-disable no-undef */
import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { htmlFiles } from './getHTMLFileNames';
import viteImagemin from 'vite-plugin-imagemin';

const input = { main: resolve(__dirname, 'src/index.html') };
htmlFiles.forEach((file) => {
  input[file.replace('.html', '')] = resolve(__dirname, 'src', file);
});

export default defineConfig({
  base: '/Inventa-Clinic',
  root: 'src',
  publicDir: '../public',
  plugins: [
    handlebars({ partialDirectory: resolve(__dirname, 'src/templates') }),
    viteImagemin({
      webp: {
        quality: 80,
      },
    }),
  ],
  build: {
    rollupOptions: {
      input,
    },
    outDir: '../dist/',
    emptyOutDir: true,
  },
});
