import { defineConfig } from 'vite';
import { resolve } from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  root: 'src',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@public': resolve(__dirname, 'src/public'),
      '@templates': resolve(__dirname, 'src/templates'),
    },
  },
  build: {
    outDir: '../dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.html'),
      },
      output: {
        assetFileNames: assetInfo => {
          const extType = assetInfo.names[0].split('.').pop();
          if (/css/.test(extType)) {
            return `[name].[hash].css`;
          }
          return `[name].[hash][extname]`;
        },
      },
    },
  },
  server: {
    open: true,
  },
  plugins: [createHtmlPlugin()],
  assetsInclude: ['**/*.html'],
});
