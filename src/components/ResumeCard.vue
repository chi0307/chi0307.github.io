<template>
  <div class="min-h-300px bg-white p-24px flex w-600px shadow-resume-card">
    <div class="w-40% flex-col py-32px gap-16px">
      <p class="text-emphasis text-24px">{{ startMonth }} ~ {{ endMonth ?? '' }}</p>
      <p class="text-16px">{{ title }}</p>
      <p class="text-16px" style="color: #666">{{ subTitle }}</p>
    </div>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="w-60% py-32px pl-16px" v-html="description"></div>
  </div>
</template>
<script lang="ts" setup>
import type { ResumeItem } from '@/utils/types'

const { startMonth, endMonth = null, title, subTitle } = defineProps<ResumeItem>()
</script>
