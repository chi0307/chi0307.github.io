import { Plan } from './plan'
import type { TransactionInfo, RewardMileInfo } from './type'

// TODO
// 之後要再想看看能怎麼實作讓 card 這邊可以吃 type, pointsPerMile, milesPerUnit 這些資料
// 目前放在 reward 裡面可能不是好方法（畢竟目前已知的卡片都是固定回饋方式的）
export interface CardParams {
  name: string
  plans: Plan[]
  cardUrl: string | null
  blackList: string[]
}
export class CreditCard {
  /** 當前選擇的方案 */
  private _currentPlan: Plan
  /** 卡片名稱 */
  private _name: string
  /** 全部的方案 (如果像旅人卡那樣，只有一種回饋方式這邊選項就會只有一個) */
  private _plans: Plan[]
  /** 信用卡的銀行網頁 */
  private _cardUrl: string | null
  /** 不回饋清單 */
  private _blackList: string[] = []

  public constructor({ name, plans, cardUrl, blackList }: CardParams) {
    this._name = name
    this._plans = plans
    this._cardUrl = cardUrl ?? null
    this._blackList = blackList

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

  public cardUrl(): string | null {
    return this._cardUrl
  }

  public switchPlan(planName: string): void {
    const plan = this._plans.find((p) => p.name === planName)
    if (plan) {
      this._currentPlan = plan
    } else {
      throw new Error(`plan ${planName} not found`)
    }
  }

  private _rewardMilesWithPlan(plan: Plan, paymentInfo: TransactionInfo): RewardMileInfo {
    if (paymentInfo.store !== undefined && this._blackList.includes(paymentInfo.store)) {
      return {
        planName: plan.name,
        name: null,
        miles: 0,
      }
    }
    const reward = plan.getRewardMiles(paymentInfo)
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
}
