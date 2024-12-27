import type { ProjectItem } from '@/types/website'

export const projects: ProjectItem[] = [
  {
    description:
      '幫助快速查詢與比較各種信用卡的哩程轉換回饋率，並根據不同的消費情境推薦最佳的回饋方案',
    image: '/website/best-mileage-cards-preview.webp',
    previewUrl: '/projects/bestMileageCards',
  },
  {
    description:
      '幫助紀錄每次外幣購買的匯率與金額，並考慮實際使用掉的外幣量後，計算剩餘外幣的平均購買匯率',
    image: '/website/average-exchange-rate-preview.webp',
    previewUrl: '/projects/averageExchangeRate',
  },
  {
    description: '開發一個 FB、Line 訊息共用的套件，<br/>搭配使用畫面產生 JSON 結構',
    image: '/website/chatbot-json-toolbox-preview.webp',
    previewUrl: 'https://chi0307.github.io/website-legacy-by-2024-10/side/chatbot-json-toolbox/',
    link: {
      title: '套件',
      url: 'https://www.npmjs.com/package/@chi0307/transform-chatbot-message',
    },
  },
  {
    description:
      '簡單的一個 chatbot 呈現畫面，<br/>嘗試用 PWA、Vue 3.0、TS 開發，<br/>目前僅用假資料，無串接後台。',
    image: '/website/chatbot-preview.webp',
    previewUrl: 'https://chi0307.github.io/chatbot/',
    deprecated: true,
  },
  {
    description:
      '一個簡單的娛樂用 line bot<br/>嘗試串接 Google TTS、Google STT、Google Map<br/>部署在 heroku',
    image: '/website/linebot-preview.webp',
    previewUrl: 'https://line.me/R/ti/p/%40tyo2763z',
    deprecated: true,
  },
]
