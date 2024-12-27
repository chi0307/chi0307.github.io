import { removeDuplicates } from '@/utils'

import { type Reward, type RewardType } from './Reward'
import type {
  Payment,
  TransactionInfo,
  RewardInfo,
  TransactionType,
  PlanConfig,
  ConditionType,
  RewardRuleConfig,
} from './type'

interface PlanReward {
  readonly rewardStrategy: Reward<RewardType>
  readonly stores: ReadonlySet<string>
  readonly storeBlackList: ReadonlySet<string>
  readonly payments: ReadonlySet<Payment>
  readonly paymentBlackList: ReadonlySet<Payment>
  readonly transactionType: TransactionType | null
  readonly condition: ConditionType | null
}

export class Plan {
  private readonly _name: string | null
  private readonly _description: string | null
  private readonly _rewards: readonly PlanReward[]
  private readonly _condition: ConditionType | null

  public constructor(
    name: string | null,
    description: string | null,
    condition: ConditionType | null,
    rewards: PlanReward[],
  ) {
    this._name = name
    this._description = description
    this._condition = condition
    if (rewards.length === 0) {
      throw new Error(`Plan "${name ?? 'unknown'}" must have at least one reward rule.`)
    }
    this._rewards = rewards
  }

  public get name(): string | null {
    return this._name
  }
  public get description(): string | null {
    return this._description
  }
  /** 方便在前端做選單或 autocomplete 用的 */
  public get storeList(): string[] {
    return removeDuplicates(
      this._rewards.flatMap((reward) => [...reward.stores, ...reward.storeBlackList]),
    )
  }

  public checkPlanIsVisible(currentConditions: ConditionType[] | null): boolean {
    return this._condition === null || Boolean(currentConditions?.includes(this._condition))
  }

  public getApplicableReward({
    transactionStore = null,
    acceptedPayments = [],
    transactionAttributesType,
    currentConditions = null,
  }: {
    transactionStore?: string | null | undefined
    acceptedPayments?: Payment[] | undefined
    transactionAttributesType: TransactionType
    currentConditions?: ConditionType[] | null | undefined
  }): PlanReward | null {
    if (this._condition !== null && !currentConditions?.includes(this._condition)) {
      return null
    }
    return (
      this._rewards.find(
        ({
          stores,
          payments,
          transactionType,
          paymentBlackList,
          storeBlackList,
          condition,
        }: PlanReward): boolean => {
          const isStoreValid =
            transactionStore === null || stores.size === 0 || stores.has(transactionStore)
          const isStoreNotBlackListed =
            transactionStore === null ||
            storeBlackList.size === 0 ||
            !storeBlackList.has(transactionStore)

          const isPaymentValid =
            acceptedPayments.length === 0 ||
            payments.size === 0 ||
            acceptedPayments.some((payment) => payments.has(payment))
          const isPaymentNotBlackListed =
            acceptedPayments.length === 0 ||
            paymentBlackList.size === 0 ||
            acceptedPayments.some((item) => !paymentBlackList.has(item))

          const isTransactionTypeMatch =
            transactionType === null || transactionAttributesType === transactionType
          const conditionValid =
            condition === null || Boolean(currentConditions?.includes(condition))

          return (
            isStoreValid &&
            isStoreNotBlackListed &&
            isPaymentValid &&
            isPaymentNotBlackListed &&
            isTransactionTypeMatch &&
            conditionValid
          )
        },
      ) ?? null
    )
  }

  public getRewardMiles({
    transactionStore,
    acceptedPayments,
    amount,
    transactionAttributesType,
    currentConditions,
  }: TransactionInfo): Pick<
    RewardInfo,
    'rewardName' | 'rewardPoints' | 'payments' | 'rewardStrategy'
  > | null {
    const reward = this.getApplicableReward({
      acceptedPayments,
      transactionStore,
      transactionAttributesType,
      currentConditions,
    })
    if (reward === null) {
      return null
    }
    const payments =
      acceptedPayments === undefined
        ? [...reward.payments.values()]
        : acceptedPayments.filter((item) => reward.payments.has(item))
    return {
      rewardName: reward.rewardStrategy.name,
      rewardPoints: reward.rewardStrategy.calculatePoints(amount),
      payments: payments.filter((payment) => !reward.paymentBlackList.has(payment)),
      rewardStrategy: reward.rewardStrategy,
    }
  }

  public toJSON(): Required<PlanConfig> & { rewards: Required<RewardRuleConfig>[] } {
    return {
      name: this._name,
      description: this._description,
      condition: this._condition,
      rewards: this._rewards.map(
        ({
          rewardStrategy,
          stores,
          payments,
          transactionType,
          paymentBlackList,
          storeBlackList,
          condition,
        }) => ({
          rewardStrategy: rewardStrategy.toJSON(),
          stores: [...stores],
          storeBlackList: [...storeBlackList],
          payments: [...payments],
          paymentBlackList: [...paymentBlackList],
          transactionType,
          condition,
        }),
      ),
    }
  }
}
