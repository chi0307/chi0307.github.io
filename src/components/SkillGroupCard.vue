<template>
  <div class="min-h-300px flex-col">
    <div v-for="({ title, skills }, index) of list" :key="index" class="p-20px flex-col gap-16px">
      <p class="text-1.4rem font-700">{{ title }}</p>
      <div class="grid grid-cols-2 gap-16px">
        <p v-for="(skill, index2) of skills" :key="index2">{{ skill }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { SkillGroup } from '@/utils/types'

defineProps<{
  list: SkillGroup[]
}>()
</script>
