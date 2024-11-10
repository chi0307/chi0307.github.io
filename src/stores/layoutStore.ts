import { defineStore } from 'pinia'
import { computed, onMounted, ref } from 'vue'

export const useLayoutStore = defineStore('layout', () => {
  const mediaType = ref<'desktop' | 'mobile'>('mobile')
  const isMobile = computed(() => mediaType.value === 'mobile')
  const isDesktop = computed(() => mediaType.value === 'desktop')

  onMounted(() => {
    handleWindowSizeChange()
    window.addEventListener('resize', handleWindowSizeChange)
  })

  function handleWindowSizeChange(): void {
    mediaType.value = window.innerWidth < 768 ? 'mobile' : 'desktop'
  }

  return {
    isMobile,
    isDesktop
  }
})
