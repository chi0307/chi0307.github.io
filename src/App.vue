<template>
  <div class="bg-white relative w-100vw h-100vh">
    <header
      class="bg-white w-full flex items-center justify-between top-0 left-0 z-100 sticky px-64px"
      :style="{
        height: headerHeight
      }"
    >
      <p class="text-2rem font-bold">Website</p>
      <div class="gap-16px flex-center">
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
import { RouterView, useRoute } from 'vue-router'

import { Route } from '@/router/route'

const route = useRoute()

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
<style>
.flex-col {
  @apply flex;
}
</style>
