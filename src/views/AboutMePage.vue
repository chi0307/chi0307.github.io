<template>
  <main class="relative flex-center bg-white">
    <div
      class="absolute left-0 bg-deep-primary top-0"
      :class="{
        'h-full w-35%': isDesktop,
        'h-300px w-full': isMobile
      }"
    />
    <div
      class="flex z-1 m-36px"
      :class="{
        'flex-col': isMobile
      }"
    >
      <ProfileCard class="item-card" />
      <div class="item-card h-full flex-col px-36px py-60px">
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

const { isDesktop, isMobile } = storeToRefs(useLayoutStore())
</script>
<style scoped>
.item-card {
  @apply h-600px w-330px flex-shrink-0;
}

.profile-button {
  @apply w-120px rounded-full h-40px flex-center cursor-pointer border-1px hover:bg-emphasis hover:text-white hover:border-0;
}
</style>
