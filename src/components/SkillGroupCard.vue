<template>
  <div class="min-h-300px flex-col">
    <div
      v-for="({ title, skills }, index) of list"
      :key="index"
      class="flex-col"
      :class="{
        'gap-16px p-20px': isDesktop,
        'gap-8px py-10px': isMobile
      }"
    >
      <p class="text-1.4rem font-700">{{ title }}</p>
      <div
        class="grid"
        :class="{
          'grid-cols-2 gap-16px': isDesktop,
          'gap-12px': isMobile
        }"
      >
        <div v-for="(skill, index2) of skills" :key="index2" class="flex items-center">
          <i class="text-emphasis text-1rem fas fa-chevron-right mr-16px" />
          <p class="text-1.2rem inline">
            {{ skill }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import { useLayoutStore } from '@/stores/layoutStore'
import type { SkillGroup } from '@/utils/types'

defineProps<{
  list: SkillGroup[]
}>()

const { isDesktop, isMobile } = storeToRefs(useLayoutStore())
</script>
