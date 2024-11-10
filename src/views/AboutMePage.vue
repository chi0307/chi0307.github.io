<template>
  <main class="relative flex-center">
    <div v-if="isDesktop" class="top-0 h-full absolute w-65% bg-white right-0" />
    <div class="h-600px flex z-1 w-720px">
      <ProfileCard class="flex-1" />
      <div class="flex-1 h-full flex-col px-36px py-60px">
        <div class="flex-grow"></div>
        <div class="w-full flex items-center justify-around h-40px">
          <div class="profile-button" @click="$router.push(Route.resume)">Resume</div>
          <div class="profile-button" @click="$router.push(Route.projects)">Projects</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import ProfileCard from '@/components/ProfileCard.vue'
import { Route } from '@/router/route'
import { useLayoutStore } from '@/stores/layoutStore'

const { isDesktop } = storeToRefs(useLayoutStore())
</script>
<style scoped>
.profile-button {
  @apply w-120px rounded-full h-40px flex-center cursor-pointer border-1px hover:bg-emphasis hover:text-white hover:border-0;
}
</style>
