<template>
  <div class="bg-deep-primary relative w-100dvw h-100dvh text-16px overflow-hidden">
    <header
      class="w-full flex items-center relative z-100 bg-white justify-between"
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
      <p v-else class="flex-center w-32px h-32px cursor-pointer" @click="showMenu = true">
        <i class="text-1.5rem fa-solid fa-bars" />
      </p>
    </header>
    <main
      ref="main"
      class="w-full overflow-x-hidden overflow-y-auto"
      :style="{
        height: `calc(100% - ${headerHeight}px)`
      }"
    >
      <RouterView />
    </main>
    <MenuList v-if="showMenu" class="w-100dvw h-100dvh bg-white left-0 top-0 z-100 fixed" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { RouterView } from 'vue-router'

import MenuList from '@/components/MenuList.vue'
import { pageList } from '@/utils/pageList'

import { useLayoutStore } from './stores/layoutStore'

const layoutStore = useLayoutStore()
const { pushRoute, checkIsParentPage } = layoutStore
const { isDesktop, isMobile, showMenu, headerShadow } = storeToRefs(layoutStore)

const headerHeight = computed(() => (isDesktop.value ? 80 : 64))
</script>
