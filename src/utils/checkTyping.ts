import { createIs } from 'typia'

import type { UUID } from '@/utils/types'

export const isNumber = createIs<number>()
export const isString = createIs<string>()
export const isUuid = (data: unknown): data is UUID =>
  isString(data) && /[\da-f]{8}-([\da-f]{4}-){3}[\da-f]{12}/.test(data)
