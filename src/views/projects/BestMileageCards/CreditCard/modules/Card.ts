import type { UUID } from '@/types'
import { removeDuplicates } from '@/utils'

import { Plan } from './Plan'
import type { PointExchangeStrategy } from './PointExchange'
import { type TransactionInfo, type RewardInfo, type CardConfig, Payment } from './type'

interface CardParams {
  /** 卡片名稱 */
  readonly name: string
  readonly description: string | null
  /** 全部的方案 (如果像旅人卡那樣，只有一種回饋方式這邊選項就會只有一個) */
  readonly plans: ReadonlyMap<UUID, Plan>
  /** 信用卡網頁 */
  readonly cardUrl: string | null
  /** 不回饋商店清單 */
  readonly storeBlackList: ReadonlySet<string>
  /** 不回饋支付方式清單 */
  readonly paymentBlackList: ReadonlySet<Payment>
  /** 最後更新卡片回饋設定日期（不包含切換方案等使用者設定） */
  readonly updateAt: Date
  /** 點數交換策略 */
  readonly pointExchanges: ReadonlyMap<UUID, PointExchangeStrategy>
  readonly selectedPlanId: UUID | null
  readonly selectedPointExchangeId: UUID | null
}

// TODO
// 之後要再想看看能怎麼實作讓 card 這邊可以吃 type, pointsPerMile, milesPerUnit 這些資料
// 目前放在 reward 裡面可能不是好方法（畢竟目前已知的卡片都是固定回饋方式的）
export class CreditCard {
  /** 當前選擇的方案 */
  private _selectedPlanId: UUID
  /** 當前選擇的交換方式 */
  private _selectedPointExchangeId: UUID
  /** 卡片名稱 */
  private readonly _name: string
  private readonly _description: string | null
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
  private readonly _pointExchanges: ReadonlyMap<UUID, PointExchangeStrategy>

  public constructor({
    name,
    description,
    plans,
    storeBlackList,
    paymentBlackList,
    cardUrl,
    updateAt,
    pointExchanges,
    selectedPlanId,
    selectedPointExchangeId,
  }: CardParams) {
    this._name = name
    this._description = description
    this._plans = plans
    this._cardUrl = cardUrl
    this._storeBlackList = storeBlackList
    this._paymentBlackList = paymentBlackList
    this._updateAt = updateAt
    this._pointExchanges = pointExchanges

    const planId = selectedPlanId ?? this._plans.keys().next().value ?? null
    if (planId === null) {
      throw new Error(`this plan id ${planId} not found`)
    }
    this._selectedPlanId = planId

    const pointExchangeId =
      selectedPointExchangeId ?? this._pointExchanges.keys().next().value ?? null
    if (pointExchangeId === null) {
      throw new Error(`this point exchange id ${pointExchangeId} not found`)
    }
    this._selectedPointExchangeId = pointExchangeId
  }

  /** 卡片名稱 */
  public get name(): string {
    return this._name
  }
  public get description(): string | null {
    return this._description
  }
  public get selectedPlanId(): UUID {
    return this._selectedPlanId
  }
  public get selectedPlan(): Plan {
    return this._getPlan(this._selectedPlanId)
  }
  public get selectedPointExchangeId(): UUID {
    return this._selectedPointExchangeId
  }
  public get selectedPointExchange(): PointExchangeStrategy {
    return this._getPointExchangeStrategy(this._selectedPointExchangeId)
  }
  /** 回傳 uuid 跟 plan name */
  public get selectablePlan(): { id: UUID; name: string | null }[] {
    // TODO: 要過濾 conditions
    return [...this._plans.entries()].map(([id, { name }]) => ({ id, name }))
  }
  public get selectablePointExchange(): { id: UUID; name: string | null }[] {
    return [...this._pointExchanges.entries()].map(([id, { name }]) => ({ id, name }))
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
    const pointExchangeStrategy = this._pointExchanges.get(id)
    if (pointExchangeStrategy === undefined) {
      throw new Error(
        `pointExchangeStrategy id ${id} not found. Available pointExchanges: ${[...this._plans.keys()].join(', ')}`,
      )
    }
    return pointExchangeStrategy
  }
  private _rewardMilesWithPlan(
    planId: UUID,
    pointExchangeStrategyId: UUID,
    paymentInfo: TransactionInfo,
  ): RewardInfo {
    const plan = this._getPlan(planId)
    const pointExchangeStrategy = this._getPointExchangeStrategy(pointExchangeStrategyId)
    const noneMatchRewardInfo: RewardInfo = {
      planId,
      planName: plan.name,
      rewardName: null,
      rewardPoints: 0,
      payments: [],
      rewardStrategy: null,
      pointExchangeStrategy,
      pointExchangeName: pointExchangeStrategy.name,
      airlineCode: pointExchangeStrategy.airlineCode,
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
      planId,
      planName: plan.name,
      pointExchangeStrategy,
      pointExchangeName: pointExchangeStrategy.name,
      miles: pointExchangeStrategy.calculateMiles(rewardInfo.rewardPoints),
      airlineCode: pointExchangeStrategy.airlineCode,
      ...rewardInfo,
    }
  }

  public getRewardInfos(
    paymentInfo: TransactionInfo,
    {
      onlyCurrentPlan = false,
      onlyCurrentExchangeStrategy = false,
    }: { onlyCurrentPlan?: boolean; onlyCurrentExchangeStrategy?: boolean } = {},
  ): RewardInfo[] {
    const plans: [UUID, Plan][] = onlyCurrentPlan
      ? [[this._selectedPlanId, this.selectedPlan]]
      : [...this._plans.entries()]
    const exchangeIds: UUID[] = onlyCurrentExchangeStrategy
      ? [this._selectedPointExchangeId]
      : [...this._pointExchanges.keys()]
    const rewardInfos: RewardInfo[] = []
    for (const [planId, plan] of plans) {
      const planIsVisible = plan.checkPlanIsVisible(paymentInfo.currentConditions ?? null)
      if (!planIsVisible) {
        continue
      }
      for (const pointExchangeStrategyId of exchangeIds) {
        const rewardInfo = this._rewardMilesWithPlan(planId, pointExchangeStrategyId, paymentInfo)
        rewardInfos.push(rewardInfo)
      }
    }
    return rewardInfos
  }
  public toJSON(): Required<Required<CardConfig>> {
    return {
      name: this._name,
      description: this._description,
      cardUrl: this._cardUrl,
      storeBlackList: [...this._storeBlackList],
      paymentBlackList: [...this._paymentBlackList],
      selectedPlanId: this._selectedPlanId,
      plans: [...this._plans].map(([id, plan]) => ({ id, config: plan.toJSON() })),
      updateAt: this._updateAt.toISOString(),
      selectedPointExchangeId: this._selectedPointExchangeId,
      pointExchanges: [...this._pointExchanges].map(([id, strategy]) => ({
        id,
        config: strategy.toJSON(),
      })),
    }
  }
}
