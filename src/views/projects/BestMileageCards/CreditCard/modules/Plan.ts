import { type Reward, type RewardType } from './Reward'
import type { Payment, TransactionInfo, RewardMileInfo, TransactionType, PlanConfig } from './type'

interface RewardCriteria {
  readonly stores: readonly string[]
  readonly payments: readonly Payment[]
  readonly transactionType: TransactionType | null
}

export interface PlanReward extends RewardCriteria {
  readonly reward: Reward<RewardType>
}

export class Plan {
  private readonly _name: string
  private readonly _rewards: readonly PlanReward[]

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
    transactionStore = null,
    acceptedPayments = null,
    transactionAttributesType,
  }: {
    transactionStore?: string | null | undefined
    acceptedPayments?: Payment[] | null | undefined
    transactionAttributesType: TransactionType
  }): PlanReward | null {
    return (
      this._rewards.find(({ stores, payments, transactionType }: PlanReward): boolean => {
        const isStore =
          transactionStore === null ||
          (stores.length === 0 ? true : stores.includes(transactionStore))
        const isPayment =
          acceptedPayments === null ||
          (payments.length === 0
            ? true
            : payments.some((payment) => acceptedPayments.includes(payment)))
        const isTransactionType =
          transactionType === null || transactionAttributesType === transactionType
        return isStore && isPayment && isTransactionType
      }) ?? null
    )
  }

  public getRewardMiles({
    transactionStore,
    acceptedPayments,
    amount,
    transactionAttributesType,
  }: TransactionInfo): Pick<RewardMileInfo, 'name' | 'miles' | 'payments'> | null {
    const reward = this.getApplicableReward({
      acceptedPayments,
      transactionStore,
      transactionAttributesType,
    })
    if (reward === null) {
      return null
    }
    return {
      name: reward.reward.name,
      miles: reward.reward.calculateMiles(amount),
      payments: reward.payments,
    }
  }

  public export(): PlanConfig {
    return {
      name: this._name,
      rewards: this._rewards.map(({ reward, ...rules }) => ({
        ...rules,
        reward: reward.export(),
      })),
    }
  }
}
