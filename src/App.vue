<template>
  <div class="bg-deep-primary relative w-100dvw h-100dvh text-16px overflow-hidden">
    <header
      class="bg-white w-full flex items-center justify-between top-0 left-0 z-100 sticky"
      :class="{
        'px-64px': isDesktop,
        'px-16px': isMobile,
        'shadow-header': headerShadow
      }"
      :style="{
        height: `${headerHeight}px`
      }"
    >
      <p class="font-bold text-1.5rem">Website</p>
      <div v-if="isDesktop" class="flex-center gap-16px">
        <p
          v-for="(item, index) of pageList"
          :key="index"
          class="cursor-pointer"
          :class="{
            'text-emphasis': checkIsParentPage(item.route)
          }"
          @click="pushRoute(item.route)"
        >
          {{ item.title }}
        </p>
      </div>
      <p v-else class="flex-center w-32px h-32px" @click="showMenu = true">
        <i class="text-1.5rem fa-solid fa-bars" />
      </p>
    </header>
    <div v-if="showMenu" class="left-0 top-0 w-100dvw h-100dvh bg-white z-100 fixed px-16px">
      <div class="w-full flex items-center h-64px justify-end">
        <p class="w-32px h-32px flex-center" @click="showMenu = false">
          <i class="fa-solid text-1.5rem fa-xmark" />
        </p>
      </div>
      <div
        v-for="(item, index) of pageList"
        :key="index"
        class="h-64px w-full flex-center"
        @click="pushRoute(item.route)"
      >
        <p
          class="text-1.3rem"
          :class="{
            'text-emphasis': checkIsCurrentPage(item.route)
          }"
        >
          {{ item.title }}
        </p>
      </div>
    </div>
    <main
      ref="main"
      class="w-full overflow-x-hidden overflow-y-scroll"
      :style="{
        height: `calc(100% - ${headerHeight}px)`
      }"
    >
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { RouterView } from 'vue-router'

import { Route } from '@/router/route'

import { useLayoutStore } from './stores/layoutStore'

const layoutStore = useLayoutStore()
const { checkIsCurrentPage, pushRoute, checkIsParentPage } = layoutStore
const { isDesktop, isMobile, showMenu, headerShadow } = storeToRefs(layoutStore)

const headerHeight = computed(() => (isDesktop.value ? 80 : 64))

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
</script>
