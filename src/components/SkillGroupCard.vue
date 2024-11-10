<template>
  <div class="min-h-300px flex-col gap-24px">
    <template v-for="({ title, skills }, index) of list" :key="index">
      <p class="font-500 text-1.4rem">{{ title }}</p>
      <div class="grid grid-cols-2 gap-16px">
        <p v-for="(skill, index2) of skills" :key="index2">{{ skill }}</p>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
import type { SkillGroup } from '@/utils/types'

defineProps<{
  list: SkillGroup[]
}>()
</script>
