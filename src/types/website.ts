import { type URL } from '@/types'

export interface ResumeItem {
  startMonth: `${number}/${number}`
  endMonth: `${number}/${number}` | null
  title: string
  subTitle: string
  descriptions: { title: string; text: string }[]
  techStacks: string[]
}

export interface SkillGroup {
  title: string
  skills: string[]
}

export interface ProjectItem {
  description: string
  image: `${string}.webp`
  demo?: string
  repo?: URL
  /** 如果 deprecated 的話，demo 網址就不會顯示了 */
  deprecated?: true
  links?: {
    title: string
    url: URL
  }[]
}
