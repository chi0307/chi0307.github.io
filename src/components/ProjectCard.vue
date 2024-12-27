<template>
  <div class="flex-col items-center gap-8px">
    <div class="w-full">{{ description }}</div>
    <img :src="image" class="max-h-250px" alt="preview-image" />
    <div class="flex items-center justify-center gap-16px">
      <template v-for="(button, index) of buttons" :key="index">
        <p v-if="button.url === undefined">{{ button.title }}</p>
        <a
          v-else
          target="_blank"
          :href="convertUrl(button.url)"
          class="text-emphasis decoration-underline"
        >
          {{ button.title }}
        </a>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

import type { URL } from '@/types'

const { description, demo, links, repo, image, deprecated } = defineProps<{
  description: string
  image: string
  demo: string | null
  links: {
    title: string
    url: URL
  }[]
  deprecated: boolean
  repo: URL | null
}>()

function convertUrl(urlString: string): string {
  return new URL(urlString, window.location.href).toString()
}

interface ButtonItem {
  title: string
  url?: string
}
const buttons = computed((): ButtonItem[] => {
  const list: ButtonItem[] = []
  if (deprecated) {
    list.push({ title: 'Deprecated' })
  } else if (demo) {
    list.push({
      title: 'Demo',
      url: demo,
    })
  }
  if (repo) {
    list.push({
      title: 'Repo',
      url: repo,
    })
  }
  list.push(...links)

  return list
})
</script>
