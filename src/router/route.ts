export enum Route {
  Home = '/',
  AboutMe = '/aboutMe',
  Projects = '/projects',
  Resume = '/resume',
}

export enum MiniSideProjectRoute {
  ProjectsAverageExchangeRate = '/projects/averageExchangeRate',
  ProjectsBestMileageCards = '/projects/bestMileageCards',
  ProjectsTaichungGarbageTruck = '/projects/taichungGarbageTruck',
}

export const AllRoute = {
  ...Route,
  ...MiniSideProjectRoute,
} as const

export type AllRoute = (typeof AllRoute)[keyof typeof AllRoute]
