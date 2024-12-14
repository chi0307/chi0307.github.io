import { createPinia } from 'pinia'

import { createBaseApp } from '@/base/index'
import { vuetify } from '@/base/vuetify'

import App from './App.vue'

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const app = createBaseApp(App)

app.use(vuetify)
app.use(createPinia())

app.mount('#app')
