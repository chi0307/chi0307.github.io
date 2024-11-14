class StorageManager<StorageTyping extends Record<string, unknown>> {
  private readonly storage: Storage
  private readonly typeChecker: TypeChecker<StorageTyping>

  public constructor(storage: Storage, typeChecker: TypeChecker<StorageTyping>) {
    this.storage = storage
    this.typeChecker = typeChecker
  }

  public get<Key extends Extract<keyof StorageTyping, string>>(
    key: Key
  ): StorageTyping[Key] | null {
    const sourceData = this.storage.getItem(key)
    if (sourceData === null) {
      return null
    }
    try {
      const data: unknown = JSON.parse(sourceData)
      if (this.typeChecker[key](data)) {
        return data
      }
      console.error(`storage ${key} check typing failed`)
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`storage ${key} parse error: ${error.message}`)
      } else {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        console.error(`storage ${key} parse error: ${error}`)
      }
    }
    return null
  }

  public set<Key extends Extract<keyof StorageTyping, string>>(
    key: Key,
    value: StorageTyping[Key]
  ): void {
    this.storage.setItem(key, JSON.stringify(value))
  }

  public remove(key: Extract<keyof StorageTyping, string>): void {
    this.storage.removeItem(key)
  }
}

type TypeChecker<StorageTyping> = {
  [key in keyof StorageTyping]: (data: unknown) => data is StorageTyping[key]
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const localStorageManager = new StorageManager<{}>(localStorage, {})

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const sessionStorageManager = new StorageManager<{}>(sessionStorage, {})
