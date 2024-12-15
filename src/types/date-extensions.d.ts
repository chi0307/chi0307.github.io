import { type DateISOString } from './index'

declare global {
  interface Date {
    toISOString(): DateISOString
  }
}
