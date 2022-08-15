import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

const alias = {
  '@': path.resolve(__dirname, './src/photoeditor'),
};

// https://vitejs.dev/config/
export default defineConfig({
  resolve: { alias },
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Photo Editor',
        short_name: 'PhotoEditor',
        description: 'A fully functional Photo Editor made with Vuejs',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
          { src: 'img/icons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          {
            src: 'img/icons/android-chrome-maskable-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          { src: 'img/icons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          {
            src: 'img/icons/android-chrome-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        start_url: '.',
        display: 'standalone',
      },
    }),
  ],
});
