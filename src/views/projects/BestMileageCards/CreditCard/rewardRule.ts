import type { Reward } from './rewards'
import type { Payment } from './type'

export class RewardRule {
  private _reward: Reward
  private _stores: string[]
  private _payments: Payment[]
  public constructor({
    reward,
    stores = [],
    payments = [],
  }: {
    reward: Reward
    stores?: string[]
    payments?: Payment[]
  }) {
    this._reward = reward
    this._stores = stores
    this._payments = payments
  }

  //TODO: 有空要想一下國內、國外交易該怎麼區分

  public get reward(): Reward {
    return this._reward
  }

  public isApplicable(store: string, payment: Payment): boolean {
    const isAllowStore = this._stores.length === 0 ? true : this._stores.includes(store)
    const isAllowPayment = this._payments.length === 0 ? true : this._payments.includes(payment)
    return isAllowStore && isAllowPayment
  }
}
