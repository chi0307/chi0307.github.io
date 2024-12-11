import type { CardParams } from './card'
import type { PlanReward } from './plan'
import type { RewardConfig } from './rewards'

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
  readonly planName: string
  readonly name: string | null
  readonly miles: number
  readonly payments: readonly Payment[]
}

export interface RewardRuleConfig extends Omit<PlanReward, 'reward'> {
  reward: RewardConfig
}
export interface PlanConfig {
  name: string
  rewards: RewardRuleConfig[]
}
export interface CardConfig {
  card: Omit<CardParams, 'plans'>
  plans: PlanConfig[]
}
