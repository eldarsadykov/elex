import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { viteStaticCopy, ViteStaticCopyOptions, Target } from "vite-plugin-static-copy";
import { watchExternal } from "./plugins/watchExternal";

const content: Target = {
  src: 'node_modules/@elex/content/dist/static',
  dest: '',
};

const staticCopyOptions: ViteStaticCopyOptions = { targets: [content] }

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag === 'elex-chapter'
        }
      }
    }),
    vueJsx(),
    vueDevTools(),
    viteStaticCopy(staticCopyOptions),
    watchExternal(content.src),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
