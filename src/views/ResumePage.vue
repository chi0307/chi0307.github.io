<template>
  <main class="relative bg-deep-primary flex-center flex-col py-64px">
    <div class="flex flex-col flex-center gap-24px">
      <p class="text-36px">Experience</p>
      <ResumeCard
        v-for="(resume, index) of sortResumes(experienceList)"
        :key="index"
        :start-month="resume.startMonth"
        :end-month="resume.endMonth"
        :title="resume.title"
        :sub-title="resume.subTitle"
        :description="resume.description"
      />
      <p class="text-36px">Education</p>
      <ResumeCard
        v-for="(resume, index) of sortResumes(educationList)"
        :key="index"
        :start-month="resume.startMonth"
        :end-month="resume.endMonth"
        :title="resume.title"
        :sub-title="resume.subTitle"
        :description="resume.description"
      />
    </div>
  </main>
</template>
<script lang="ts" setup>
import ResumeCard from '@/components/ResumeCard.vue'
import type { ResumeItem } from '@/utils/types'

const experienceList: ResumeItem[] = [
  {
    startMonth: '2019/04',
    endMonth: '2020/05',
    title: '後端工程師',
    subTitle: '凱茂股份有限公司',
    description:
      '開發公司產品 - 人資系統<br/><br/>前後端系統開發，<br/>前端利用 Vue.js 搭配 Vuex 進行開發，<br/>後端用 Adonis.js 搭配 PostgreSQL 開發，<br/>同時使用 GraphGL 做前後端串接。'
  },
  {
    startMonth: '2020/05',
    endMonth: '2021/08',
    title: '軟體設計師',
    subTitle: '北祥科技服務股份有限公司',
    description:
      '依照客戶需求進行系統串接，<br/>同時用 Express.js 開發 ChatBot，<br/>任職期間協助部門進行 Socket 系統重構，<br/>並且協助導入編譯、 log 記錄，<br/>與設計專案範本供部門使用。'
  },
  {
    startMonth: '2021/09',
    endMonth: null,
    title: '全端工程師',
    subTitle: '愛進化科技股份有限公司',
    description: '開發個人化手機殼網頁'
  }
]

const educationList: ResumeItem[] = [
  {
    startMonth: '2014/09',
    endMonth: '2018/07',
    title: '資訊管理系',
    subTitle: '國立高雄科技大學',
    description:
      '比賽經歷：<br/><br/>2017/12/08<br/>資管系專題發表競賽 優勝<br/><br/>2017/10/24<br/>2017 搶鮮大賽 優選<br/><br/>2017/02/17 ~ 19<br/>SIGFOX 物聯網駭客松 首獎'
  }
]

function sortResumes(list: ResumeItem[]): ResumeItem[] {
  return list.sort((aItem, bItem) => (aItem.startMonth > bItem.startMonth ? -1 : 1))
}
</script>
