// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createRouter, createWebHistory } from 'vue-router'

import { Route } from '@/router/route'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: Route.Home,
      path: Route.Home,
      redirect: Route.AboutMe
    },
    {
      component: () => import('@/views/AboutMePage.vue'),
      name: Route.AboutMe,
      path: Route.AboutMe
    },
    {
      component: () => import('@/views/ProjectsPage.vue'),
      name: Route.Projects,
      path: Route.Projects
    },
    {
      component: () => import('@/views/ResumePage.vue'),
      name: Route.Resume,
      path: Route.Resume
    },
    {
      component: () => import('@/views/projects/AverageExchangeRate.vue'),
      name: Route.ProjectsAverageExchangeRate,
      path: Route.ProjectsAverageExchangeRate
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: Route.Home
    }
  ]
})

export default router
