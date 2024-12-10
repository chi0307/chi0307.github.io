import { type Reward, type RewardType } from './rewards'
import type { Payment, TransactionInfo, RewardMileInfo, TransactionType } from './type'

interface RewardCriteria {
  readonly stores: readonly string[]
  readonly payments: readonly Payment[]
  readonly transactionType: TransactionType | null
}

interface PlanReward extends RewardCriteria {
  readonly reward: Reward<RewardType>
}

export class Plan {
  private _name: string
  private _rewards: readonly PlanReward[]

  public constructor(name: string, rewards: readonly PlanReward[]) {
    this._name = name
    this._rewards = rewards
  }

  public get name(): string {
    return this._name
  }

  /** 方便在前端做選單或 autocomplete 用的 */
  public get inputStores(): string[] {
    return this._rewards.flatMap((reward) => reward.stores)
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
