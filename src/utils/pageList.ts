import { Route } from '@/router/route'

export interface PageItem {
  title: string
  route: Route
}
export const pageList: PageItem[] = [
  {
    title: 'About Me',
    route: Route.aboutMe
  },
  {
    title: 'Resume',
    route: Route.resume
  },
  {
    title: 'Projects',
    route: Route.projects
  }
]
