import type { RewardRule } from './rewardRule'
import type { Reward } from './rewards'
import type { PaymentInfo, RewardMileInfo } from './type'

export class Plan {
  public constructor(
    private _name: string,
    private _rewardRules: RewardRule[],
    private _fullbackReward: Reward | null = null,
  ) {}

  public get name(): string {
    return this._name
  }

  public getRewardMiles({ store, payment, amount }: PaymentInfo): RewardMileInfo | null {
    const applicableReward = this._rewardRules.find((item) => item.isApplicable(store, payment))
    const finalReward = applicableReward?.reward ?? this._fullbackReward
    if (finalReward === null) {
      return null
    }
    return {
      name: finalReward.name,
      miles: finalReward.calculateMiles(amount),
    }
  }
}
