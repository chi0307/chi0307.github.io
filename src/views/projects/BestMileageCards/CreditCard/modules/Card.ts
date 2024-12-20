import type { UUID } from '@/types'
import { removeDuplicates } from '@/utils'

import { Plan } from './Plan'
import type { PointExchangeStrategy } from './PointExchange'
import { type TransactionInfo, type RewardInfo, type CardConfig, Payment } from './type'

interface CardParams {
  /** 卡片名稱 */
  readonly name: string
  readonly description: string
  /** 全部的方案 (如果像旅人卡那樣，只有一種回饋方式這邊選項就會只有一個) */
  readonly plans: ReadonlyMap<UUID, Plan>
  /** 信用卡的銀行網頁 */
  readonly cardUrl: string | null
  /** 不回饋商店清單 */
  readonly storeBlackList: ReadonlySet<string>
  /** 不回饋支付方式清單 */
  readonly paymentBlackList: ReadonlySet<Payment>
  /** 最後更新卡片回饋設定日期（不包含切換方案等使用者設定） */
  readonly updateAt: Date
  /** 點數交換策略 */
  readonly pointExchangeStrategies: ReadonlyMap<UUID, PointExchangeStrategy>
}

// TODO
// 之後要再想看看能怎麼實作讓 card 這邊可以吃 type, pointsPerMile, milesPerUnit 這些資料
// 目前放在 reward 裡面可能不是好方法（畢竟目前已知的卡片都是固定回饋方式的）
export class CreditCard {
  /** 當前選擇的方案 */
  private _selectedPlanId: UUID
  /** 當前選擇的交換方式 */
  private _selectedPointExchangeStrategyId: UUID
  /** 卡片名稱 */
  private readonly _name: string
  private readonly _description: string
  /** 全部的方案 (如果像旅人卡那樣，只有一種回饋方式這邊選項就會只有一個) */
  private readonly _plans: ReadonlyMap<UUID, Plan>
  /** 信用卡的銀行網頁 */
  private readonly _cardUrl: string | null
  /** 不回饋商店清單 */
  private readonly _storeBlackList: ReadonlySet<string>
  /** 不回饋支付方式清單 */
  private readonly _paymentBlackList: ReadonlySet<Payment>
  /** 最後更新卡片回饋設定日期（不包含切換方案等使用者設定） */
  private readonly _updateAt: Date
  /** 點數交換策略 */
  private readonly _pointExchangeStrategies: ReadonlyMap<UUID, PointExchangeStrategy>

  public constructor({
    name,
    description,
    plans,
    storeBlackList,
    paymentBlackList,
    cardUrl,
    updateAt,
    pointExchangeStrategies,
  }: CardParams) {
    this._name = name
    this._description = description
    this._plans = plans
    this._cardUrl = cardUrl
    this._storeBlackList = storeBlackList
    this._paymentBlackList = paymentBlackList
    this._updateAt = updateAt
    this._pointExchangeStrategies = pointExchangeStrategies

    const firstPlanKey = this._plans.keys().next().value
    if (this._plans.size === 0 || firstPlanKey === undefined) {
      throw new Error('this credit card no any plan')
    }
    this._selectedPlanId = firstPlanKey

    const firstExchangeKey = this._pointExchangeStrategies.keys().next().value
    if (this._plans.size === 0 || firstExchangeKey === undefined) {
      throw new Error('this credit card no any exchange strategy')
    }
    this._selectedPointExchangeStrategyId = firstExchangeKey
  }

  /** 卡片名稱 */
  public get name(): string {
    return this._name
  }
  public get description(): string {
    return this._description
  }
  public get selectedPlanId(): UUID {
    return this._selectedPlanId
  }
  public get selectedPlan(): Plan {
    return this._getPlan(this._selectedPlanId)
  }
  public get selectedPointExchangeStrategyId(): UUID {
    return this._selectedPointExchangeStrategyId
  }
  public get selectedPointExchangeStrategy(): PointExchangeStrategy {
    return this._getPointExchangeStrategy(this._selectedPointExchangeStrategyId)
  }
  /** 回傳 uuid 跟 plan name */
  public get selectablePlan(): { id: UUID; name: string | null }[] {
    return [...this._plans.entries()].map(([id, { name }]) => ({ id, name }))
  }
  /** 方便在前端做選單或 autocomplete 用的 */
  public get storeList(): string[] {
    return removeDuplicates([
      ...[...this._plans.values()].flatMap((plan) => plan.storeList),
      ...this._storeBlackList,
    ])
  }
  public get cardUrl(): string | null {
    return this._cardUrl
  }

  private _getPlan(id: UUID): Plan {
    const plan = this._plans.get(id)
    if (plan === undefined) {
      throw new Error(
        `plan id ${id} not found. Available plans: ${[...this._plans.keys()].join(', ')}`,
      )
    }
    return plan
  }
  private _getPointExchangeStrategy(id: UUID): PointExchangeStrategy {
    const pointExchangeStrategy = this._pointExchangeStrategies.get(id)
    if (pointExchangeStrategy === undefined) {
      throw new Error(
        `pointExchangeStrategy id ${id} not found. Available pointExchangeStrategies: ${[...this._plans.keys()].join(', ')}`,
      )
    }
    return pointExchangeStrategy
  }
  private _rewardMilesWithPlan(
    plan: Plan,
    pointExchangeStrategy: PointExchangeStrategy,
    paymentInfo: TransactionInfo,
  ): RewardInfo {
    const noneMatchRewardInfo: RewardInfo = {
      planName: plan.name,
      rewardName: null,
      rewardPoints: 0,
      payments: [],
      rewardStrategy: null,
      pointExchangeStrategy,
      pointExchangeName: pointExchangeStrategy.name,
      miles: 0,
    }
    const inStoreBlackList =
      paymentInfo.transactionStore !== undefined &&
      this._storeBlackList.has(paymentInfo.transactionStore)
    const inPaymentBlackList = paymentInfo.acceptedPayments?.some((payment) =>
      this._paymentBlackList.has(payment),
    )
    if (inStoreBlackList || inPaymentBlackList) {
      return noneMatchRewardInfo
    }
    const rewardInfo = plan.getRewardMiles(paymentInfo)
    if (rewardInfo === null) {
      return noneMatchRewardInfo
    }
    return {
      planName: plan.name,
      pointExchangeStrategy,
      pointExchangeName: pointExchangeStrategy.name,
      miles: pointExchangeStrategy.calculateMiles(rewardInfo.rewardPoints),
      ...rewardInfo,
    }
  }

  public updatePlan(id: UUID): boolean {
    const plan = this._plans.get(id)
    if (plan) {
      this._selectedPlanId = id
      return true
    }
    return false
  }
  public updatePointExchangeStrategy(id: UUID): boolean {
    const pointExchangeStrategy = this._pointExchangeStrategies.get(id)
    if (pointExchangeStrategy) {
      this._selectedPointExchangeStrategyId = id
      return true
    }
    return false
  }
  public currentPlanRewardMiles(paymentInfo: TransactionInfo): RewardInfo {
    return this._rewardMilesWithPlan(
      this.selectedPlan,
      this.selectedPointExchangeStrategy,
      paymentInfo,
    )
  }
  public getAllRewardInfo(
    paymentInfo: TransactionInfo,
    {
      onlyCurrentPlan = false,
      onlyCurrentExchangeStrategy = false,
    }: { onlyCurrentPlan?: boolean; onlyCurrentExchangeStrategy?: boolean } = {},
  ): RewardInfo[] {
    const plans: Plan[] = onlyCurrentPlan ? [this.selectedPlan] : [...this._plans.values()]
    const exchanges: PointExchangeStrategy[] = onlyCurrentExchangeStrategy
      ? [this.selectedPointExchangeStrategy]
      : [...this._pointExchangeStrategies.values()]
    const eligiblePlans = plans.filter((plan) => {
      return plan.checkPlanIsVisible(paymentInfo.currentConditions ?? null)
    })
    const rewardInfos: RewardInfo[] = []
    for (const plan of eligiblePlans) {
      for (const pointExchangeStrategy of exchanges) {
        const rewardInfo = this._rewardMilesWithPlan(plan, pointExchangeStrategy, paymentInfo)
        rewardInfos.push(rewardInfo)
      }
    }
    return rewardInfos
  }
  public toJSON(): Required<CardConfig> {
    return {
      name: this._name,
      description: this._description,
      cardUrl: this._cardUrl,
      storeBlackList: [...this._storeBlackList],
      paymentBlackList: [...this._paymentBlackList],
      plans: [...this._plans].map(([_id, plan]) => plan.toJSON()),
      updateAt: this._updateAt.toISOString(),
      pointExchangeStrategies: [...this._pointExchangeStrategies].map(([_id, strategy]) =>
        strategy.toJSON(),
      ),
    }
  }
}
