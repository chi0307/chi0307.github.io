<template>
  <section class="relative flex-center flex-col px-24px gap-24px py-32px">
    <p class="card-title">Work Experiences</p>
    <ResumeCard
      v-for="(resume, index) of sortListByDate(workExperiences, 'startMonth', 'desc')"
      :key="index"
      :data="resume"
      class="card"
    />
    <p class="card-title">Educations</p>
    <ResumeCard
      v-for="(resume, index) of sortListByDate(educations, 'startMonth', 'desc')"
      :key="index"
      :data="resume"
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
import { sortListByDate } from '@/utils/utils'
</script>
<style scoped>
.card-title {
  @apply text-1.5rem font-700;
}
.card {
  @apply w-full max-w-600px bg-white p-24px flex shadow-resume-card;
}
</style>
