import type { ResumeItem } from '@/types/website'

export const workExperiences: ResumeItem[] = [
  {
    startMonth: '2019/04',
    endMonth: '2020/05',
    title: '後端工程師',
    subTitle: '凱茂股份有限公司',
    description:
      '開發公司產品 - 人資系統<br/><br/>前後端系統開發，<br/>前端利用 Vue.js 搭配 Vuex 進行開發，<br/>後端用 Adonis.js 搭配 PostgreSQL 開發，<br/>同時使用 GraphGL 做前後端串接。',
  },
  {
    startMonth: '2020/05',
    endMonth: '2021/08',
    title: '軟體設計師',
    subTitle: '北祥科技服務股份有限公司',
    description:
      '依照客戶需求進行系統串接，<br/>同時用 Express.js 開發 ChatBot，<br/>任職期間協助部門進行 Socket 系統重構，<br/>並且協助導入編譯、 log 記錄，<br/>與設計專案範本供部門使用。',
  },
  {
    startMonth: '2021/09',
    endMonth: null,
    title: '全端工程師',
    subTitle: '愛進化科技股份有限公司',
    description: '開發個人化手機殼網頁',
  },
]
