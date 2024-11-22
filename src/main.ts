import { createPinia } from 'pinia'

import App from '@/App.vue'
import { createBaseApp } from '@/base/index'
import router from '@/router'

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const app = createBaseApp(App)

app.use(router)
app.use(createPinia())

app.mount('#app')
