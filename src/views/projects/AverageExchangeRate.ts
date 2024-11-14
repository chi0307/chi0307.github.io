import typia from 'typia'

import type { UUID } from '@/utils/types'

export interface AverageExchangeRateItem {
  date: string
  sell: number
  buy: number
}
export interface AverageExchangeRateData {
  title: string
  list: AverageExchangeRateItem[]
  amount: number
}
export type AverageExchangeRateGroup = Record<UUID, AverageExchangeRateData>
export const isAverageExchangeRateGroup = typia.createIs<AverageExchangeRateGroup>()
