import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: './main.ts',
                words: './words.ts',
                kanji: './kanji.ts',
                video: './video.ts',
            }
        }
    }
})
