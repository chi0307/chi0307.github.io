import typia from 'typia'

import type { UUID } from '@/utils/types'
import { errorEvent } from '@/utils/utils'

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
  if (
    typeof currency === 'string' &&
    currency !== '' &&
    typeof locale === 'string' &&
    locale !== ''
  ) {
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
    if (typeof locale === 'string' && locale !== '') {
      return amount.toLocaleString(locale)
    }
  } catch (error) {
    errorEvent('parse locale failed', error)
  }
  return amount.toLocaleString()
}
