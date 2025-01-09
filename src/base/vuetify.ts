import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { colors } from '@themes/colors'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import { fa } from 'vuetify/iconsets/fa'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

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
    defaultSet: 'mdi',
    aliases,
    sets: {
      fa,
      mdi,
    },
  },
})

// vuetify 亂加東西，以後要想看看能換什麼套件，把 vuetify 換掉
const htmlElement = document.querySelector('html')
if (htmlElement !== null) {
  htmlElement.style.overflowY = 'auto'
}
