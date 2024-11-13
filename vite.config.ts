import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

import { Route } from './src/router/route'

const input = Object.fromEntries([
  ['main', 'index.html'] as const,
  ...Object.values(Route)
    .filter((route) => route !== Route.home)
    .map((route) => {
      const pageName = route.replace(/^\//, '')
      return [pageName, `${pageName}.html`] as const
    })
])

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), UnoCSS()],
  build: {
    rollupOptions: {
      input,
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
