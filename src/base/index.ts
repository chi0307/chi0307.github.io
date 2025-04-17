import { useGtag } from '@/composables/useGtag'
useGtag()

import '@unocss/reset/tailwind.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'virtual:uno.css'

import { createApp, type App, type Component } from 'vue'

export function createBaseApp(component: Component): App<Element> {
  return createApp(component)
}
