import { defineStore } from 'pinia'
import { computed, onMounted, readonly, ref, useTemplateRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type { Route } from '@/router/route'

export const useLayoutStore = defineStore('layout', () => {
  const route = useRoute()
  const router = useRouter()

  const mediaType = ref<'desktop' | 'mobile'>('mobile')
  const isMobile = computed(() => mediaType.value === 'mobile')
  const isDesktop = computed(() => mediaType.value === 'desktop')
  const mainElement = useTemplateRef<HTMLElement>('main')
  const headerShadow = ref(false)
  const showMenu = ref(false)

  onMounted(() => {
    handleWindowSizeChange()
    window.addEventListener('resize', handleWindowSizeChange)
    mainElement.value?.addEventListener('scroll', (event: Event) => {
      if (event.target instanceof HTMLElement) {
        headerShadow.value = event.target.scrollTop > 0
      }
    })
  })

  function handleWindowSizeChange(): void {
    mediaType.value = window.innerWidth < 768 ? 'mobile' : 'desktop'
  }

  function checkIsCurrentPage(routePath: Route): boolean {
    return route.path === routePath.toString()
  }

  function checkIsParentPage(routePath: Route): boolean {
    return route.path.includes(routePath)
  }

  async function pushRoute(routePath: Route): Promise<void> {
    if (checkIsCurrentPage(routePath)) {
      mainElement.value?.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      await router.push(routePath)
      mainElement.value?.scrollTo({ top: 0 })
    }
    showMenu.value = false
  }

  const isSideProjectsPage = computed(() => route.path.startsWith('/projects/'))

  return {
    headerShadow: readonly(headerShadow),
    showMenu,
    isMobile,
    isDesktop,
    checkIsCurrentPage,
    checkIsParentPage,
    pushRoute,
    isSideProjectsPage
  }
})
