import UnpluginTypia from '@ryoppippi/unplugin-typia/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [UnpluginTypia()],
  test: {
    globals: true,
    include: ['src/**/*.{test,spec}.ts'],
  },
})
