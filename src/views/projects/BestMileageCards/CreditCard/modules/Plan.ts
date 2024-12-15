import { removeDuplicates } from '@/utils'

import { type Reward, type RewardType } from './Reward'
import type { Payment, TransactionInfo, RewardMileInfo, TransactionType, PlanConfig } from './type'

interface PlanReward {
  readonly reward: Reward<RewardType>
  readonly stores: ReadonlySet<string>
  readonly payments: ReadonlySet<Payment>
  readonly paymentBlackList: ReadonlySet<Payment>
  readonly transactionType: TransactionType | null
}

export class Plan {
  private readonly _name: string | null
  private readonly _rewards: readonly PlanReward[]

  public constructor(name: string | null, rewards: PlanReward[]) {
    this._name = name
    if (rewards.length === 0) {
      throw new Error(`Plan "${name ?? 'unknown'}" must have at least one reward rule.`)
    }
    this._rewards = rewards
  }

  public get name(): string | null {
    return this._name
  }

  /** 方便在前端做選單或 autocomplete 用的 */
  public get storeList(): string[] {
    return removeDuplicates(this._rewards.flatMap((reward) => [...reward.stores]))
  }

  public getApplicableReward({
    transactionStore = null,
    acceptedPayments = [],
    transactionAttributesType,
  }: {
    transactionStore?: string | null | undefined
    acceptedPayments?: Payment[] | undefined
    transactionAttributesType: TransactionType
  }): PlanReward | null {
    return (
      this._rewards.find(
        ({ stores, payments, transactionType, paymentBlackList }: PlanReward): boolean => {
          const isStore =
            transactionStore === null || stores.size === 0 || stores.has(transactionStore)
          const isPayment =
            acceptedPayments.length === 0 ||
            payments.size === 0 ||
            acceptedPayments.some((payment) => payments.has(payment))
          const haveAnyNotInPaymentBlackList =
            acceptedPayments.length === 0 ||
            paymentBlackList.size === 0 ||
            acceptedPayments.some((item) => !paymentBlackList.has(item))
          const isTransactionType =
            transactionType === null || transactionAttributesType === transactionType
          return isStore && isPayment && isTransactionType && haveAnyNotInPaymentBlackList
        },
      ) ?? null
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
    const payments =
      acceptedPayments === undefined
        ? [...reward.payments.values()]
        : acceptedPayments.filter((item) => reward.payments.has(item))
    return {
      name: reward.reward.name,
      miles: reward.reward.calculateMiles(amount),
      payments: payments.filter((payment) => !reward.paymentBlackList.has(payment)),
    }
  }

  public toJSON(): PlanConfig {
    return {
      name: this._name,
      rewards: this._rewards.map(
        ({ reward, stores, payments, transactionType, paymentBlackList }) => ({
          transactionType,
          stores: [...stores.values()],
          payments: [...payments.values()],
          reward: reward.toJSON(),
          paymentBlackList: [...paymentBlackList.values()],
        }),
      ),
    }
  }
}
