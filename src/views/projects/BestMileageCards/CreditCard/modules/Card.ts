import type { UUID } from '@/types'
import { removeDuplicates } from '@/utils'

import { Plan } from './Plan'
import {
  type TransactionInfo,
  type RewardMileInfo,
  type CardConfig,
  type AirLines,
  airLinesObj,
  Payment,
} from './type'

interface CardParams {
  readonly name: string
  readonly description: string
  readonly plans: ReadonlyMap<UUID, Plan>
  readonly cardUrl: string | null
  readonly updateAt: Date
  readonly airLines: AirLines
  readonly storeBlackList: ReadonlySet<string>
  readonly paymentBlackList: ReadonlySet<Payment>
}

// TODO
// 之後要再想看看能怎麼實作讓 card 這邊可以吃 type, pointsPerMile, milesPerUnit 這些資料
// 目前放在 reward 裡面可能不是好方法（畢竟目前已知的卡片都是固定回饋方式的）
export class CreditCard {
  /** 當前選擇的方案 */
  private _selectedPlanId: UUID
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
  /** 目標里程 */
  private readonly _airLines: AirLines

  public constructor({
    name,
    description,
    plans,
    storeBlackList,
    paymentBlackList,
    cardUrl,
    updateAt,
    airLines,
  }: CardParams) {
    this._name = name
    this._description = description
    this._plans = plans
    this._cardUrl = cardUrl
    this._storeBlackList = storeBlackList
    this._paymentBlackList = paymentBlackList
    this._updateAt = updateAt
    this._airLines = airLines

    const firstPlanKey = this._plans.keys().next().value
    if (this._plans.size === 0 || firstPlanKey === undefined) {
      throw new Error('this credit card no any plan')
    }
    this._selectedPlanId = firstPlanKey
  }

  public get airLines(): string {
    return airLinesObj[this._airLines]
  }

  public get airLinesCode(): string {
    return this._airLines
  }

  public get selectedPlan(): Plan {
    return this._getPlan(this._selectedPlanId)
  }

  public get name(): string {
    return this._name
  }

  public get description(): string {
    return this._description
  }

  public get selectedPlanId(): UUID {
    return this._selectedPlanId
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

  public updatePlan(id: UUID): boolean {
    const plan = this._plans.get(id)
    if (plan) {
      this._selectedPlanId = id
      return true
    }
    return false
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

  private _rewardMilesWithPlan(planId: UUID, paymentInfo: TransactionInfo): RewardMileInfo {
    const plan = this._getPlan(planId)
    const noneMatchRewardInfo: RewardMileInfo = {
      planId: null,
      planName: plan.name,
      name: null,
      miles: 0,
      payments: [],
      reward: null,
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
      ...rewardInfo,
    }
  }

  public currentPlanRewardMiles(paymentInfo: TransactionInfo): RewardMileInfo {
    return this._rewardMilesWithPlan(this._selectedPlanId, paymentInfo)
  }

  public getAllPlanRewardMiles(paymentInfo: TransactionInfo): RewardMileInfo[] {
    return [...this._plans.keys()]
      .filter((id) => {
        const plan = this._getPlan(id)
        return plan.checkPlanIsVisible(paymentInfo.currentConditions ?? null)
      })
      .map((id) => this._rewardMilesWithPlan(id, paymentInfo))
  }

  public toJSON(): Required<CardConfig> {
    return {
      name: this._name,
      description: this._description,
      cardUrl: this._cardUrl,
      storeBlackList: [...this._storeBlackList.values()],
      paymentBlackList: [...this._paymentBlackList.values()],
      plans: [...this._plans.values()].map((plan) => plan.toJSON()),
      updateAt: this._updateAt.toISOString(),
      airLines: this._airLines,
    }
  }
}
