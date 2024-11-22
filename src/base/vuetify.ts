import 'vuetify/styles'

import { colors } from '@themes/colors'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'

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
})
