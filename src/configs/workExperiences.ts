import type { ResumeItem } from '@/types/website'

export const workExperiences: ResumeItem[] = [
  {
    startMonth: '2019/04',
    endMonth: '2020/05',
    title: '後端工程師',
    subTitle: '凱茂股份有限公司',
    techStacks: [
      'vue2',
      'Adonis.js',
      'Nuxt.js',
      'Vuex',
      'Ansible',
      'Nginx',
      'PostgreSQL',
      'Apollo GraphQL',
      'Docker',
    ],
    descriptions: [
      { title: '開發公司核心產品', text: '公司人資系統的全端開發，系統設計與功能實現' },
      {
        title: '前端開發',
        text: '使用 Vue.js 和 Vuex 建構前台、後台介面，供企業與一般使用者使用',
      },
      {
        title: '後端開發',
        text: '採用 Adonis.js 搭配 PostgreSQL 設計並開發高效穩定的資料存取與處理模組',
      },
      { title: '前後端串接', text: '運用 GraphQL 實現資料流暢通訊，確保資料傳輸效率與一致性' },
    ],
  },
  {
    startMonth: '2020/05',
    endMonth: '2021/08',
    title: '軟體設計師',
    subTitle: '北祥科技服務股份有限公司',
    techStacks: [
      'Pug',
      'Ejs',
      'gulp.js',
      'Webpack',
      'Socket.io',
      'Express.js',
      'MQTT',
      'WebSocket',
      'Redis',
      'MySQL',
      'MongoDB',
      'CouchDB',
    ],
    descriptions: [
      {
        title: '客製化系統整合',
        text: '根據客戶需求，設計並完成系統串接方案，確保功能符合要求並穩定運行',
      },
      {
        title: 'ChatBot 開發',
        text: '使用 Express.js 開發智能對話機器人，提升企業消費者自助服務能力與效率',
      },
      {
        title: 'Socket 系統重構',
        text: '優化企業的 Socket 通訊架構，改善系統效能與穩定性',
      },
      {
        title: '技術導入與最佳實踐',
        text: '協助部門導入 gulp.js, Webpack 編譯工具與日誌記錄系統，提升開發效率及問題追蹤能力',
      },
      {
        title: '專案範本設計',
        text: '開發標準化專案範本，提升部門開發一致性，並降低新人學習曲線',
      },
    ],
  },
  {
    startMonth: '2021/09',
    endMonth: null,
    title: '資深工程師',
    subTitle: '愛進化科技股份有限公司',
    techStacks: [
      'vue3',
      'TypeScript',
      'Pinia',
      'UnoCSS',
      'Eslint',
      'villus',
      'Vite',
      'Prisma',
      'NestJS',
    ],
    descriptions: [
      {
        title: '重構與維運舊系統',
        text: '負責舊版個人化網頁的重構與維運，提升系統的穩定性與可維護性',
      },
      {
        title: '新專案流程規劃與開發',
        text: '協助公司新專案開發，打通從網頁端到出貨端的完整流程，確保系統順暢運行',
      },
      {
        title: '跨部門需求整合',
        text: '主動協調設計、工程、營運等部門，釐清需求並提供技術解決方案，確保各部門目標一致，推動專案順利進行',
      },
    ],
  },
]
