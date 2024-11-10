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
