import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from '@/App.vue'
import router from '@/router'

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

app.mount('#app')
