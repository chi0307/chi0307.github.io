import { createBaseApp } from '@/base'

import App from './App.vue'

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const app = createBaseApp(App)

app.mount('#app')
