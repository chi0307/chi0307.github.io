import type { AllowedComponentProps, Component } from 'vue'

export type URL = `https://${string}`
export type UUID = `${string}-${string}-${string}-${string}-${string}`
export type DateISOString = `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PropTypeOf<C extends Component> = C extends new (...args: any) => any
  ? Omit<InstanceType<C>['$props'], keyof AllowedComponentProps>
  : never

export type ValueOf<T extends object, Key extends keyof T = keyof T> = T[Key]
