<template>
  <menu>
    <div class="w-full flex items-center h-64px justify-end border-b-1px px-16px">
      <p class="w-32px h-32px flex-center cursor-pointer" @click="showMenu = false">
        <i class="fa-solid text-1.5rem fa-xmark" />
      </p>
    </div>
    <div
      v-for="(item, index) of pageList"
      :key="index"
      class="h-64px w-full flex-center cursor-pointer border-b-1px px-16px"
      @click="pushRoute(item.route)"
    >
      <p
        class="text-1.3rem"
        :class="{
          'text-emphasis': checkIsParentPage(item.route),
        }"
      >
        {{ item.title }}
      </p>
    </div>
  </menu>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import { useLayoutStore } from '@/stores/layoutStore'
import { pageList } from '@/utils/pageList'

const layoutStore = useLayoutStore()
const { checkIsParentPage, pushRoute } = layoutStore
const { showMenu } = storeToRefs(layoutStore)
</script>
