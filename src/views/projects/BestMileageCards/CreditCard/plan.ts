import { type Reward, type RewardType } from './rewards'
import type { Payment, TransactionInfo, RewardMileInfo, TransactionType } from './type'

interface RewardCriteria {
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
    store = null,
    payment = null,
    transactionType: type = null,
  }: {
    store?: string | null | undefined
    payment?: Payment | null | undefined
    transactionType?: TransactionType | null | undefined
  }): Reward<RewardType> | null {
    return (
      this._rewards.find(({ stores, payments, transactionType }: PlanReward): boolean => {
        const isStore = store === null || (stores.length === 0 ? true : stores.includes(store))
        const isPayment =
          payment === null || (payments.length === 0 ? true : payments.includes(payment))
        const isTransactionType =
          type === null || transactionType === null || type === transactionType
        return isStore && isPayment && isTransactionType
      })?.reward ?? null
    )
  }

  public getRewardMiles({
    store,
    payment,
    amount,
    transactionType,
  }: TransactionInfo): Pick<RewardMileInfo, 'name' | 'miles'> {
    const reward = this.getApplicableReward({
      payment,
      store,
      transactionType,
    })
    return {
      name: reward?.name ?? null,
      miles: reward?.calculateMiles(amount) ?? 0,
    }
  }
}
