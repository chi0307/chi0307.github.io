import type { AllowedComponentProps, Component } from 'vue'

export type URL = `https://${string}`
export type UUID = `${string}-${string}-${string}-${string}-${string}`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PropTypeOf<C extends Component> = C extends new (...args: any) => any
  ? Omit<InstanceType<C>['$props'], keyof AllowedComponentProps>
  : never
