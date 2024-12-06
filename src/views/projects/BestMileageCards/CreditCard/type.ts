export const Payment = ['Line Pay', 'Apple Pay', '街口支付', '信用卡'] as const
export type Payment = (typeof Payment)[number]
export type TransactionType = 'Domestic' | 'Foreign'

/** input 的交易資料 */

export interface TransactionInfo {
  store: string
  payment: Payment
  amount: number
}

/** 回饋哩程資訊 */

export interface RewardMileInfo {
  name: string | null
  miles: number
}
