export class PointExchangeStrategy {
  /** 點數交換名稱 */
  private readonly _name: string | null
  /** 航空代碼 */
  private readonly _airlineCode: string
  /** N 點可以換里程 */
  private readonly _pointsPerMile: number
  /** 可以換 M 哩里程 */
  private readonly _milesPerUnit: number

  public constructor({
    name,
    airlineCode,
    pointsPerMile,
    milesPerUnit,
  }: {
    /** 點數交換名稱 */
    name: string | null
    /** 航空代碼 */
    airlineCode: string
    /** N 點可以換里程 */
    pointsPerMile: number
    /** 可以換 M 哩里程 */
    milesPerUnit: number
  }) {
    this._name = name
    this._airlineCode = airlineCode
    this._pointsPerMile = pointsPerMile
    this._milesPerUnit = milesPerUnit
  }

  /** 點數交換名稱 */
  public get name(): string | null {
    return this._name
  }
  /** 航空代碼 */
  public get airlineCode(): string {
    return this._airlineCode
  }
  /** N 點可以換里程 */
  public get pointsPerMile(): number {
    return this._pointsPerMile
  }
  /** 可以換 M 哩里程 */
  public get milesPerUnit(): number {
    return this._milesPerUnit
  }

  /** input: 點數, output: 哩程 */
  public calculateMiles(points: number): number {
    return (points * this._milesPerUnit) / this._pointsPerMile
  }

  public toJSON(): PointExchangeConfig {
    return {
      name: this._name,
      airlineCode: this._airlineCode,
      pointsPerMile: this._pointsPerMile,
      milesPerUnit: this._milesPerUnit,
    }
  }
}

export type PointExchangeConfig = ConstructorParameters<typeof PointExchangeStrategy>[0]
