import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        portfolio: resolve(__dirname, 'portfolio.html'),
        'project-single': resolve(__dirname, 'project-single.html'),
        about: resolve(__dirname, 'about.html'),
        services: resolve(__dirname, 'services.html'),
        contact: resolve(__dirname, 'contact.html'),
        blog: resolve(__dirname, 'blog.html'),
        'blog-single': resolve(__dirname, 'blog-single.html'),
        '404': resolve(__dirname, '404.html')
      }
    },
    assetsDir: 'assets',
    sourcemap: false,
    minify: true
  },
  server: {
    port: 3000,
    host: true,
    open: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./assets/scss/variables";`
      }
    }
  },
  assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.ttf', '**/*.otf']
});