import type { AllowedComponentProps, Component } from 'vue'

export type URL = `https://${string}`
export type UUID = `${string}-${string}-${string}-${string}-${string}`

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
  image: string
  previewUrl: URL | null
  link: {
    title: string
    url: URL
  } | null
  deprecated?: true
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PropTypeOf<C extends Component> = C extends new (...args: any) => any
  ? Omit<InstanceType<C>['$props'], keyof AllowedComponentProps>
  : never
