import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import 'vuetify/styles'
import '@fortawesome/fontawesome-free/css/all.css'

import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'

import { colors } from '../../../../themes/colors'
import App from './App.vue'

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const app = createApp(App)

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

app.mount('#app')
