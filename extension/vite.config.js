import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [{
        src: 'src/manifest.json',
        dest: '.'
      }]
    })
  ],
  build: {
  rollupOptions: {
    input: {
      popup: resolve(__dirname, 'src/popup/index.html'),
      background: resolve(__dirname, 'src/background/service_worker.js'),
      content: resolve(__dirname, 'src/content/contentScript.js')
    },
    output: {
      entryFileNames: '[name].js', // Critical - removes assets/ prefix
      assetFileNames: 'assets/[name].[ext]'
    }
  }
}
});