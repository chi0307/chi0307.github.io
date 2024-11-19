import type { ProjectItem } from '@/types/website'

export const projects: ProjectItem[] = [
  {
    description: '開發一個 FB、Line 訊息共用的套件，<br/>搭配使用畫面產生 JSON 結構',
    image: '/chatbot-json-toolbox-preview.webp',
    previewUrl: 'https://chi0307.github.io/website-legacy-by-2024-10/side/chatbot-json-toolbox/',
    link: {
      title: '套件',
      url: 'https://www.npmjs.com/package/@chi0307/transform-chatbot-message'
    }
  },
  {
    description:
      '簡單的一個 chatbot 呈現畫面，<br/>嘗試用 PWA、Vue 3.0、TS 開發，<br/>目前僅用假資料，無串接後台。',
    image: '/chatbot-preview.webp',
    previewUrl: 'https://chi0307.github.io/chatbot',
    link: null
  },
  {
    description:
      '一個簡單的娛樂用 line bot<br/>嘗試串接 Google TTS、Google STT、Google Map<br/>部署在 heroku',
    image: '/linebot-preview.webp',
    previewUrl: 'https://line.me/R/ti/p/%40tyo2763z',
    link: null,
    deprecated: true
  }
]
