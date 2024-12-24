import fs from 'fs'
import { fileURLToPath, URL } from 'node:url'

import UnpluginTypia from '@ryoppippi/unplugin-typia/vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

import { AllRoute, MiniSideProjectRoute } from './src/router/route'

const fileName = '[name]-[hash].[ext]'
const jsFileName = '[name]-[hash].js'

function checkMiniSideProjectPathIsExists(): void {
  const errorFilePaths: string[] = Object.values(MiniSideProjectRoute).filter(
    (item) => !item.startsWith('/projects/'),
  )
  if (errorFilePaths.length > 0) {
    throw new Error(`file path is not start with "projects": ${errorFilePaths.join(', ')}`)
  }

  const notExistsPaths: string[] = Object.values(MiniSideProjectRoute)
    .map((item) => `${item.replace('/', '')}.html`)
    .filter((item) => !fs.existsSync(item))
  if (notExistsPaths.length > 0) {
    throw new Error(`not found page: ${notExistsPaths.join(', ')}`)
  }
}
checkMiniSideProjectPathIsExists()

const input = Object.fromEntries([
  ['main', 'index.html'] as const,
  ...Object.values(AllRoute)
    .filter((route) => route !== AllRoute.Home)
    .map((route) => {
      const pageName = route.replace(/^\//, '')
      return [pageName, `${pageName}.html`] as const
    }),
])

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    UnpluginTypia(),
    vue(),
    UnoCSS(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*'],
        globIgnores: ['**/*.js.map'],
      },
      manifest: false,
    }),
  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      input,
      output: {
        format: 'es',
        entryFileNames: `js/${jsFileName}`,
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names[0]
          if (name === undefined) {
            return `assets/${fileName}`
          }
          if (name.endsWith('.css')) {
            return `css/${fileName}`
          }
          return `assets/${fileName}`
        },
        chunkFileNames: `js/${jsFileName}`,
        dir: 'dist',
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@themes': fileURLToPath(new URL('./themes', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
  },
})
