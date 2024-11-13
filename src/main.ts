import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import 'vuetify/styles'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'

import App from '@/App.vue'
import router from '@/router'

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const app = createApp(App)

app.use(router)

const pinia = createPinia()
app.use(pinia)

const vuetify = createVuetify({ components })
app.use(vuetify)

app.mount('#app')
