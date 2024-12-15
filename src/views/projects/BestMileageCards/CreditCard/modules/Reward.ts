import { roundByDigits } from '@/utils'

const round = roundByDigits(2)

interface BaseRewardParams<Type extends RewardType> {
  type: Type
  name: string | null
  /** N 點可以換里程 */
  pointsPerMile: number
  /** 可以換 N 哩里程 */
  milesPerUnit: number
}
abstract class BaseReward<Type extends RewardType> {
  protected readonly _type: Type
  protected readonly _name: string | null
  /** {{pointsPerMile}} 點換 {{ milesPerUnit }} 哩程 */
  protected readonly _pointsPerMile: number
  /** {{pointsPerMile}} 點換 {{ milesPerUnit }} 哩程 */
  protected readonly _milesPerUnit: number

  public constructor({ type, name, pointsPerMile, milesPerUnit }: BaseRewardParams<Type>) {
    this._type = type
    this._name = name
    this._pointsPerMile = pointsPerMile
    this._milesPerUnit = milesPerUnit
  }
  /** 描述 */
  public abstract get description(): string
  /** 標準成本 (N元/哩) */
  public abstract get baselineCostPerMile(): number
  /** 最優成本 (N元/哩) */
  public abstract get bestCaseCostPerMile(): number
  /** 最差成本 (N元/哩) */
  public abstract get maximumCostPerMile(): number
  /**
   * @param amount 金額
   * @returns 回饋哩程
   */
  public abstract calculateMiles(amount: number): number

  /** 回饋類型 */
  public get type(): string {
    return this._type
  }

  /** 回饋名稱 */
  public get name(): string | null {
    return this._name
  }

  /** input: 點數, ouput: 里程 */
  protected pointsConvertToMiles(points: number): number {
    return (points * this._milesPerUnit) / this._pointsPerMile
  }

  public calculateRangeMilesCost(
    minAmount: number,
    maxAmount: number,
  ): { max: number; min: number; average: number } {
    const list: number[] = []
    for (let amount = minAmount; amount <= maxAmount; amount++) {
      const data = round(amount / this.calculateMiles(amount))
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
      average: round(average),
    }
  }

  public abstract toJSON(): RewardConfig
}

/** 點數回饋 (N%回饋點數，四捨五入) */
class RoundedPointsRewardPercentage<
  Type extends 'RoundedPointsRewardPercentage',
> extends BaseReward<Type> {
  private readonly _pointBackRate: number

  public constructor({
    pointBackRate,
    ...superParams
  }: {
    /** N% 回饋（四捨五入） */
    pointBackRate: number
  } & BaseRewardParams<Type>) {
    super(superParams)
    this._pointBackRate = pointBackRate
  }
  public get baselineCostPerMile(): number {
    return round(100 / this.pointsConvertToMiles(this._pointBackRate))
  }
  public get bestCaseCostPerMile(): number {
    return round(Math.ceil(100 / this._pointBackRate / 2) / this.pointsConvertToMiles(1))
  }
  public get maximumCostPerMile(): number {
    return round((Math.ceil(150 / this._pointBackRate) - 1) / this.pointsConvertToMiles(1))
  }
  public get description(): string {
    return `消費${this._pointBackRate.toString()}%回饋點數(四捨五入)，${this._pointsPerMile.toString()}點兌換${this._milesPerUnit.toString()}哩程`
  }
  public calculateMiles(amount: number): number {
    const points = Math.round(amount * (this._pointBackRate / 100))
    return round((points / this._pointsPerMile) * this._milesPerUnit)
  }
  public toJSON(): RewardConfig {
    return {
      type: this._type,
      name: this._name,
      pointsPerMile: this._pointsPerMile,
      milesPerUnit: this._milesPerUnit,
      pointBackRate: this._pointBackRate,
    }
  }
}

/** 點數回饋 (N%回饋點數，無條件捨去) */
class TruncatedPointsRewardPercentage<
  Type extends 'TruncatedPointsRewardPercentage',
> extends BaseReward<Type> {
  private readonly _pointBackRate: number

  public constructor({
    pointBackRate,
    ...superParams
  }: {
    /** N% 回饋（無條件捨去） */
    pointBackRate: number
  } & BaseRewardParams<Type>) {
    super(superParams)
    this._pointBackRate = pointBackRate
  }
  public get baselineCostPerMile(): number {
    return round(100 / this.pointsConvertToMiles(this._pointBackRate))
  }
  public get bestCaseCostPerMile(): number {
    return this.baselineCostPerMile
  }
  public get maximumCostPerMile(): number {
    return round((Math.ceil(200 / this._pointBackRate) - 1) / this.pointsConvertToMiles(1))
  }
  public get description(): string {
    return `消費${this._pointBackRate.toString()}%回饋點數(無條件捨去)，${this._pointsPerMile.toString()}點兌換${this._milesPerUnit.toString()}哩程`
  }
  public calculateMiles(amount: number): number {
    const points = Math.floor(amount * (this._pointBackRate / 100))
    return round((points / this._pointsPerMile) * this._milesPerUnit)
  }
  public toJSON(): RewardConfig {
    return {
      type: this._type,
      name: this._name,
      pointsPerMile: this._pointsPerMile,
      milesPerUnit: this._milesPerUnit,
      pointBackRate: this._pointBackRate,
    }
  }
}

/** 點數回饋 (消費N元累積一點) */
class PointsRewardThreshold<Type extends 'PointsRewardThreshold'> extends BaseReward<Type> {
  private readonly _spendingPerPoint: number

  public constructor({
    spendingPerPoint,
    ...superParams
  }: {
    /** N 元累積一點 */
    spendingPerPoint: number
  } & BaseRewardParams<Type>) {
    super(superParams)
    this._spendingPerPoint = spendingPerPoint
  }
  public get baselineCostPerMile(): number {
    return round(this._spendingPerPoint / this.pointsConvertToMiles(1))
  }
  public get bestCaseCostPerMile(): number {
    return this.baselineCostPerMile
  }
  public get maximumCostPerMile(): number {
    return round((this._spendingPerPoint * 2 - 1) / this.pointsConvertToMiles(1))
  }
  public get description(): string {
    return `每消費${this._spendingPerPoint.toString()}元累積1點，${this._pointsPerMile.toString()}點兌換${this._milesPerUnit.toString()}哩程`
  }
  public calculateMiles(amount: number): number {
    const points = Math.floor(amount / this._spendingPerPoint)
    return round((points / this._pointsPerMile) * this._milesPerUnit)
  }
  public toJSON(): RewardConfig {
    return {
      type: this._type,
      name: this._name,
      pointsPerMile: this._pointsPerMile,
      milesPerUnit: this._milesPerUnit,
      spendingPerPoint: this._spendingPerPoint,
    }
  }
}

/** 哩程回饋（累計）*/
class DirectMilesAccumulation<Type extends 'DirectMilesAccumulation'> extends BaseReward<Type> {
  private readonly _spendingPerMile: number

  public constructor({
    spendingPerMile,
    ...superParams
  }: {
    /** N 元一哩 */
    spendingPerMile: number
  } & Omit<BaseRewardParams<Type>, 'pointsPerMile' | 'milesPerUnit'>) {
    super({ ...superParams, pointsPerMile: 1, milesPerUnit: 1 })
    this._spendingPerMile = spendingPerMile
  }
  public get baselineCostPerMile(): number {
    return this._spendingPerMile
  }
  public get bestCaseCostPerMile(): number {
    return this.baselineCostPerMile
  }
  public get maximumCostPerMile(): number {
    return this.baselineCostPerMile
  }
  public get description(): string {
    return `每消費${this._spendingPerMile.toString()}元累積1哩程 (小數會進行累計)`
  }
  public calculateMiles(amount: number): number {
    return round(amount / this._spendingPerMile)
  }
  public toJSON(): RewardConfig {
    return {
      type: this._type,
      name: this._name,
      spendingPerMile: this._spendingPerMile,
    }
  }
}

/** 哩程回饋（以單筆做無條件捨去到整數）*/
class RoundedMilesAccumulation<Type extends 'RoundedMilesAccumulation'> extends BaseReward<Type> {
  private readonly _spendingPerMile: number

  public constructor({
    spendingPerMile,
    ...superParams
  }: {
    /** N 元一哩 */
    spendingPerMile: number
  } & Omit<BaseRewardParams<Type>, 'pointsPerMile' | 'milesPerUnit'>) {
    super({ ...superParams, pointsPerMile: 1, milesPerUnit: 1 })
    this._spendingPerMile = spendingPerMile
  }
  public get baselineCostPerMile(): number {
    return this._spendingPerMile
  }
  public get bestCaseCostPerMile(): number {
    return this.baselineCostPerMile
  }
  public get maximumCostPerMile(): number {
    return this._spendingPerMile + this._spendingPerMile - 1
  }
  public get description(): string {
    return `每消費${this._spendingPerMile.toString()}元累積1哩程 (小數不累計)`
  }
  public calculateMiles(amount: number): number {
    return Math.floor(amount / this._spendingPerMile)
  }
  public toJSON(): RewardConfig {
    return {
      type: this._type,
      name: this._name,
      spendingPerMile: this._spendingPerMile,
    }
  }
}

const rewards = {
  RoundedPointsRewardPercentage,
  TruncatedPointsRewardPercentage,
  PointsRewardThreshold,
  DirectMilesAccumulation,
  RoundedMilesAccumulation,
} as const
export type RewardType = keyof typeof rewards
export type Reward<Type extends RewardType> = InstanceType<(typeof rewards)[Type]>
export type RewardConfig = ConstructorParameters<(typeof rewards)[RewardType]>[0]

export function rewardFactory<Type extends RewardType>(
  params: RewardConfig & { type: Type },
): Reward<Type> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return new rewards[params.type](params)
}
