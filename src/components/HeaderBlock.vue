<template>
  <header
    class="w-full relative z-100 bg-white flex items-center justify-between"
    :class="{
      'px-64px': isDesktop,
      'px-16px': isMobile,
      'shadow-header': headerShadow,
    }"
    :style="{
      height: `${headerHeight}px`,
    }"
  >
    <p class="font-bold text-1.5rem">Website</p>
    <div v-if="isDesktop" class="gap-16px flex-center">
      <p
        v-for="(item, index) of pageList"
        :key="index"
        class="cursor-pointer"
        :class="{
          'text-emphasis': checkIsParentPage(item.route),
        }"
        @click="pushRoute(item.route)"
      >
        {{ item.title }}
      </p>
    </div>
    <p v-else class="flex-center cursor-pointer w-32px h-32px" @click="showMenu = true">
      <i class="text-1.5rem fa-solid fa-bars" />
    </p>
  </header>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import { useLayoutStore } from '@/stores/layoutStore'
import { pageList } from '@/utils/pageList'

const layoutStore = useLayoutStore()
const { pushRoute, checkIsParentPage } = layoutStore
const { isDesktop, isMobile, showMenu, headerShadow } = storeToRefs(layoutStore)

const headerHeight = computed(() => (isDesktop.value ? 80 : 64))
</script>
