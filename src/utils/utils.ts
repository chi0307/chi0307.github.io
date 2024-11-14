import { v7 as uuidv7 } from 'uuid'

import { isUuid } from '@/utils/checkTyping'
import type { UUID } from '@/utils/types'

export function redirect(url: `https://${string}`): void {
  window.open(url, '_self')
}
export function redirectNewWindow(url: `https://${string}`): void {
  window.open(url, '_blank')
}

export function roundNumber(num: number, digits: number): number {
  const pow = Math.pow(10, digits)
  return Math.round(num * pow) / pow
}

export function isNotNullishValue<T>(data: T | null | undefined): data is T {
  return data !== null && data !== undefined
}

export function sortListByDate<T extends object>(
  list: T[],
  sortBy: keyof T,
  direction: 'asc' | 'desc'
): T[] {
  type SortEvent = (aItem: T, bItem: T) => 1 | -1
  let sortEvent: SortEvent
  if (direction === 'asc') {
    sortEvent = (aItem: T, bItem: T): ReturnType<SortEvent> =>
      // eslint-disable-next-line security/detect-object-injection
      aItem[sortBy] > bItem[sortBy] ? 1 : -1
  } else {
    sortEvent = (aItem: T, bItem: T): ReturnType<SortEvent> =>
      // eslint-disable-next-line security/detect-object-injection
      aItem[sortBy] > bItem[sortBy] ? -1 : 1
  }
  return [...list].sort(sortEvent)
}

export function generateUuid(): UUID {
  const id = uuidv7()
  if (!isUuid(id)) {
    throw new Error(`generate uuid is not UUID, ${id}`)
  }
  return id
}
