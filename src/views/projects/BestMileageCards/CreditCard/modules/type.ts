import type { DateISOString, UUID } from '@/types'

import type { PointExchangeConfig, PointExchangeStrategy } from './PointExchange'
import type { Reward, RewardConfig, RewardType } from './Reward'

export const Payment = [
  '信用卡',
  'Apple Pay',
  'Samsung Pay',
  'Google Pay',
  'Line Pay',
  'Fitbit Pay',
  'Garmin Pay',
  'Hami Pay',
  '街口支付',
  '全盈+PAY',
  '全支付',
  'Pi錢包',
  '橘子支付',
  '歐付寶',
  'icash pay',
  'OPEN錢包',
  'My FamiPay',
  '悠遊付',
  'ezPay',
  'GOMAJI Pay',
  'friday wallet',
  'PayPal',
  'PX Pay',
  '中油Pay',
  '台灣Pay',
  '支付寶',
] as const
export type Payment = (typeof Payment)[number]
export type TransactionType = 'Domestic' | 'Foreign'
export const ConditionType = ['Birthday'] as const
export type ConditionType = (typeof ConditionType)[number]

/** input 的交易資料 */
export interface TransactionInfo {
  /** 消費店家 */
  transactionStore?: string
  /** 支援的交易方式 */
  acceptedPayments?: Payment[]
  /** 交易屬性（國內交易、國外交易） */
  transactionAttributesType: TransactionType
  currentConditions?: ConditionType[]
  amount: number
}

/** 回饋哩程資訊 */
export interface RewardInfo {
  readonly planId: UUID
  readonly planName: string | null
  readonly payments: readonly Payment[]
  readonly rewardName: string | null
  readonly rewardStrategy: Reward<RewardType> | null
  readonly rewardPoints: number
  readonly pointExchangeName: string | null
  readonly pointExchangeStrategy: PointExchangeStrategy
  readonly airlineCode: string
  readonly miles: number
}

export interface RewardRuleConfig {
  rewardStrategy: RewardConfig
  transactionType?: TransactionType | null
  stores?: string[]
  storeBlackList?: string[]
  payments?: Payment[]
  paymentBlackList?: Payment[]
  condition?: ConditionType | null
}
export interface PlanConfig {
  name: string | null
  /** 回饋列表會有順序問題，前面的達成後就不會往下搜索，所以需要注意順序 */
  rewards: RewardRuleConfig[]
  condition?: ConditionType | null
}
export interface CardConfig {
  name: string
  description: string | null
  cardUrl: string | null
  storeBlackList?: string[]
  paymentBlackList?: Payment[]
  plans: PlanConfig[]
  /** 最後更新卡片權益的時間 */
  updateAt: DateISOString
  pointExchangeStrategies: PointExchangeConfig[]
}
