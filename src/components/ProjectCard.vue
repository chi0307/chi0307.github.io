<template>
  <div class="flex-col items-center gap-8px">
    <div class="w-full">{{ description }}</div>
    <img :src="image" class="max-h-250px" alt="preview-image" />
    <div class="flex items-center gap-16px justify-center">
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
import { computed } from 'vue'

import { useLayoutStore } from '@/stores/layoutStore'
import type { URL } from '@/types'
import type { TechStack } from '@/types/website'

const { isDesktop } = storeToRefs(useLayoutStore())

const { description, demo, links, repo, image, deprecated, techStacks } = defineProps<{
  description: string
  image: string
  demo: string | null
  links: {
    title: string
    url: URL
  }[]
  deprecated: boolean
  repo: URL | null
  techStacks: TechStack[]
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
