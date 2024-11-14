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
  localCurrencyCode: string | null
  foreignCurrencyCode: string | null
}
export function initAverageExchangeRateData(): AverageExchangeRateData {
  return {
    title: '新標籤',
    list: [],
    amount: 0,
    localCurrencyCode: null,
    foreignCurrencyCode: null
  }
}

export type AverageExchangeRateGroup = Record<UUID, AverageExchangeRateData>
export const isAverageExchangeRateGroup = typia.createIs<AverageExchangeRateGroup>()

export function formatCurrency(amount: number, currency: string | null | undefined): string {
  const locale = 'zh-TW'
  if (typeof currency !== 'string' || currency === '') {
    return amount.toLocaleString(locale)
  }
  return amount.toLocaleString(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0
  })
}
