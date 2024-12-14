import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { colors } from '@themes/colors'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import { aliases, fa } from 'vuetify/iconsets/fa'
import { mdi } from 'vuetify/iconsets/mdi'

export const vuetify = createVuetify({
  components,
  theme: {
    defaultTheme: 'custom',
    themes: {
      custom: {
        colors,
      },
    },
  },
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
      mdi,
    },
  },
})
