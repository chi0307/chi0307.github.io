<template>
  <div
    ref="body"
    class="bg-deep-primary relative w-100vw overflow-x-hidden h-100vh text-16px"
    @scroll="handleBodyScroll"
  >
    <header
      class="bg-white w-full flex items-center justify-between top-0 left-0 z-100 sticky"
      :class="{
        'px-64px': isDesktop,
        'px-16px': isMobile,
        'shadow-header': showHeaderShadow
      }"
      :style="{
        height: `${headerHeight}px`
      }"
    >
      <p class="font-bold text-1.5rem">Website</p>
      <div v-if="isDesktop" class="gap-16px flex-center">
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
      <p v-else class="w-32px h-32px flex-center" @click="openMenu = true">
        <i class="fa-solid fa-bars text-1.5rem" />
      </p>
    </header>
    <div v-if="openMenu" class="fixed left-0 top-0 w-100vw h-100vh bg-white z-100 px-16px">
      <div class="w-full h-64px flex items-center justify-end">
        <p class="w-32px h-32px flex-center" @click="openMenu = false">
          <i class="fa-solid fa-xmark text-1.5rem" />
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
    <RouterView
      class="w-full"
      :style="{
        'min-height': `calc(100% - ${headerHeight}px)`
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, ref, useTemplateRef } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'

import { Route } from '@/router/route'

import { useLayoutStore } from './stores/layoutStore'

const route = useRoute()
const router = useRouter()
const { isDesktop, isMobile } = storeToRefs(useLayoutStore())

const headerHeight = computed(() => (isDesktop.value ? 80 : 64))
const openMenu = ref(false)
const showHeaderShadow = ref(false)
const bodyElement = useTemplateRef<HTMLElement>('body')

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

function checkIsCurrentPage(routePath: Route): boolean {
  return route.path === routePath.toString()
}

function checkIsParentPage(routePath: Route): boolean {
  return route.path.includes(routePath)
}

async function pushRoute(routePath: Route): Promise<void> {
  if (checkIsCurrentPage(routePath)) {
    bodyElement.value?.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    await router.push(routePath)
    bodyElement.value?.scrollTo({ top: 0 })
  }
  openMenu.value = false
}

function handleBodyScroll(event: Event): void {
  if (event.target instanceof HTMLDivElement) {
    showHeaderShadow.value = event.target.scrollTop <= 0
  }
}
</script>
