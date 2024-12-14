import type { UUID } from '@/types'
import { generateUuid, removeDuplicates } from '@/utils'

import { Plan } from './Plan'
import type { TransactionInfo, RewardMileInfo, CardConfig } from './type'

interface CardParams {
  name: string
  plans: Plan[]
  blackList: Set<string>
  cardUrl: string | null
  updateAt: Date
}

// TODO
// 之後要再想看看能怎麼實作讓 card 這邊可以吃 type, pointsPerMile, milesPerUnit 這些資料
// 目前放在 reward 裡面可能不是好方法（畢竟目前已知的卡片都是固定回饋方式的）
export class CreditCard {
  /** 當前選擇的方案 */
  private _selectedPlanId: UUID
  /** 卡片名稱 */
  private readonly _name: string
  /** 全部的方案 (如果像旅人卡那樣，只有一種回饋方式這邊選項就會只有一個) */
  private readonly _plans: ReadonlyMap<UUID, Plan>
  /** 信用卡的銀行網頁 */
  private readonly _cardUrl: string | null
  /** 不回饋清單 */
  private readonly _blackList: ReadonlySet<string>
  private readonly _updateAt: Date

  public constructor({ name, plans, blackList, cardUrl, updateAt }: CardParams) {
    this._name = name
    this._plans = new Map(plans.map((plan) => [generateUuid(), plan]))
    this._cardUrl = cardUrl
    this._blackList = blackList
    this._updateAt = updateAt

    const firstPlanKey = this._plans.keys().next().value
    if (this._plans.size === 0 || firstPlanKey === undefined) {
      throw new Error('this credit card no any plan')
    }
    this._selectedPlanId = firstPlanKey
  }

  public get selectedPlan(): Plan {
    return this._getPlan(this._selectedPlanId)
  }

  public get name(): string {
    return this._name
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
      ...this._blackList,
    ])
  }

  public get cardUrl(): string | null {
    return this._cardUrl
  }

  public switchPlan(id: UUID): boolean {
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
    }
    if (
      paymentInfo.transactionStore !== undefined &&
      this._blackList.has(paymentInfo.transactionStore)
    ) {
      return noneMatchRewardInfo
    }
    const reward = plan.getRewardMiles(paymentInfo)
    if (reward === null) {
      return noneMatchRewardInfo
    }
    return {
      planId,
      planName: plan.name,
      ...reward,
    }
  }

  public currentPlanRewardMiles(paymentInfo: TransactionInfo): RewardMileInfo {
    return this._rewardMilesWithPlan(this._selectedPlanId, paymentInfo)
  }

  public getAllPlanRewardMiles(paymentInfo: TransactionInfo): RewardMileInfo[] {
    return [...this._plans.keys()].map((id) => this._rewardMilesWithPlan(id, paymentInfo))
  }

  public toJSON(): CardConfig {
    return {
      name: this._name,
      cardUrl: this._cardUrl,
      blackList: [...this._blackList.values()],
      plans: [...this._plans.values()].map((plan) => plan.toJSON()),
      updateAt: this._updateAt.toISOString(),
    }
  }
}
