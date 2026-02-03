import { defineConfig, normalizePath } from 'vite';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  build: {
    outDir: '../server/static',
    assetsDir: 'public',
    emptyOutDir: true,
    copyPublicDir: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        words: resolve(__dirname, 'words.html'),
        kanji: resolve(__dirname, 'kanji.html'),
        video: resolve(__dirname, 'video.html'),
      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: normalizePath(resolve(__dirname, './public/**/*')),
          dest: 'public',
        },
      ],
    }),
  ],
});
