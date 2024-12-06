import { type Reward, type RewardType } from './rewards'
import type { Payment, TransactionInfo, RewardMileInfo, TransactionType } from './type'

export interface RewardCriteria {
  stores: string[]
  payments: Payment[]
  transactionType: TransactionType | null
}
interface PlanReward extends RewardCriteria {
  reward: Reward<RewardType>
}

export class Plan {
  private _name: string
  private _rewards: PlanReward[]

  public constructor(name: string, rewards: PlanReward[]) {
    this._name = name
    this._rewards = rewards
  }

  public get name(): string {
    return this._name
  }

  public getApplicableReward({
    store,
    payment,
  }: {
    store: string
    payment: Payment | null
  }): Reward<RewardType> | null {
    return (
      this._rewards.find(({ stores = [], payments = [] }: PlanReward): boolean => {
        const isAllowStore = stores.length === 0 ? true : stores.includes(store)
        const isAllowPayment =
          payment === null || (payments.length === 0 ? true : payments.includes(payment))
        return isAllowStore || isAllowPayment
      })?.reward ?? null
    )
  }

  public getRewardMiles({ store, payment, amount }: TransactionInfo): RewardMileInfo {
    const reward = this.getApplicableReward({ payment, store })
    return {
      name: reward?.name ?? null,
      miles: reward?.calculateMiles(amount) ?? 0,
    }
  }
}
