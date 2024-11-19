import { fileURLToPath, URL } from 'node:url'

import UnpluginTypia from '@ryoppippi/unplugin-typia/vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

import { Route } from './src/router/route'

const input = Object.fromEntries([
  ['main', 'index.html'] as const,
  ...Object.values(Route)
    .filter((route) => route !== Route.Home)
    .map((route) => {
      const pageName = route.replace(/^\//, '')
      return [pageName, `${pageName}.html`] as const
    })
])

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [UnpluginTypia(), vue(), UnoCSS()],
  build: {
    rollupOptions: {
      input,
      output: {
        entryFileNames: '[name]/index.js',
        assetFileNames: '[name].[ext]'
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@themes': fileURLToPath(new URL('./themes', import.meta.url))
    }
  }
})
