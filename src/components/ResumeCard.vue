<template>
  <div
    class="flex flex-col gap-16px justify-between"
    :class="{
      'min-h-300px': isDesktop,
    }"
  >
    <div class="flex" :class="{ 'flex-col gap-8px': isMobile, 'mt-16px': isDesktop }">
      <div
        class="flex-col"
        :class="{
          'w-40% gap-16px': isDesktop,
          'gap-4px': isMobile,
        }"
      >
        <p class="text-1.5rem text-emphasis">{{ startMonth }} ~ {{ endMonth ?? '' }}</p>
        <p>{{ title }}</p>
        <p style="color: #666">{{ subTitle }}</p>
      </div>
      <hr v-if="isMobile" class="opacity-50 border-deep-primary border-t-2px" />
      <div
        :class="{
          'w-60% pl-16px': isDesktop,
        }"
        class="flex-col gap-16px text-0.9rem"
      >
        <div v-for="(item, index) of descriptions" :key="index">
          <p class="font-bold">{{ item.title }}</p>
          {{ item.text }}
        </div>
      </div>
    </div>
    <div
      v-if="techStacks.length > 0"
      class="w-full flex flex-wrap opacity-50 text-0.8rem gap-x-8px gap-y-4px"
      :class="{ 'mb-16px': isDesktop }"
    >
      <p class="w-full">技術組合:</p>
      <p v-for="(item, index) of techStacks" :key="index">
        {{ item }}{{ index !== techStacks.length - 1 ? ',' : '' }}
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import { useLayoutStore } from '@/stores/layoutStore'
import type { TechStack } from '@/types/website'

const { startMonth, endMonth, title, subTitle, descriptions, techStacks } = defineProps<{
  startMonth: `${number}/${number}`
  endMonth: `${number}/${number}` | null
  title: string
  subTitle: string
  descriptions: { title: string; text: string }[]
  techStacks: TechStack[]
}>()

const { isDesktop, isMobile } = storeToRefs(useLayoutStore())
</script>
