import { rewardFactory, type Reward, type RewardType } from './Reward'
import type {
  Payment,
  TransactionInfo,
  RewardMileInfo,
  TransactionType,
  PlanConfig,
  RewardRuleConfig,
} from './type'

interface PlanReward {
  readonly reward: Reward<RewardType>
  readonly stores: ReadonlySet<string>
  readonly payments: ReadonlySet<Payment>
  readonly transactionType: TransactionType | null
}

export class Plan {
  private readonly _name: string
  private readonly _rewards: readonly PlanReward[]

  public constructor(name: string, rewards: RewardRuleConfig[]) {
    this._name = name
    if (rewards.length === 0) {
      throw new Error(`Plan "${name}" must have at least one reward rule.`)
    }
    this._rewards = rewards.map(({ stores, payments, transactionType, reward }) => ({
      reward: rewardFactory(reward),
      transactionType,
      stores: new Set(stores),
      payments: new Set(payments),
    }))
  }

  public get name(): string {
    return this._name
  }

  /** 方便在前端做選單或 autocomplete 用的 */
  public get inputStores(): string[] {
    return this._rewards.flatMap((reward) => [...reward.stores.values()])
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
          transactionStore === null || stores.size === 0 || stores.has(transactionStore)
        const isPayment =
          acceptedPayments === null ||
          payments.size === 0 ||
          acceptedPayments.some((payment) => payments.has(payment))
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
      payments: [...reward.payments.values()],
    }
  }

  public export(): PlanConfig {
    return {
      name: this._name,
      rewards: this._rewards.map(({ reward, stores, payments, transactionType }) => ({
        transactionType,
        stores: [...stores.values()],
        payments: [...payments.values()],
        reward: reward.export(),
      })),
    }
  }
}
