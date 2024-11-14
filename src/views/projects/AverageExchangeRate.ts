import typia from 'typia'

export interface AverageExchangeRateItem {
  date: string
  sell: number
  buy: number
}
export interface cacheAverageExchangeRateData {
  transactionList: AverageExchangeRateItem[]
  amount: number
}
export const isCacheAverageExchangeRateData = typia.createIs<cacheAverageExchangeRateData>()
