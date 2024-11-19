import { createPinia } from 'pinia'

import App from '@/App.vue'
import { createBaseApp } from '@/base'
import router from '@/router'

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const app = createBaseApp(App)

app.use(router)

const pinia = createPinia()
app.use(pinia)

app.mount('#app')
