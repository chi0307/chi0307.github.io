import type { AllowedComponentProps, Component } from 'vue'

export type URL = `https://${string}`
export type UUID = `${string}-${string}-${string}-${string}-${string}`
export type Time =
  `${'00' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23'}:${'00' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' | '31' | '32' | '33' | '34' | '35' | '36' | '37' | '38' | '39' | '40' | '41' | '42' | '43' | '44' | '45' | '46' | '47' | '48' | '49' | '50' | '51' | '52' | '53' | '54' | '55' | '56' | '57' | '58' | '59'}`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PropTypeOf<C extends Component> = C extends new (...args: any) => any
  ? Omit<InstanceType<C>['$props'], keyof AllowedComponentProps>
  : never

export type ValueOf<Obj extends Record<string, unknown>> = Obj[keyof Obj]
