// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createRouter, createWebHistory } from 'vue-router'

import { Route } from '@/router/route'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: Route.home,
      path: Route.home,
      redirect: Route.aboutMe
    },
    {
      component: () => import('@/views/AboutMePage.vue'),
      name: Route.aboutMe,
      path: Route.aboutMe
    },
    {
      component: () => import('@/views/ProjectsPage.vue'),
      name: Route.projects,
      path: Route.projects
    },
    {
      component: () => import('@/views/ResumePage.vue'),
      name: Route.resume,
      path: Route.resume
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: Route.home
    }
  ]
})

export default router
