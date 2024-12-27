import type { ProjectItem } from '@/types/website'

export const projects: ProjectItem[] = [
  {
    description:
      '(未完成) 一個信用卡哩程回饋比對工具，可快速查詢各卡的哩程轉換率，並根據消費金額、店家、付款方式，選擇最佳回饋方案',
    image: '/website/best-mileage-cards-preview.webp',
    demo: '/projects/bestMileageCards',
    repo: 'https://github.com/chi0307/chi0307.github.io/tree/master/src/views/projects/BestMileageCards',
  },
  {
    description:
      '一個外幣紀錄與計算工具，可記錄每次購買的匯率與金額，並根據剩餘的外幣量，計算剩餘外幣的平均購買匯率',
    image: '/website/average-exchange-rate-preview.webp',
    demo: '/projects/averageExchangeRate',
    repo: 'https://github.com/chi0307/chi0307.github.io/tree/master/src/views/projects/AverageExchangeRate',
  },
  {
    description: '整合 FB, Line, Slack 訊息開發共用的介面跟轉換套件，並且提供簡單易用的介面',
    image: '/website/chatbot-json-toolbox-preview.webp',
    demo: 'https://chi0307.github.io/website-legacy-by-2024-10/side/chatbot-json-toolbox/',
    repo: 'https://github.com/chi0307/website-legacy-by-2024-10/blob/master/pages/side/chatbot-json-toolbox.vue',
    links: [
      {
        title: '套件',
        url: 'https://www.npmjs.com/package/@chi0307/transform-chatbot-message',
      },
    ],
  },
  {
    description:
      '一個使用 PWA、Vue 3.0 和 TypeScript 開發的簡單 chatbot，前端畫面呈現基本對話功能，目前以假資料模擬對話內容，尚未串接後台',
    image: '/website/chatbot-preview.webp',
    demo: 'https://chi0307.github.io/chatbot/',
    repo: 'https://github.com/chi0307/chatbot',
    deprecated: true,
  },
  {
    description:
      '一個娛樂用 Line Bot，整合 Google TTS, STT, Google Map，提供語音互動與地圖服務。專案部署於 Heroku，實現輕量化、即時的娛樂體驗',
    image: '/website/linebot-preview.webp',
    demo: 'https://line.me/R/ti/p/%40tyo2763z',
    repo: 'https://github.com/chi0307/unni-line-bot',
    deprecated: true,
  },
]
