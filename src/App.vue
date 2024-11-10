<template>
  <div class="bg-deep-primary relative w-100vw overflow-x-hidden h-100vh">
    <header
      class="bg-white w-full flex items-center justify-between top-0 left-0 z-100 sticky"
      :class="{
        'px-64px': isDesktop,
        'px-16px': isMobile
      }"
      :style="{
        height: headerHeight
      }"
    >
      <p class="font-bold text-1.5rem">Website</p>
      <div v-if="isDesktop" class="gap-16px flex-center">
        <p
          v-for="(item, index) of pageList"
          :key="index"
          class="cursor-pointer"
          :class="{
            'text-emphasis': checkIsCurrentPage(item.route)
          }"
          @click="$router.push(item.route)"
        >
          {{ item.title }}
        </p>
      </div>
    </header>
    <RouterView
      class="w-full"
      :style="{
        'min-height': `calc(100% - ${headerHeight})`
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { RouterView, useRoute } from 'vue-router'

import { Route } from '@/router/route'

import { useLayoutStore } from './stores/layoutStore'

const route = useRoute()
const { isDesktop, isMobile } = storeToRefs(useLayoutStore())

const headerHeight = '80px'

interface PageItem {
  title: string
  route: Route
}
const pageList: PageItem[] = [
  {
    title: 'About Me',
    route: Route.aboutMe
  },
  {
    title: 'Resume',
    route: Route.resume
  },
  {
    title: 'Projects',
    route: Route.projects
  }
]

function checkIsCurrentPage(r: Route): boolean {
  return route.path.includes(r)
}
</script>
