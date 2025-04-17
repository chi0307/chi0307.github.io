const script1 = document.createElement('script')
script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-43L9SJJ7CJ'
script1.async = true
document.head.appendChild(script1)

const script2 = document.createElement('script')
script2.innerHTML = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-43L9SJJ7CJ');
`
document.head.appendChild(script2)

import '@unocss/reset/tailwind.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'virtual:uno.css'

import { createApp, type App, type Component } from 'vue'

export function createBaseApp(component: Component): App<Element> {
  return createApp(component)
}
