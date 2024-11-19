import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import 'vuetify/styles'
import '@fortawesome/fontawesome-free/css/all.css'

import { createApp, type App, type Component } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'

import { colors } from '../themes/colors'

export function createBaseApp(component: Component): App<Element> {
  const app = createApp(component)

  const vuetify = createVuetify({
    components,
    theme: {
      defaultTheme: 'custom',
      themes: {
        custom: {
          colors
        }
      }
    }
  })
  app.use(vuetify)

  return app
}
