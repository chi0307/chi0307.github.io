import { type URL } from '@/types'

export const TechStack = [
  'Adobe After Effects',
  'Adobe Illustrator',
  'Adobe InDesign',
  'Adobe Photoshop',
  'Adonis.js',
  'Ansible',
  'Apollo GraphQL',
  'Axios',
  'CouchDB',
  'Docker',
  'Ejs',
  'Eslint',
  'Express.js',
  'HTML',
  'JavaScript',
  'Jest',
  'MQTT',
  'MongoDB',
  'MySQL',
  'NestJS',
  'Nginx',
  'Node.js',
  'Nuxt.js',
  'PWA',
  'Pinia',
  'PostgreSQL',
  'Prisma',
  'Pug',
  'RESTful',
  'React Native',
  'Redis',
  'Service Worker',
  'Socket.io',
  'TypeScript',
  'Typia',
  'UnoCSS',
  'Vite',
  'Vue2',
  'Vue3',
  'Vuetify',
  'Vuex',
  'WebSocket',
  'Webpack',
  'gulp.js',
  'villus',
] as const
export type TechStack = (typeof TechStack)[number]

export interface ResumeItem {
  startMonth: `${number}/${number}`
  endMonth: `${number}/${number}` | null
  title: string
  subTitle: string
  descriptions: { title: string; text: string }[]
  techStacks: TechStack[]
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
  techStacks?: TechStack[]
}
