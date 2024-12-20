import { floorByDigits, roundByDigits } from '@/utils'

const floorBy0 = floorByDigits(0)
const roundBy0 = roundByDigits(0)
const roundBy2 = roundByDigits(2)

interface RateItem {
  rate: number
  limit?: number
}

interface BaseRewardStrategyParams<Type extends RewardType> {
  /** 回饋名稱 */
  name: string | null
  /** 點數累積類型 */
  type: Type
}
abstract class BaseRewardStrategy<Type extends RewardType> {
  /** 回饋名稱 */
  protected readonly _name: string | null
  /** 點數累積類型 */
  protected readonly _type: Type

  public constructor({ type, name }: BaseRewardStrategyParams<Type>) {
    this._type = type
    this._name = name
  }

  // TODO: 標準成本 baselineCostPerMile
  // TODO: 最優成本 bestCaseCostPerMile
  // TODO: 最差成本 maximumCostPerMile

  /**
   * @param amount 金額
   * @returns 回饋點數
   */
  public abstract calculatePoints(amount: number): number

  /** 回饋名稱 */
  public get name(): string | null {
    return this._name
  }
  /** 點數累積類型 */
  public get type(): Type {
    return this._type
  }

  public calculateRangePointsCost(
    minAmount: number,
    maxAmount: number,
  ): { max: number; min: number; average: number } {
    const list: number[] = []
    for (let amount = minAmount; amount <= maxAmount; amount++) {
      const data = roundBy2(amount / this.calculatePoints(amount))
      if (isNaN(data) || data === Infinity || data === -Infinity) {
        continue
      }
      list.push(data)
    }
    list.sort((a, b) => a - b)
    const max = list[list.length - 1]
    const min = list[0]
    if (max === undefined || min === undefined) {
      throw new Error('cannot be calculated')
    }
    const average =
      list.reduce((previousValue, currentValue) => previousValue + currentValue, 0) / list.length
    return {
      max,
      min,
      average: roundBy2(average),
    }
  }

  public abstract toJSON(): RewardConfig
}

/** 點數回饋 (N%回饋點數，四捨五入) */
export class RoundedPercentageReward<
  Type extends 'RoundedPercentageReward',
> extends BaseRewardStrategy<Type> {
  /** N% 回饋（四捨五入） */
  private readonly _pointBackRates: RateItem[]

  public constructor({
    pointBackRates,
    ...superParams
  }: {
    /** N% 回饋（四捨五入） */
    pointBackRates: RateItem[]
  } & BaseRewardStrategyParams<Type>) {
    super(superParams)
    this._pointBackRates = pointBackRates
  }

  public get pointBackRates(): RateItem[] {
    return this._pointBackRates
  }

  public calculatePoints(amount: number): number {
    let points = 0
    for (const { rate, limit = Infinity } of this._pointBackRates) {
      points += Math.min(roundBy0(amount * (rate / 100)), limit)
    }
    return points
  }

  public toJSON(): RewardConfig {
    return {
      name: this._name,
      type: this._type,
      pointBackRates: this._pointBackRates,
    }
  }
}

/** 點數回饋 (N%回饋點數，無條件捨去) */
export class TruncatedPercentageReward<
  Type extends 'TruncatedPercentageReward',
> extends BaseRewardStrategy<Type> {
  /** N% 回饋（無條件捨去） */
  private readonly _pointBackRates: RateItem[]

  public constructor({
    pointBackRates,
    ...superParams
  }: {
    /** N% 回饋（無條件捨去） */
    pointBackRates: RateItem[]
  } & BaseRewardStrategyParams<Type>) {
    super(superParams)
    this._pointBackRates = pointBackRates
  }

  public get pointBackRates(): RateItem[] {
    return this._pointBackRates
  }

  public calculatePoints(amount: number): number {
    let points = 0
    for (const { rate, limit = Infinity } of this._pointBackRates) {
      points += Math.min(floorBy0(amount * (rate / 100)), limit)
    }
    return points
  }

  public toJSON(): RewardConfig {
    return {
      name: this._name,
      type: this._type,
      pointBackRates: this._pointBackRates,
    }
  }
}

/** 哩程回饋 (消費 N 元取得一點，小數會累計) */
export class AccumulatedPointsReward<
  Type extends 'AccumulatedPointsReward',
> extends BaseRewardStrategy<Type> {
  /** N 元一哩 */
  private readonly _spendingPerPoint: number

  public constructor({
    spendingPerPoint,
    ...superParams
  }: {
    /** N 元一哩 */
    spendingPerPoint: number
  } & BaseRewardStrategyParams<Type>) {
    super({ ...superParams })
    this._spendingPerPoint = spendingPerPoint
  }

  /** N 元一哩 */
  public get spendingPerPoint(): number {
    return this._spendingPerPoint
  }

  public calculatePoints(amount: number): number {
    return roundBy2(amount / this._spendingPerPoint)
  }

  public toJSON(): RewardConfig {
    return {
      name: this._name,
      type: this._type,
      spendingPerPoint: this._spendingPerPoint,
    }
  }
}

/** 哩程回饋 (消費 N 元取得一點) */
export class FixedRatePointsReward<
  Type extends 'FixedRatePointsReward',
> extends BaseRewardStrategy<Type> {
  /** N 元一哩 */
  private readonly _spendingPerPoint: number

  public constructor({
    spendingPerPoint,
    ...superParams
  }: {
    /** N 元一哩 */
    spendingPerPoint: number
  } & BaseRewardStrategyParams<Type>) {
    super({ ...superParams })
    this._spendingPerPoint = spendingPerPoint
  }

  /** N 元一哩 */
  public get spendingPerPoint(): number {
    return this._spendingPerPoint
  }

  public calculatePoints(amount: number): number {
    return floorBy0(amount / this._spendingPerPoint)
  }

  public toJSON(): RewardConfig {
    return {
      name: this._name,
      type: this._type,
      spendingPerPoint: this._spendingPerPoint,
    }
  }
}

const rewards = {
  RoundedPercentageReward,
  TruncatedPercentageReward,
  AccumulatedPointsReward,
  FixedRatePointsReward,
} as const
export type RewardType = keyof typeof rewards
export type Reward<Type extends RewardType> = InstanceType<(typeof rewards)[Type]>
export type RewardConfig = ConstructorParameters<(typeof rewards)[RewardType]>[0]

export function rewardStrategyFactory<Type extends RewardType>(
  params: RewardConfig & { type: Type },
): Reward<Type> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return new rewards[params.type](params)
}
