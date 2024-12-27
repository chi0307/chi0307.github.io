<template>
  <div class="flex-col items-center gap-8px">
    <div class="w-full">
      <!-- eslint-disable vue/no-v-html -->
      <div v-html="description" />
      <!-- eslint-enable vue/no-v-html -->
      <a
        v-if="link !== null"
        target="_blank"
        :href="link.url"
        class="text-emphasis decoration-underline"
      >
        {{ link.title }}
      </a>
    </div>
    <img :src="image" class="max-h-250px" alt="preview-image" />
    <p v-if="deprecated">Deprecated</p>
    <a
      v-else-if="previewUrl !== null"
      target="_blank"
      :href="convertUrl(previewUrl)"
      class="text-emphasis decoration-underline"
    >
      Preview
    </a>
  </div>
</template>
<script lang="ts" setup>
import type { URL } from '@/types'

const { description, previewUrl, link, image, deprecated } = defineProps<{
  description: string
  image: string
  previewUrl: string | null
  link: {
    title: string
    url: URL
  } | null
  deprecated: boolean
}>()

function convertUrl(urlString: string): string {
  return new URL(urlString, window.location.href).toString()
}
</script>
