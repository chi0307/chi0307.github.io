<template>
  <div
    :class="{
      'w-600px min-h-300px': isDesktop,
      'w-full flex-col gap-8px': isMobile
    }"
  >
    <div
      class="flex-col"
      :class="{
        'w-40% py-32px gap-16px': isDesktop,
        'gap-4px': isMobile
      }"
    >
      <p class="text-emphasis text-1.5rem">{{ startMonth }} ~ {{ endMonth ?? '' }}</p>
      <p>{{ title }}</p>
      <p style="color: #666">{{ subTitle }}</p>
    </div>
    <hr v-if="isMobile" class="opacity-50 border-deep-primary border-t-2px" />
    <!-- eslint-disable vue/no-v-html -->
    <div
      :class="{
        'w-60% py-32px pl-16px': isDesktop
      }"
      class="text-0.9rem line-height-180%"
      v-html="description"
    />
    <!-- eslint-enable vue/no-v-html -->
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import { useLayoutStore } from '@/stores/layoutStore'
import type { ResumeItem } from '@/utils/types'

const { startMonth, endMonth = null, title, subTitle } = defineProps<ResumeItem>()

const { isDesktop, isMobile } = storeToRefs(useLayoutStore())
</script>
