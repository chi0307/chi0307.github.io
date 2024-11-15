import { v7 as uuidv7 } from 'uuid'

import type { URL, UUID } from '@/types'
import { isUuid } from '@/utils/checkTyping'

export function redirect(url: URL): void {
  window.open(url, '_self')
}
export function redirectNewWindow(url: URL): void {
  window.open(url, '_blank')
}

export function roundNumber(num: number, digits: number): number {
  const pow = Math.pow(10, digits)
  return Math.round(num * pow) / pow
}

export function isNotNullishValue<T>(data: T | null | undefined): data is T {
  return data !== null && data !== undefined
}

export function generateUuid(): UUID {
  const id = uuidv7()
  if (!isUuid(id)) {
    throw new Error(`generate uuid is not UUID, ${id}`)
  }
  return id
}

export function errorEvent(
  message: string,
  {
    error = null,
    type = 'console.error'
  }: {
    error?: unknown
    type?: 'console.error' | 'alert'
  } = {}
): void {
  const event: (text: string) => void = type === 'console.error' ? console.error : alert
  if (error === null) {
    event(message)
  } else if (error instanceof Error) {
    event(`${message}, error: ${error.message}`)
  } else {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    event(`${message}, unknown: ${error}`)
  }
}

export function isTruthyString<T extends string>(text: T | null | undefined): text is T {
  return isNotNullishValue(text) && text !== ''
}
