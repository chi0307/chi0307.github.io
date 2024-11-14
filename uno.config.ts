import { defineConfig, transformerDirectives } from 'unocss'

import { colors } from './themes/colors'

export default defineConfig({
  theme: {
    colors,
    boxShadow: {
      header: '0px 2px 20px 0 rgba(0, 0, 0, .2)',
      'profile-card': '-10px 10px 18px 0 rgba(0, 0, 0, .2)',
      'resume-card': '-12px 12px 20px 0 rgba(0, 0, 0, 0.2)'
    }
  },
  shortcuts: {
    'flex-center': 'flex items-center justify-center',
    'flex-col': 'flex flex-col'
  },
  transformers: [transformerDirectives()]
})
