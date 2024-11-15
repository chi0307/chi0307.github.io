import typia from 'typia'

import type { UUID } from '@/utils/types'
import { errorEvent, isTruthyString } from '@/utils'

export interface AverageExchangeRateItem {
  id: UUID
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
  locale: string | null
}
export function initAverageExchangeRateData(): AverageExchangeRateData {
  return {
    title: '新標籤',
    list: [],
    amount: 0,
    localCurrencyCode: null,
    foreignCurrencyCode: null,
    locale: null
  }
}

export type AverageExchangeRateGroup = Record<UUID, AverageExchangeRateData>
export const isAverageExchangeRateGroup = typia.createIs<AverageExchangeRateGroup>()

export function formatCurrency(
  amount: number,
  locale: string | null | undefined,
  currency: string | null | undefined
): string {
  if (isTruthyString(currency) && isTruthyString(locale)) {
    try {
      return amount.toLocaleString(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 0
      })
    } catch (error) {
      errorEvent('parse currency and locale failed', error)
    }
  }
  try {
    if (isTruthyString(locale)) {
      return amount.toLocaleString(locale)
    }
  } catch (error) {
    errorEvent('parse locale failed', error)
  }
  return amount.toLocaleString()
}
