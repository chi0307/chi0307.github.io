import { errorHandle } from '@/utils'
import {
  isAverageExchangeRateGroup,
  type AverageExchangeRateGroup,
} from '@/views/projects/AverageExchangeRate'

export class CustomStorageManager<StorageTyping extends Record<string, unknown>> {
  private readonly _storage: Storage
  private readonly _typeChecker: TypeChecker<StorageTyping>
  private readonly _prefix: string | null

  public constructor(storage: Storage, typeChecker: TypeChecker<StorageTyping>, prefix?: string) {
    this._storage = storage
    this._typeChecker = typeChecker
    this._prefix = prefix ?? null
  }

  private _storageKey(key: Extract<keyof StorageTyping, string>): string {
    return this._prefix !== null ? `${this._prefix}/${key}` : key
  }

  public get<Key extends Extract<keyof StorageTyping, string>>(
    key: Key,
  ): StorageTyping[Key] | null {
    const sourceData = this._storage.getItem(this._storageKey(key))
    if (sourceData === null) {
      return null
    }
    try {
      const data: unknown = JSON.parse(sourceData)
      if (this._typeChecker[key](data)) {
        return data
      }
      errorHandle(`storage ${this._storageKey(key)} check typing failed`)
    } catch (error) {
      errorHandle(`storage ${this._storageKey(key)} parse failed`, { error, type: 'alert' })
    }
    return null
  }

  public set<Key extends Extract<keyof StorageTyping, string>>(
    key: Key,
    value: StorageTyping[Key],
  ): void {
    if (!this._typeChecker[key](value)) {
      throw new Error(`Type error: Invalid data type for key "${this._storageKey(key)}"`)
    }
    this._storage.setItem(this._storageKey(key), JSON.stringify(value))
  }

  public remove(key: Extract<keyof StorageTyping, string>): void {
    this._storage.removeItem(this._storageKey(key))
  }
}

type TypeChecker<StorageTyping> = {
  [key in keyof StorageTyping]: (data: unknown) => data is StorageTyping[key]
}

export const localStorageManager = new CustomStorageManager<{
  averageExchangeRate: AverageExchangeRateGroup
}>(localStorage, {
  averageExchangeRate: isAverageExchangeRateGroup,
})

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const sessionStorageManager = new CustomStorageManager<{}>(sessionStorage, {})
