import { type URL } from '@/types'

export interface ResumeItem {
  startMonth: `${number}/${number}`
  endMonth: `${number}/${number}` | null
  title: string
  subTitle: string
  description: string
}

export interface SkillGroup {
  title: string
  skills: string[]
}

export interface ProjectItem {
  description: string
  image: `${string}.webp`
  previewUrl: URL | null
  link: {
    title: string
    url: URL
  } | null
  deprecated?: true
}
