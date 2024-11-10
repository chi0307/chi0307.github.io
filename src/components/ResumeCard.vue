<template>
  <div class="min-h-300px">
    <div class="w-40% flex-col py-32px gap-16px">
      <p class="text-emphasis text-1.5rem">{{ startMonth }} ~ {{ endMonth ?? '' }}</p>
      <p>{{ title }}</p>
      <p style="color: #666">{{ subTitle }}</p>
    </div>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="w-60% py-32px pl-16px text-0.9rem" v-html="description"></div>
  </div>
</template>
<script lang="ts" setup>
import type { ResumeItem } from '@/utils/types'

const { startMonth, endMonth = null, title, subTitle } = defineProps<ResumeItem>()
</script>
