<template>
  <div class="flex-col items-center gap-8px">
    <div class="w-full">
      <!-- eslint-disable vue/no-v-html -->
      <div v-html="description" />
      <!-- eslint-enable vue/no-v-html -->
      <a v-if="link !== null" :href="link.url" class="text-emphasis decoration-underline">
        {{ link.title }}
      </a>
    </div>
    <img :src="image" alt="preview-image" />
  </div>
</template>
<script lang="ts" setup>
import type { ProjectItem } from '@/utils/types'

const { description, image, previewUrl: _previewUrl, link } = defineProps<ProjectItem>()
</script>
