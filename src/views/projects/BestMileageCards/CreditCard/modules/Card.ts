import { removeDuplicates } from '@/utils'

import { Plan } from './Plan'
import type { TransactionInfo, RewardMileInfo, CardConfig } from './type'

// TODO
// 之後要再想看看能怎麼實作讓 card 這邊可以吃 type, pointsPerMile, milesPerUnit 這些資料
// 目前放在 reward 裡面可能不是好方法（畢竟目前已知的卡片都是固定回饋方式的）
export class CreditCard {
  /** 當前選擇的方案 */
  private _currentPlan: Plan
  /** 卡片名稱 */
  private readonly _name: string
  /** 全部的方案 (如果像旅人卡那樣，只有一種回饋方式這邊選項就會只有一個) */
  private readonly _plans: readonly Plan[]
  /** 信用卡的銀行網頁 */
  private readonly _cardUrl: string | null
  /** 不回饋清單 */
  private readonly _blackList: ReadonlySet<string>

  public constructor({
    name,
    plans,
    blackList,
    cardUrl,
  }: Omit<CardConfig, 'plans'> & { plans: Plan[] }) {
    this._name = name
    this._plans = plans
    this._cardUrl = cardUrl
    this._blackList = new Set(blackList)

    const plan = plans[0]
    if (plan === undefined) {
      throw new Error('this credit card no any plan')
    }
    this._currentPlan = plan
  }

  public get name(): string {
    return this._name
  }

  public get allPlanNames(): string[] {
    return this._plans.map((plan) => plan.name)
  }

  /** 方便在前端做選單或 autocomplete 用的 */
  public get storeList(): string[] {
    return removeDuplicates([...this._plans.flatMap((plan) => plan.storeList), ...this._blackList])
  }

  public get cardUrl(): string | null {
    return this._cardUrl
  }

  public switchPlan(planName: string): void {
    const plan = this._plans.find((p) => p.name === planName)
    if (plan) {
      this._currentPlan = plan
    } else {
      throw new Error(
        `plan ${planName} not found. Available plans: ${this._plans.map((p) => p.name).join(', ')}`,
      )
    }
  }

  private _rewardMilesWithPlan(plan: Plan, paymentInfo: TransactionInfo): RewardMileInfo {
    const noneMatchRewardInfo: RewardMileInfo = {
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
      planName: plan.name,
      ...reward,
    }
  }

  public currentPlanRewardMiles(paymentInfo: TransactionInfo): RewardMileInfo {
    return this._rewardMilesWithPlan(this._currentPlan, paymentInfo)
  }

  public getAllPlanRewardMiles(paymentInfo: TransactionInfo): RewardMileInfo[] {
    return this._plans.map((plan) => this._rewardMilesWithPlan(plan, paymentInfo))
  }

  public toJSON(): CardConfig {
    return {
      name: this._name,
      cardUrl: this._cardUrl,
      blackList: [...this._blackList.values()],
      plans: this._plans.map((plan) => plan.toJSON()),
    }
  }
}
