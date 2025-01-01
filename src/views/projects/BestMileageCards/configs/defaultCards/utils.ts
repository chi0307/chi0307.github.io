import { format } from 'date-fns'

import type { DateString } from '@/types/date'

export const oldCardDescription = getRewardDescription('2024/12/31')
export const cardDescription = getRewardDescription('2025/6/30', '2025/1/1')

export function getRewardDescription(end: DateString, start?: DateString): string {
  if (start === undefined) {
    return `權益 ~${format(end, 'yyyy/M/d')}`
  }
  if (format(start, 'yyyy') === format(end, 'yyyy')) {
    return `權益 ${format(start, 'yyyy/M/d')}~${format(end, 'M/d')}`
  }
  return `權益 ${format(start, 'yyyy/M/d')}~${format(end, 'yyyy/M/d')}`
}