import typia from 'typia'

import type { DateISOString, UUID } from '@/types'

import type {
  CumulativeMilesReward,
  PointsRewardPerThreshold,
  Reward,
  RewardConfig,
  RewardType,
  DirectMilesReward,
  RoundedPointsReward,
  TruncatedPointsReward,
} from './Reward'

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

export const airLinesObj = {
  SJX: '星宇航空',
  EVA: '長榮航空',
  ANA: '全日空',
  JAL: '日航',
  CPA: '國泰航空',
  CAL: '華航',
} as const
export type AirLines = keyof typeof airLinesObj
export const AirLines = Object.keys(airLinesObj) as AirLines[]

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
export interface RewardMileInfo {
  readonly planId: UUID | null
  readonly planName: string | null
  readonly name: string | null
  readonly miles: number
  readonly payments: readonly Payment[]
  readonly reward: Reward<RewardType> | null
}

export interface RewardRuleConfig {
  reward: RewardConfig
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
  description: string
  cardUrl: string | null
  storeBlackList?: string[]
  paymentBlackList?: Payment[]
  plans: PlanConfig[]
  /** 目標里程 */
  airLines: AirLines
  /** 最後更新卡片權益的時間 */
  updateAt: DateISOString
}

export const isRoundedPointsReward = typia.createIs<RoundedPointsReward<'RoundedPointsReward'>>()
export const isTruncatedPointsReward =
  typia.createIs<TruncatedPointsReward<'TruncatedPointsReward'>>()
export const isPointsRewardPerThreshold =
  typia.createIs<PointsRewardPerThreshold<'PointsRewardPerThreshold'>>()
export const isCumulativeMilesReward =
  typia.createIs<CumulativeMilesReward<'CumulativeMilesReward'>>()
export const isDirectMilesReward = typia.createIs<DirectMilesReward<'DirectMilesReward'>>()
