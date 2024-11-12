<template>
  <div class="flex-col bg-primary shadow-profile-card">
    <div class="flex-center w-full my-30%">
      <img
        src="/profile.jpeg"
        alt="profile-card"
        class="w-200px h-200px rounded-full object-cover"
      />
    </div>
    <div class="flex-col items-center justify-between flex-grow">
      <p class="text-2rem font-bold">Benson Wang</p>
      <p class="font-bold text-1rem">Full-Stack Engineer</p>
      <p></p>
    </div>
    <div class="items-center bg-white w-full flex h-60px justify-around px-32px text-1.5rem">
      <div
        v-for="(item, index) of socialMediaList"
        :key="index"
        class="flex-center cursor-pointer w-48px h-48px hover:text-emphasis"
        @click="() => redirectNewWindow(item.redirectUrl)"
      >
        <i :class="item.iconClass" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { redirectNewWindow } from '@/utils/utils'
interface SocialMediaItem {
  iconClass: string
  redirectUrl: `https://${string}`
}
const socialMediaList: SocialMediaItem[] = [
  { iconClass: 'fa-brands fa-instagram', redirectUrl: 'https://www.instagram.com/benson0307' },
  { iconClass: 'fa-brands fa-github', redirectUrl: 'https://github.com/chi0307' },
  { iconClass: 'fa-brands fa-bitbucket', redirectUrl: 'https://bitbucket.org/junchi_0307' }
]
</script>
