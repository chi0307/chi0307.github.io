import { Route } from '@/router/route'

export interface PageItem {
  title: string
  route: Route
}
export const pageList: PageItem[] = [
  {
    title: 'About Me',
    route: Route.AboutMe
  },
  {
    title: 'Resume',
    route: Route.Resume
  },
  {
    title: 'Projects',
    route: Route.Projects
  }
]
