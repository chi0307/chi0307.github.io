<template>
  <div @dblclick.stop>
    <RouterView v-if="isSideProjectsPage" />
    <div v-else class="bg-deep-primary relative w-100dvw h-100dvh text-16px overflow-hidden">
      <HeaderBlock />
      <main
        ref="main"
        class="w-full overflow-x-hidden overflow-y-auto"
        :style="{
          height: `calc(100% - ${headerHeight}px)`,
        }"
      >
        <RouterView class="min-h-full" />
      </main>
      <MenuBlock v-if="showMenu" class="w-100dvw h-100dvh bg-white left-0 top-0 z-100 fixed" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { RouterView } from 'vue-router'

import HeaderBlock from '@/components/HeaderBlock.vue'
import MenuBlock from '@/components/MenuBlock.vue'
import { useLayoutStore } from '@/stores/layoutStore'

const layoutStore = useLayoutStore()
const { isDesktop, showMenu, isSideProjectsPage } = storeToRefs(layoutStore)

const headerHeight = computed(() => (isDesktop.value ? 80 : 64))
</script>
