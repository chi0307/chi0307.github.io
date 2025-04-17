import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import { useGtag } from '@/composables/useGtag'
import { Route } from '@/router/route'

const routes: (RouteRecordRaw & { name: Route; path: Route })[] = [
  {
    name: Route.Home,
    path: Route.Home,
    redirect: Route.AboutMe,
  },
  {
    component: () => import('@/views/AboutMePage.vue'),
    name: Route.AboutMe,
    path: Route.AboutMe,
  },
  {
    component: () => import('@/views/ProjectsPage.vue'),
    name: Route.Projects,
    path: Route.Projects,
  },
  {
    component: () => import('@/views/ResumePage.vue'),
    name: Route.Resume,
    path: Route.Resume,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes,
    {
      path: '/:pathMatch(.*)*',
      redirect: Route.Home,
    },
  ],
})

const gtag = useGtag()
router.afterEach((to) => {
  if (window.isFirstPageViewSent) {
    window.isFirstPageViewSent = false
    return
  }

  gtag.sendPageView(to.fullPath)
})

export default router
