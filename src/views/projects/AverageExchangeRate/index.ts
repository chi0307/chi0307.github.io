import typia from 'typia'

import type { UUID } from '@/types'
import { errorHandle, isTruthyString } from '@/utils'

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
      errorHandle('parse currency and locale failed', { error })
    }
  }
  try {
    if (isTruthyString(locale)) {
      return amount.toLocaleString(locale)
    }
  } catch (error) {
    errorHandle('parse locale failed', { error })
  }
  return amount.toLocaleString()
}

export function checkFormatCurrency({
  locale,
  localCurrencyCode,
  foreignCurrencyCode
}: Record<'locale' | 'localCurrencyCode' | 'foreignCurrencyCode', string>): void {
  const amount = 0
  try {
    if (isTruthyString(locale)) {
      amount.toLocaleString(locale)
      if (isTruthyString(localCurrencyCode)) {
        try {
          amount.toLocaleString(locale, {
            style: 'currency',
            currency: localCurrencyCode
          })
        } catch (error) {
          errorHandle('本幣代碼錯誤', { error, type: 'alert' })
        }
      }
      if (isTruthyString(foreignCurrencyCode)) {
        try {
          amount.toLocaleString(locale, {
            style: 'currency',
            currency: foreignCurrencyCode
          })
        } catch (error) {
          errorHandle('外幣代碼錯誤', { error, type: 'alert' })
        }
      }
    }
  } catch (error) {
    errorHandle('語系代碼錯誤', { error, type: 'alert' })
  }
}
