import type { UUID } from '@/types'

import type { RewardConfig } from './Reward'

export const Payment = ['Line Pay', 'Apple Pay', '街口支付', '信用卡'] as const
export type Payment = (typeof Payment)[number]
export type TransactionType = 'Domestic' | 'Foreign'

/** input 的交易資料 */
export interface TransactionInfo {
  /** 消費店家 */
  transactionStore?: string
  /** 支援的交易方式 */
  acceptedPayments?: Payment[]
  /** 交易屬性（國內交易、國外交易） */
  transactionAttributesType: TransactionType
  amount: number
}

/** 回饋哩程資訊 */
export interface RewardMileInfo {
  readonly planId: UUID | null
  readonly planName: string | null
  readonly name: string | null
  readonly miles: number
  readonly payments: readonly Payment[]
}

interface RewardRuleConfig {
  reward: RewardConfig
  stores: string[]
  payments: Payment[]
  transactionType: TransactionType | null
}
export interface PlanConfig {
  name: string | null
  /** 回饋列表會有順序問題，前面的達成後就不會往下搜索，所以需要注意順序 */
  rewards: RewardRuleConfig[]
}
export interface CardConfig {
  name: string
  cardUrl: string | null
  blackList: string[]
  plans: PlanConfig[]
}
