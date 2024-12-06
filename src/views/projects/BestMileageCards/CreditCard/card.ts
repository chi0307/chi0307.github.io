import type { Plan } from './plan'
import type { PaymentInfo, RewardMileInfo } from './type'

export class CreditCard {
  /** 當前選擇的方案 */
  private _currentPlan: Plan
  /** 卡片名稱 */
  private _name: string
  /** 全部的方案 (如果像旅人卡那樣，只有一種回饋方式這邊選項就會只有一個) */
  private _plans: Plan[]
  /** 信用卡的銀行網頁 */
  private _bankCardUrl: string | null
  /** 不回饋清單 */
  private _blackList: string[] = []

  public constructor({
    name,
    plans,
    bankCardUrl,
    blackList,
  }: {
    name: string
    plans: Plan[]
    bankCardUrl?: string
    blackList?: string[]
  }) {
    this._name = name
    this._plans = plans
    this._bankCardUrl = bankCardUrl ?? null
    this._blackList = blackList ?? []

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

  public bankCardUrl(): string | null {
    return this._bankCardUrl
  }

  public switchPlan(planName: string): void {
    const plan = this._plans.find((p) => p.name === planName)
    if (plan) {
      this._currentPlan = plan
    } else {
      throw new Error(`plan ${planName} not found`)
    }
  }

  private _rewardMilesWithPlan(plan: Plan, paymentInfo: PaymentInfo): RewardMileInfo | null {
    if (this._blackList.includes(paymentInfo.store)) {
      return null
    }
    return plan.getRewardMiles(paymentInfo)
  }

  public currentPlanRewardMiles(paymentInfo: PaymentInfo): RewardMileInfo | null {
    return this._rewardMilesWithPlan(this._currentPlan, paymentInfo)
  }

  public getAllPlanRewardMiles(
    paymentInfo: PaymentInfo,
  ): ({ name: string; reward: RewardMileInfo | null } | null)[] {
    return this._plans.map((plan) => {
      const reward = this._rewardMilesWithPlan(plan, paymentInfo)
      return {
        name: plan.name,
        reward,
      }
    })
  }
}
