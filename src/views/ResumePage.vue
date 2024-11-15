<template>
  <section class="relative flex-center flex-col px-24px gap-24px py-32px">
    <p class="card-title">Work Experiences</p>
    <ResumeCard
      v-for="(item, index) of convertResumeList(workExperiences)"
      :key="index"
      :start-month="item.startMonth"
      :end-month="item.endMonth"
      :title="item.title"
      :sub-title="item.subTitle"
      :description="item.description"
      class="card"
    />
    <p class="card-title">Educations</p>
    <ResumeCard
      v-for="(item, index) of convertResumeList(educations)"
      :key="index"
      :start-month="item.startMonth"
      :end-month="item.endMonth"
      :title="item.title"
      :sub-title="item.subTitle"
      :description="item.description"
      class="card"
    />
    <p class="card-title">Professional Skills</p>
    <SkillGroupCard :list="skillGroups" class="card" />
  </section>
</template>
<script lang="ts" setup>
import ResumeCard from '@/components/ResumeCard.vue'
import SkillGroupCard from '@/components/SkillGroupCard.vue'
import { educations } from '@/configs/educations'
import { skillGroups } from '@/configs/skillGroups'
import { workExperiences } from '@/configs/workExperiences'
import type { PropTypeOf } from '@/types'
import type { ResumeItem } from '@/types/website'
import { convertField, convertToDate } from '@/utils/converts'
import { sortListByDate } from '@/utils/sorts'

function convertResumeList(list: ResumeItem[]): PropTypeOf<typeof ResumeCard>[] {
  return sortListByDate(
    convertField(convertField(list, 'startMonth', convertToDate), 'endMonth', convertToDate),
    'startMonth',
    'desc'
  )
}
</script>
<style scoped>
.card-title {
  @apply text-1.5rem font-700;
}
.card {
  @apply w-full max-w-600px bg-white p-24px flex shadow-resume-card;
}
</style>
